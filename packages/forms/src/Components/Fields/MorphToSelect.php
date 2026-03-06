<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MorphToSelect extends Field
{
    protected ?string $relationship = null;

    protected array $types = [];

    protected bool|Closure|array $isSearchable = false;

    protected bool|Closure $isPreload = false;

    protected int $searchDebounce = 500;

    protected int $minSearchLength = 1;

    protected ?int $optionsLimit = 50;

    protected ?Closure $getSearchResultsUsing = null;

    /**
     * Configure the MorphTo relationship.
     *
     * @param string $name The relationship method name (e.g., 'commentable')
     */
    public function relationship(string $name): static
    {
        $this->relationship = $name;

        return $this;
    }

    /**
     * Define the morphable types with their configuration.
     *
     * @param array $types Array of model class => config
     *
     * Example:
     * ->types([
     *     Post::class => 'title',  // Simple: just the title attribute
     *     Video::class => [
     *         'titleAttribute' => 'name',
     *         'label' => 'Videos',
     *         'modifyQueryUsing' => fn (Builder $query) => $query->where('active', true),
     *     ],
     * ])
     */
    public function types(array $types): static
    {
        $this->types = $types;

        return $this;
    }

    /**
     * Enable search functionality.
     *
     * @param bool|Closure|array $condition True to search on title attribute,
     *                                       or array of column names to search on multiple columns.
     *
     * Example:
     * ->searchable()                           // Search on title attribute only
     * ->searchable(['name', 'email', 'code'])  // Search on multiple columns
     */
    public function searchable(bool|Closure|array $condition = true): static
    {
        $this->isSearchable = $condition;

        return $this;
    }

    /**
     * Preload all options for client-side filtering.
     * When false (default) and searchable is true, options are loaded async from the server.
     */
    public function preload(bool|Closure $condition = true): static
    {
        $this->isPreload = $condition;

        return $this;
    }

    /**
     * Set the debounce time for async search (in milliseconds).
     */
    public function searchDebounce(int $milliseconds): static
    {
        $this->searchDebounce = $milliseconds;

        return $this;
    }

    /**
     * Set the minimum search length before triggering async search.
     */
    public function minSearchLength(int $length): static
    {
        $this->minSearchLength = $length;

        return $this;
    }

    /**
     * Set the maximum number of options to return.
     */
    public function optionsLimit(int $limit): static
    {
        $this->optionsLimit = $limit;

        return $this;
    }

    public function isSearchable(): bool
    {
        $value = $this->evaluate($this->isSearchable);

        // If array of columns is passed, searchable is enabled
        if (is_array($value)) {
            return true;
        }

        return (bool) $value;
    }

    /**
     * Get the columns to search on.
     * Returns array of column names, or null to use title attribute only.
     *
     * @return array|null
     */
    public function getSearchColumns(): ?array
    {
        $value = $this->evaluate($this->isSearchable);

        if (is_array($value)) {
            return $value;
        }

        return null;
    }

    public function isPreload(): bool
    {
        return (bool) $this->evaluate($this->isPreload);
    }

    /**
     * Check if async search should be used.
     * Async search is enabled when searchable is true and preload is false.
     */
    public function isAsyncSearch(): bool
    {
        return $this->isSearchable() && ! $this->isPreload();
    }

    public function getSearchDebounce(): int
    {
        return $this->searchDebounce;
    }

    public function getMinSearchLength(): int
    {
        return $this->minSearchLength;
    }

    public function getOptionsLimit(): int
    {
        return $this->optionsLimit ?? 50;
    }

    /**
     * Custom callback for searching options.
     * Receives (string $search, string $modelClass, Field $component) and should return array of options.
     *
     * Example:
     * ->getSearchResultsUsing(function (string $search, string $modelClass) {
     *     return $modelClass::where('name', 'like', "%{$search}%")
     *         ->orWhere('code', 'like', "%{$search}%")
     *         ->limit(20)
     *         ->pluck('name', 'id')
     *         ->toArray();
     * })
     */
    public function getSearchResultsUsing(?Closure $callback): static
    {
        $this->getSearchResultsUsing = $callback;

        return $this;
    }

    /**
     * Search options for a specific morph type.
     *
     * @return array<int|string, string>
     */
    public function searchOptionsForType(string $modelClass, string $search): array
    {
        // Custom search callback takes precedence
        if ($this->getSearchResultsUsing) {
            return $this->evaluate($this->getSearchResultsUsing, [
                'search' => $search,
                'modelClass' => $modelClass,
            ]) ?? [];
        }

        $types = $this->getTypes();

        if (! isset($types[$modelClass])) {
            return [];
        }

        $config = $types[$modelClass];
        $model = new $modelClass;
        $query = $model->query();

        if ($config['modifyQueryUsing']) {
            ($config['modifyQueryUsing'])($query);
        }

        // Get columns to search on
        $searchColumns = $this->getSearchColumns() ?? [$config['titleAttribute']];

        // Add search conditions (OR across all columns)
        $query->where(function ($q) use ($searchColumns, $search) {
            foreach ($searchColumns as $index => $column) {
                if ($index === 0) {
                    $q->where($column, 'like', "%{$search}%");
                } else {
                    $q->orWhere($column, 'like', "%{$search}%");
                }
            }
        });

        // Limit results
        $query->limit($this->getOptionsLimit());

        return $query->pluck($config['titleAttribute'], $model->getKeyName())->toArray();
    }

    public function getRelationshipName(): ?string
    {
        return $this->relationship;
    }

    public function hasRelationship(): bool
    {
        return $this->relationship !== null;
    }

    /**
     * Get the MorphTo relation instance.
     */
    public function getRelation(): ?MorphTo
    {
        $model = $this->getRelationshipModel();

        if (! $model) {
            return null;
        }

        $instance = $model instanceof Model ? $model : new $model;
        $relationshipName = $this->relationship;

        if (! method_exists($instance, $relationshipName)) {
            return null;
        }

        $relation = $instance->{$relationshipName}();

        return $relation instanceof MorphTo ? $relation : null;
    }

    /**
     * Get the morph type column name (e.g., 'commentable_type').
     */
    public function getMorphTypeColumn(): ?string
    {
        $relation = $this->getRelation();

        return $relation?->getMorphType();
    }

    /**
     * Get the morph id column name (e.g., 'commentable_id').
     */
    public function getMorphIdColumn(): ?string
    {
        $relation = $this->getRelation();

        return $relation?->getForeignKeyName();
    }

    /**
     * Get configured types with normalized structure.
     *
     * @return array<string, array{titleAttribute: string, label: string, modifyQueryUsing: ?Closure}>
     */
    public function getTypes(): array
    {
        $normalized = [];

        foreach ($this->types as $modelClass => $config) {
            if (is_string($config)) {
                // Simple format: Post::class => 'title'
                $normalized[$modelClass] = [
                    'titleAttribute' => $config,
                    'label' => $this->getModelLabel($modelClass),
                    'modifyQueryUsing' => null,
                ];
            } else {
                // Full format with array config
                $normalized[$modelClass] = [
                    'titleAttribute' => $config['titleAttribute'] ?? 'id',
                    'label' => $config['label'] ?? $this->getModelLabel($modelClass),
                    'modifyQueryUsing' => $config['modifyQueryUsing'] ?? null,
                ];
            }
        }

        return $normalized;
    }

    /**
     * Get options for the type selector.
     *
     * @return array<string, string> [model_class => label]
     */
    public function getTypeOptions(): array
    {
        $options = [];

        foreach ($this->getTypes() as $modelClass => $config) {
            $options[$modelClass] = $config['label'];
        }

        return $options;
    }

    /**
     * Get options for a specific morph type.
     *
     * @return array<int|string, string> [id => title]
     */
    public function getOptionsForType(string $modelClass): array
    {
        $types = $this->getTypes();

        if (! isset($types[$modelClass])) {
            return [];
        }

        $config = $types[$modelClass];
        $model = new $modelClass;
        $query = $model->query();

        if ($config['modifyQueryUsing']) {
            ($config['modifyQueryUsing'])($query);
        }

        return $query->pluck($config['titleAttribute'], $model->getKeyName())->toArray();
    }

    /**
     * Get options for Vue, grouped by type.
     * When async search is enabled, returns only selected options initially.
     *
     * @return array<string, array<array{label: string, value: mixed}>>
     */
    public function getOptionsForVue(): array
    {
        // For async search (searchable without preload), return only selected option initially
        if ($this->isAsyncSearch()) {
            return $this->getSelectedOptionsForVue();
        }

        $result = [];

        foreach ($this->getTypes() as $modelClass => $config) {
            $options = $this->getOptionsForType($modelClass);

            $result[$modelClass] = collect($options)->map(function ($label, $value) {
                return [
                    'label' => $label,
                    'value' => $value,
                ];
            })->values()->all();
        }

        return $result;
    }

    /**
     * Get the currently selected option for async searchable display.
     *
     * @return array<string, array<array{label: string, value: mixed}>>
     */
    protected function getSelectedOptionsForVue(): array
    {
        $result = [];

        // Initialize empty arrays for all types
        foreach ($this->getTypes() as $modelClass => $config) {
            $result[$modelClass] = [];
        }

        // Try to get current selected value
        $container = $this->container ?? null;
        if (! $container) {
            return $result;
        }

        $livue = method_exists($container, 'getLivue') ? $container->getLivue() : null;
        if (! $livue) {
            return $result;
        }

        $formStatePath = method_exists($container, 'getStatePath') ? $container->getStatePath() : null;
        $formData = $formStatePath ? ($livue->{$formStatePath} ?? []) : [];

        $typeColumn = $this->getMorphTypeColumn();
        $idColumn = $this->getMorphIdColumn();

        $currentType = $formData[$typeColumn] ?? null;
        $currentId = $formData[$idColumn] ?? null;

        if ($currentType && $currentId && isset($this->getTypes()[$currentType])) {
            $config = $this->getTypes()[$currentType];
            $model = new $currentType;
            $record = $model->find($currentId);

            if ($record) {
                $result[$currentType] = [
                    [
                        'label' => $record->{$config['titleAttribute']},
                        'value' => $currentId,
                    ],
                ];
            }
        }

        return $result;
    }

    /**
     * Get type options formatted for Vue.
     *
     * @return array<array{label: string, value: string}>
     */
    public function getTypeOptionsForVue(): array
    {
        return collect($this->getTypeOptions())->map(function ($label, $value) {
            return [
                'label' => $label,
                'value' => $value,
            ];
        })->values()->all();
    }

    /**
     * Generate a human-readable label from a model class.
     */
    protected function getModelLabel(string $modelClass): string
    {
        $basename = class_basename($modelClass);

        // Convert CamelCase to words and pluralize
        $words = preg_replace('/([a-z])([A-Z])/', '$1 $2', $basename);

        return str($words)->plural()->toString();
    }

    protected function getRelationshipModel(): mixed
    {
        $container = $this->container ?? null;

        if (! $container) {
            return null;
        }

        if (method_exists($container, 'getModel')) {
            return $container->getModel();
        }

        return null;
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.morph-to-select';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'types' => $this->getTypeOptions(),
            'searchable' => $this->isSearchable(),
        ]);
    }
}
