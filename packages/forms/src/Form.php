<?php

namespace Primix\Forms;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\View;
use Primix\Actions\Action;
use Primix\Forms\Components\Fields\Field;
use Primix\Forms\Components\Layouts\Wizard;
use Primix\Forms\Concerns\HandlesFormFileUploads;
use Primix\Forms\Concerns\ManagesFormRelationships;
use Primix\Forms\Concerns\ManagesNestedRelationships;
use Primix\Support\SchemaBuilder;
use Primix\Support\Enums\SchemaContext;

class Form extends Schema implements Htmlable
{
    use HandlesFormFileUploads;
    use ManagesFormRelationships;
    use ManagesNestedRelationships;

    public static function configure(Form $form): Form
    {
        return $form;
    }

    protected mixed $model = null;

    protected ?string $name = 'form';

    protected ?string $submitAction = 'submit';

    protected ?Action $submitButton = null;

    protected bool $isWrapped = false;

    protected bool $shouldRenderFieldActionModal = true;

    protected array|\Closure|null $footerActions = null;

    public function name(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): string
    {
        return $this->name ?? 'form';
    }

    public function getContext(): SchemaContext
    {
        return SchemaContext::Form;
    }

    public function model(mixed $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getModel(): mixed
    {
        return $this->model;
    }

    public function submitAction(?string $action): static
    {
        $this->submitAction = $action;

        return $this;
    }

    public function submitButton(?Action $action): static
    {
        $this->submitButton = $action;

        return $this;
    }

    public function getSubmitAction(): ?string
    {
        return $this->submitAction;
    }

    public function getSubmitButton(): ?Action
    {
        return $this->submitButton;
    }

    public function hasSubmitButton(): bool
    {
        return $this->submitButton !== null;
    }

    public function wrapped(bool $condition = true): static
    {
        $this->isWrapped = $condition;

        return $this;
    }

    public function isWrapped(): bool
    {
        return $this->isWrapped;
    }

    public function renderFieldActionModal(bool $condition = true): static
    {
        $this->shouldRenderFieldActionModal = $condition;

        return $this;
    }

    public function shouldRenderFieldActionModal(): bool
    {
        return $this->shouldRenderFieldActionModal;
    }

    public function footerActions(array|\Closure $actions): static
    {
        $this->footerActions = $actions;

        return $this;
    }

    public function getFooterActions(): array
    {
        if ($this->footerActions instanceof \Closure) {
            return ($this->footerActions)();
        }

        return $this->footerActions ?? [];
    }

    public function hasFooterActions(): bool
    {
        return ! empty($this->getFooterActions());
    }

    /**
     * Build the form schema from an array of definitions.
     *
     * @param  array<array>  $definitions
     * @param  array<string, \Closure>  $callbacks
     */
    public function fromSchema(array $definitions, array $callbacks = []): static
    {
        $builder = app(SchemaBuilder::class);
        $components = $builder->build($definitions, 'field', $callbacks);

        return $this->schema($components);
    }

    public function getFields(): array
    {
        return array_filter(
            $this->getLeafComponents(),
            fn ($component) => $component instanceof Field
        );
    }

    public function getValidationRules(): array
    {
        $rules = [];

        foreach ($this->getFields() as $path => $field) {
            $fieldRules = $field->getRules();

            if ($fieldRules) {
                $rules[$path] = $fieldRules;
            }
        }

        return $rules;
    }

    public function getValidationRulesForWizardStep(int $stepIndex): array
    {
        $wizard = null;
        foreach ($this->getComponents() as $component) {
            if ($component instanceof Wizard) {
                $wizard = $component;
                break;
            }
        }

        if (! $wizard) {
            return $this->getValidationRules();
        }

        $visibleSteps = array_values(array_filter(
            $wizard->getSteps(),
            fn ($s) => ! $s->isHidden()
        ));

        if (! isset($visibleSteps[$stepIndex])) {
            return [];
        }

        $rules = [];

        foreach ($this->flattenComponents($visibleSteps[$stepIndex]->getChildComponents()) as $path => $component) {
            if ($component instanceof Field && ($fieldRules = $component->getRules())) {
                $rules[$path] = $fieldRules;
            }
        }

        return $rules;
    }

    public function getValidationMessages(): array
    {
        $messages = [];

        foreach ($this->getFields() as $path => $field) {
            $fieldMessages = $field->getValidationMessages();

            if (! empty($fieldMessages)) {
                foreach ($fieldMessages as $rule => $message) {
                    $messages["{$path}.{$rule}"] = $message;
                }
            }
        }

        return $messages;
    }

    public function getValidationAttributes(): array
    {
        $attributes = [];

        foreach ($this->getFields() as $path => $field) {
            $label = $field->getLabel();

            if ($label !== null) {
                $attributes[$path] = $label;
            }
        }

        return $attributes;
    }

    public function validate(): array
    {
        $livue = $this->getLiVue();

        if ($livue === null) {
            throw new \LogicException('Cannot validate a form without an attached LiVue component.');
        }

        return $livue->validate(
            $this->getValidationRules(),
            $this->getValidationMessages(),
            $this->getValidationAttributes(),
        );
    }

    public function validateWizardStep(int $stepIndex): array
    {
        $livue = $this->getLiVue();

        if ($livue === null) {
            throw new \LogicException('Cannot validate a form without an attached LiVue component.');
        }

        return $livue->validate(
            $this->getValidationRulesForWizardStep($stepIndex),
            $this->getValidationMessages(),
            $this->getValidationAttributes(),
        );
    }

    public function hasWatchers(): bool
    {
        foreach ($this->getFields() as $field) {
            if ($field->isWatched()) {
                return true;
            }
        }

        return false;
    }

    public function fill(array $state = []): static
    {
        $formStatePath = $this->getStatePath();

        // Initialize every field key to null (or its default) if not already in $state
        foreach ($this->getLeafComponents() as $path => $field) {
            $relPath = ($formStatePath !== null && str_starts_with($path, $formStatePath . '.'))
                ? substr($path, strlen($formStatePath) + 1)
                : $path;

            if ($relPath === '' || ! array_key_exists($relPath, $state)) {
                $default = method_exists($field, 'getDefaultValue') ? $field->getDefaultValue() : null;
                data_set($state, $relPath, $default);
            }
        }

        $this->state = $state;

        // Write to the LiVue component's public property (non-destructively:
        // existing values — e.g. user input already hydrated — take precedence)
        $livue = $this->getLiVue();
        if ($livue !== null && $formStatePath !== null && property_exists($livue, $formStatePath)) {
            $existing = $livue->{$formStatePath};
            $livue->{$formStatePath} = array_merge($state, is_array($existing) ? $existing : []);
        }

        return $this;
    }

    public function dehydrateState(array &$data): void
    {
        $formStatePath = $this->getStatePath();

        foreach ($this->getFields() as $path => $field) {
            // Strip the form's statePath prefix to get the key relative to $data
            $relativePath = ($formStatePath && str_starts_with($path, $formStatePath . '.'))
                ? substr($path, strlen($formStatePath) + 1)
                : $path;

            if (! $field->isDehydrated()) {
                data_forget($data, $relativePath);

                continue;
            }

            $beforeDehydrateCallbacks = $field->getBeforeStateDehydratedCallbacks();
            $callback = $field->getDehydrateStateCallback();

            if (empty($beforeDehydrateCallbacks) && ! $callback) {
                continue;
            }

            $value = data_get($data, $relativePath);

            foreach ($beforeDehydrateCallbacks as $beforeDehydrateCallback) {
                $value = $field->evaluate($beforeDehydrateCallback, [
                    'state' => $value,
                ]);
            }

            if ($callback) {
                $value = $field->evaluate($callback, [
                    'state' => $value,
                ]);
            }

            data_set($data, $relativePath, $value);
        }
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'model' => $this->model ? get_class($this->model) : null,
        ]);
    }

    public function toHtml(): string
    {
        return View::make('primix-forms::form', [
            'form' => $this,
        ])->render();
    }
}
