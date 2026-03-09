<?php

namespace Primix\Forms;

use Primix\Forms\Concerns\HasAsyncSelectSearch;
use Primix\Forms\Concerns\HasFormFieldActions;
use Primix\Forms\Concerns\IntegratesFileUploads;
use Primix\Forms\Concerns\ManagesFieldOptions;
use Primix\Forms\Concerns\ManagesRepeaterItems;
use Primix\Forms\Concerns\WatchesFormState;

trait HasForms
{
    use HasAsyncSelectSearch;
    use HasFormFieldActions;
    use IntegratesFileUploads;
    use ManagesFieldOptions;
    use ManagesRepeaterItems;
    use WatchesFormState;

    protected array $cachedForms = [];

    /**
     * Persistent UI state for form components (e.g., active tab).
     * Survives template swaps because it's a public server property.
     */
    public array $uiState = [];

    /**
     * Called by LiVue on every instantiation (boot{TraitName} convention).
     * We no longer eagerly cache forms here because state is not yet hydrated.
     * Forms will be created lazily via getForm() after hydration.
     */
    public function bootHasForms(): void
    {
        // Forms are now created lazily via getForm() to ensure
        // they have access to hydrated state (like $this->record).
    }

    /**
     * Called by LiVue after state hydration.
     * Ensures form cache is fresh and has access to hydrated properties.
     */
    public function hydrateHasForms(): void
    {
        // Reset cache to ensure forms are rebuilt with hydrated state.
        // This is critical for relationship-based fields that need $this->record.
        $this->cachedForms = [];
    }

    public function getForm(string $name = 'form'): ?Form
    {
        if (isset($this->cachedForms[$name])) {
            return $this->cachedForms[$name];
        }

        if (method_exists($this, $name)) {
            $form = $this->{$name}(Form::make()->livue($this)->name($name));
            $form->fill();
            $this->cachedForms[$name] = $form;

            return $form;
        }

        return null;
    }

    public function getForms(): array
    {
        return $this->cachedForms;
    }

    protected function getFormSchema(string $formName): array
    {
        $form = $this->getForm($formName);

        return $form ? $form->getComponents() : [];
    }

    protected function getFormValidationRules(string $formName): array
    {
        $form = $this->getForm($formName);

        return $form ? $form->getValidationRules() : [];
    }

    protected function getFormValidationMessages(string $formName): array
    {
        $form = $this->getForm($formName);

        return $form ? $form->getValidationMessages() : [];
    }

    protected function fillForm(string $formName, array $data): void
    {
        $form = $this->getForm($formName);

        if ($form) {
            $form->fill($data);
        }
    }

    protected function resetFormCache(): void
    {
        $this->cachedForms = [];
    }
}
