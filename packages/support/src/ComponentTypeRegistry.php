<?php

namespace Primix\Support;

class ComponentTypeRegistry
{
    /** @var array<string, array<string, class-string>> */
    protected array $types = [];

    /**
     * Register a component type under a category.
     */
    public function register(string $category, string $alias, string $class): void
    {
        $this->types[$category][$alias] = $class;
    }

    /**
     * Register multiple component types under a category.
     *
     * @param array<string, class-string> $types
     */
    public function registerMany(string $category, array $types): void
    {
        foreach ($types as $alias => $class) {
            $this->register($category, $alias, $class);
        }
    }

    /**
     * Resolve a type alias to its FQCN.
     *
     * If category is given, looks there first.
     * Falls back to cross-category search if not found.
     */
    public function resolve(string $alias, ?string $category = null): ?string
    {
        // Direct lookup in specified category
        if ($category !== null && isset($this->types[$category][$alias])) {
            return $this->types[$category][$alias];
        }

        // Try to infer category from alias suffix
        $inferred = $this->inferCategory($alias);
        if ($inferred !== null && isset($this->types[$inferred][$alias])) {
            return $this->types[$inferred][$alias];
        }

        // Cross-category fallback
        foreach ($this->types as $types) {
            if (isset($types[$alias])) {
                return $types[$alias];
            }
        }

        return null;
    }

    /**
     * Check if a type alias is registered.
     */
    public function has(string $alias, ?string $category = null): bool
    {
        return $this->resolve($alias, $category) !== null;
    }

    /**
     * Get all types in a category.
     *
     * @return array<string, class-string>
     */
    public function getCategory(string $category): array
    {
        return $this->types[$category] ?? [];
    }

    /**
     * Get all registered types grouped by category.
     *
     * @return array<string, array<string, class-string>>
     */
    public function all(): array
    {
        return $this->types;
    }

    /**
     * Infer category from alias suffix.
     *
     * E.g. 'text-column' -> 'column', 'select-filter' -> 'filter'
     */
    protected function inferCategory(string $alias): ?string
    {
        $suffixes = ['column', 'filter', 'action'];

        foreach ($suffixes as $suffix) {
            if (str_ends_with($alias, '-' . $suffix)) {
                return $suffix;
            }
        }

        return null;
    }
}
