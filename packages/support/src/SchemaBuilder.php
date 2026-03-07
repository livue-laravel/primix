<?php

namespace Primix\Support;

use Illuminate\Support\Str;
use ReflectionMethod;

class SchemaBuilder
{
    /** Keys that are consumed by the builder and should not be applied as properties. */
    protected const RESERVED_KEYS = ['type', 'schema', 'tabs', 'steps', 'form'];

    public function __construct(
        protected ComponentTypeRegistry $typeRegistry,
    ) {}

    /**
     * Build an array of components from definitions.
     *
     * @param  array<array>  $definitions
     * @param  array<string, \Closure>  $callbacks
     * @return array<object>
     */
    public function build(array $definitions, string $category = 'field', array $callbacks = []): array
    {
        $components = [];

        foreach ($definitions as $definition) {
            $component = $this->buildComponent($definition, $category, $callbacks);

            if ($component !== null) {
                $components[] = $component;
            }
        }

        return $components;
    }

    /**
     * Build a single component from a definition array.
     */
    public function buildComponent(array $definition, string $category, array $callbacks): ?object
    {
        $type = $definition['type'] ?? null;

        if ($type === null) {
            return null;
        }

        $class = $this->resolveClass($type, $category);

        if ($class === null) {
            return null;
        }

        $component = $this->instantiate($class, $definition);
        $this->applyProperties($component, $definition, $callbacks);
        $this->applyNestedSchemas($component, $definition, $callbacks);

        return $component;
    }

    /**
     * Resolve a type string to its FQCN, with cross-category fallback.
     */
    protected function resolveClass(string $type, string $category): ?string
    {
        return $this->typeRegistry->resolve($type, $category);
    }

    /**
     * Instantiate a component using its make() method.
     *
     * Uses reflection on the make() method to determine which parameter to pass:
     * - $name → passes definition['name'] (Field, Column, Filter)
     * - $label → passes definition['label'] (Section, Fieldset, Tabs, Wizard)
     * - $columns → passes definition['columns'] (Grid)
     * - Variadic or no required params → make() with appropriate args
     */
    protected function instantiate(string $class, array $definition): object
    {
        if (! method_exists($class, 'make')) {
            return new $class();
        }

        $reflection = new ReflectionMethod($class, 'make');
        $parameters = $reflection->getParameters();

        // No parameters → make()
        if (empty($parameters)) {
            return $class::make();
        }

        $firstParam = $parameters[0];

        // Variadic parameter (Tab, Step) → pass label if available
        if ($firstParam->isVariadic()) {
            if (isset($definition['label'])) {
                return $class::make($definition['label']);
            }

            return $class::make();
        }

        $paramName = $firstParam->getName();

        // Match parameter name to definition keys
        return match ($paramName) {
            'name' => $class::make($definition['name'] ?? null),
            'label' => $class::make($definition['label'] ?? null),
            'columns' => $class::make($definition['columns'] ?? $this->getParamDefault($firstParam, 2)),
            default => $firstParam->isOptional()
                ? $class::make()
                : $class::make($definition[$paramName] ?? $this->getParamDefault($firstParam)),
        };
    }

    /**
     * Apply scalar/array properties as fluent method calls.
     */
    protected function applyProperties(object $component, array $definition, array $callbacks): void
    {
        foreach ($definition as $key => $value) {
            if (in_array($key, self::RESERVED_KEYS, true)) {
                continue;
            }

            // Resolve @callback references
            if (is_string($value) && str_starts_with($value, '@')) {
                $callbackName = substr($value, 1);
                if (isset($callbacks[$callbackName])) {
                    $value = $callbacks[$callbackName];
                }
            }

            // Resolve declarative expressions
            if (SchemaExpressions::isExpression($value)) {
                $value = SchemaExpressions::resolve($value);
            }

            // Convert kebab-case to camelCase
            $method = Str::camel($key);

            if (method_exists($component, $method)) {
                $component->{$method}($value);
            }
        }
    }

    /**
     * Handle nested schemas: 'schema', 'tabs', 'steps'.
     */
    protected function applyNestedSchemas(object $component, array $definition, array $callbacks): void
    {
        // Action form schema
        if (array_key_exists('form', $definition) && method_exists($component, 'form')) {
            $form = $definition['form'];

            if (is_string($form) && str_starts_with($form, '@')) {
                $callbackName = substr($form, 1);
                if (isset($callbacks[$callbackName])) {
                    $form = $callbacks[$callbackName];
                }
            }

            if (is_array($form) && method_exists($component, 'formFromSchema')) {
                $component->formFromSchema($form, $callbacks);
            } elseif (is_array($form) || $form instanceof \Closure) {
                $component->form($form);
            }
        }

        // Nested schema (Section, Fieldset, Repeater, etc.)
        if (isset($definition['schema']) && method_exists($component, 'schema')) {
            $children = $this->build($definition['schema'], 'field', $callbacks);
            $component->schema($children);
        }

        // Tabs container → build Tab children
        if (isset($definition['tabs']) && method_exists($component, 'schema')) {
            $tabClass = $this->typeRegistry->resolve('tab', 'layout');
            $tabs = [];

            foreach ($definition['tabs'] as $tabDef) {
                if ($tabClass !== null) {
                    $tabDef['type'] = 'tab';
                    $tab = $this->buildComponent($tabDef, 'layout', $callbacks);
                    if ($tab !== null) {
                        $tabs[] = $tab;
                    }
                }
            }

            $component->schema($tabs);
        }

        // Wizard container → build Step children
        if (isset($definition['steps']) && method_exists($component, 'schema')) {
            $stepClass = $this->typeRegistry->resolve('step', 'layout');
            $steps = [];

            foreach ($definition['steps'] as $stepDef) {
                if ($stepClass !== null) {
                    $stepDef['type'] = 'step';
                    $step = $this->buildComponent($stepDef, 'layout', $callbacks);
                    if ($step !== null) {
                        $steps[] = $step;
                    }
                }
            }

            $component->schema($steps);
        }
    }

    /**
     * Get the default value of a parameter, or a fallback.
     */
    protected function getParamDefault(\ReflectionParameter $param, mixed $fallback = null): mixed
    {
        return $param->isDefaultValueAvailable() ? $param->getDefaultValue() : $fallback;
    }
}
