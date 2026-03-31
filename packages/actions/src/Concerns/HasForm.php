<?php

namespace Primix\Actions\Concerns;

use Closure;
use Primix\Support\SchemaBuilder;

trait HasForm
{
    protected array|Closure $formSchema = [];

    protected array|Closure $formData = [];

    public function form(array|Closure $schema): static
    {
        $this->formSchema = $schema;

        return $this;
    }

    /**
     * Build and assign action form schema from definition arrays.
     *
     * @param  array<array>  $definitions
     * @param  array<string, \Closure>  $callbacks
     */
    public function formFromSchema(array $definitions, array $callbacks = []): static
    {
        $builder = app(SchemaBuilder::class);
        $components = $builder->build($definitions, 'field', $callbacks);

        return $this->form($components);
    }

    public function fillForm(array|Closure $data): static
    {
        $this->formData = $data;

        return $this;
    }

    /**
     * Build and return a configured Form for this action.
     *
     * When the schema is a Closure accepting a Form parameter, the pre-built
     * Form instance (with livue context already set) is injected so that
     * configure methods like EventForm::configure($form) receive the correct
     * instance. The returned Form carries all configuration (columns, schema,
     * livue) set inside the closure — no external extraction needed.
     *
     * Duck typing (class_exists + method_exists) avoids a hard dependency on
     * primix/forms to prevent circular deps.
     */
    public function buildForm(mixed $livue = null): mixed
    {
        $formClass = 'Primix\Forms\Form';

        if (! class_exists($formClass) || empty($this->formSchema)) {
            return null;
        }

        $form = $formClass::make();

        if ($livue !== null) {
            $form->livue($livue);
        }

        if ($this->formSchema instanceof Closure) {
            // Inject the pre-built Form so the closure configures this exact instance.
            // The closure receives it via typed injection (step 2 in EvaluatesClosures).
            $result = $this->evaluate($this->formSchema, [], [$formClass => $form]);

            // The closure may return $form itself (configured in-place, most common)
            // or a different Form object. Either way, ensure livue is set.
            if (is_object($result) && method_exists($result, 'getComponents')) {
                if ($result !== $form && $livue !== null && method_exists($result, 'livue')) {
                    $result->livue($livue);
                }

                return $result;
            }

            // Closure returned an array of components
            if (! empty($result)) {
                return $form->schema((array) $result);
            }

            return null;
        }

        // Array schema
        $schema = $this->evaluate($this->formSchema);

        if (! empty($schema)) {
            return $form->schema((array) $schema);
        }

        return null;
    }

    public function getFormSchema(): array
    {
        $schema = $this->evaluate($this->formSchema);

        // Support Form objects returned by closures (duck typing to avoid circular dependency)
        if (is_object($schema) && method_exists($schema, 'getComponents')) {
            return $schema->getComponents();
        }

        return $schema;
    }

    public function getFormData(): array
    {
        return $this->evaluate($this->formData);
    }

    public function hasForm(): bool
    {
        return ! empty($this->getFormSchema());
    }

    /**
     * Get initial form data with all field keys initialized.
     *
     * Merges explicit fillForm() data with default values extracted
     * from the form schema, ensuring all field keys exist to avoid
     * "Undefined array key" errors during LiVue sync.
     */
    public function getInitialFormData(): array
    {
        $data = $this->getFormData();

        foreach ($this->getFormSchema() as $component) {
            $this->extractFieldDefaults($component, $data);
        }

        return $data;
    }

    /**
     * Recursively extract field names and their default values from a component tree.
     */
    protected function extractFieldDefaults(object $component, array &$data): void
    {
        // If it's a field-like component with a name
        if (method_exists($component, 'getName')) {
            $name = $component->getName();

            if ($name !== null && ! array_key_exists($name, $data)) {
                $data[$name] = method_exists($component, 'getDefaultValue')
                    ? $component->getDefaultValue()
                    : null;
            }
        }

        // Recurse into child components (layouts, tabs, etc.)
        if (method_exists($component, 'getChildComponents')) {
            foreach ($component->getChildComponents() as $child) {
                $this->extractFieldDefaults($child, $data);
            }
        }
    }
}
