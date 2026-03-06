<?php

namespace Primix\Support;

class SchemaValidator
{
    public function __construct(
        protected ComponentTypeRegistry $typeRegistry,
    ) {}

    /**
     * Validate a form schema definition.
     *
     * @param  array<array>  $definitions
     * @return array<string> List of errors (empty = valid)
     */
    public function validateFormSchema(array $definitions): array
    {
        $errors = [];

        foreach ($definitions as $index => $definition) {
            $errors = array_merge(
                $errors,
                $this->validateDefinition($definition, "[{$index}]", 'field'),
            );
        }

        return $errors;
    }

    /**
     * Validate a table schema definition.
     *
     * @return array<string> List of errors (empty = valid)
     */
    public function validateTableSchema(array $definition): array
    {
        $errors = [];

        $sections = [
            'columns' => 'column',
            'filters' => 'filter',
            'actions' => 'action',
            'bulkActions' => 'action',
            'headerActions' => 'action',
        ];

        foreach ($sections as $key => $category) {
            if (! isset($definition[$key])) {
                continue;
            }

            if (! is_array($definition[$key])) {
                $errors[] = "{$key}: must be an array.";
                continue;
            }

            foreach ($definition[$key] as $index => $item) {
                $errors = array_merge(
                    $errors,
                    $this->validateDefinition($item, "{$key}[{$index}]", $category),
                );
            }
        }

        return $errors;
    }

    /**
     * Validate a single component definition.
     *
     * @return array<string>
     */
    protected function validateDefinition(array $definition, string $path, string $category): array
    {
        $errors = [];

        // 'type' is required
        if (! isset($definition['type'])) {
            $errors[] = "{$path}: missing required 'type' key.";

            return $errors;
        }

        $type = $definition['type'];

        // Type must be registered
        if (! $this->typeRegistry->has($type, $category)) {
            $errors[] = "{$path}: unknown type '{$type}' in category '{$category}'.";
        }

        // 'name' is required for fields, columns, and filters (not for layouts or actions)
        $requiresName = in_array($category, ['field', 'column', 'filter'], true);
        if ($requiresName && ! isset($definition['name'])) {
            // Check if this is actually a layout type (registered in layout category)
            $layoutTypes = $this->typeRegistry->getCategory('layout');
            $isLayout = isset($layoutTypes[$type]);
            if (! $isLayout) {
                $errors[] = "{$path}: missing required 'name' for type '{$type}'.";
            }
        }

        // Validate nested schema
        if (isset($definition['schema']) && is_array($definition['schema'])) {
            foreach ($definition['schema'] as $index => $child) {
                $errors = array_merge(
                    $errors,
                    $this->validateDefinition($child, "{$path}.schema[{$index}]", 'field'),
                );
            }
        }

        // Validate nested tabs
        if (isset($definition['tabs']) && is_array($definition['tabs'])) {
            foreach ($definition['tabs'] as $index => $tab) {
                $errors = array_merge(
                    $errors,
                    $this->validateDefinition(
                        array_merge(['type' => 'tab'], $tab),
                        "{$path}.tabs[{$index}]",
                        'layout',
                    ),
                );
            }
        }

        // Validate nested steps
        if (isset($definition['steps']) && is_array($definition['steps'])) {
            foreach ($definition['steps'] as $index => $step) {
                $errors = array_merge(
                    $errors,
                    $this->validateDefinition(
                        array_merge(['type' => 'step'], $step),
                        "{$path}.steps[{$index}]",
                        'layout',
                    ),
                );
            }
        }

        return $errors;
    }
}
