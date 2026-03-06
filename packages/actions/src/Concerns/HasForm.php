<?php

namespace Primix\Actions\Concerns;

use Closure;

trait HasForm
{
    protected array|Closure $formSchema = [];

    protected array|Closure $formData = [];

    public function form(array|Closure $schema): static
    {
        $this->formSchema = $schema;

        return $this;
    }

    public function fillForm(array|Closure $data): static
    {
        $this->formData = $data;

        return $this;
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
