<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Illuminate\Support\Collection;
use Primix\Forms\Concerns\HasCreateOption;
use Primix\Forms\Concerns\HasEditOption;
use Primix\Forms\Concerns\HasInclusionValidationRules;
use Primix\Forms\Concerns\HasOptions;
use Primix\Forms\Concerns\HasRelationship;

class Select extends Field
{
    use HasCreateOption;
    use HasEditOption;
    use HasInclusionValidationRules;
    use HasOptions;
    use HasRelationship;

    protected bool|Closure $isMultiple = false;

    protected bool|Closure|array $isSearchable = false;

    protected bool|Closure $isNative = false;

    protected bool|Closure $isPreload = false;

    protected ?Closure $getSearchResultsUsing = null;

    protected int $searchDebounce = 500;

    protected int $minSearchLength = 1;

    protected ?string $searchPrompt = null;

    protected ?string $noSearchResultsMessage = null;

    protected ?string $loadingMessage = null;

    protected ?int $optionsLimit = null;

    protected bool|Closure $isCreateMissingOption = false;

    protected bool|Closure $isTree = false;

    protected bool|Closure $isCascading = false;

    protected bool|Closure $isListbox = false;

    protected bool|Closure $isAutocomplete = false;

    protected ?Closure $createMissingOptionUsing = null;

    public function multiple(bool|Closure $condition = true): static
    {
        $this->isMultiple = $condition;

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
     * Custom callback for searching options.
     * Receives (string $search, Field $component) and should return array of options.
     */
    public function getSearchResultsUsing(?Closure $callback): static
    {
        $this->getSearchResultsUsing = $callback;

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

    public function native(bool|Closure $condition = true): static
    {
        $this->isNative = $condition;

        return $this;
    }

    public function searchPrompt(?string $message): static
    {
        $this->searchPrompt = $message;

        return $this;
    }

    public function noSearchResultsMessage(?string $message): static
    {
        $this->noSearchResultsMessage = $message;

        return $this;
    }

    public function loadingMessage(?string $message): static
    {
        $this->loadingMessage = $message;

        return $this;
    }

    public function optionsLimit(?int $limit): static
    {
        $this->optionsLimit = $limit;

        return $this;
    }

    /**
     * Enable inline creation of missing options.
     * When enabled and the search query has no exact match, a "Create 'X'" option
     * appears in the dropdown. Clicking it creates the record immediately.
     * Requires searchable() and relationship() to be configured.
     */
    public function createMissingOption(bool|Closure $condition = true): static
    {
        $this->isCreateMissingOption = $condition;

        return $this;
    }

    /**
     * Custom callback for creating a missing option.
     * Receives (string $value) and should return the key of the new record.
     * If not set, the record is created using the relationship's title attribute.
     */
    public function createMissingOptionUsing(?Closure $callback): static
    {
        $this->createMissingOptionUsing = $callback;

        return $this;
    }

    public function tree(bool|Closure $condition = true): static
    {
        $this->isTree = $condition;

        return $this;
    }

    public function cascading(bool|Closure $condition = true): static
    {
        $this->isCascading = $condition;

        return $this;
    }

    public function listbox(bool|Closure $condition = true): static
    {
        $this->isListbox = $condition;

        return $this;
    }

    public function autoComplete(bool|Closure $condition = true): static
    {
        $this->isAutocomplete = $condition;

        return $this;
    }

    public function isTree(): bool
    {
        return (bool) $this->evaluate($this->isTree);
    }

    public function isCascading(): bool
    {
        return (bool) $this->evaluate($this->isCascading);
    }

    public function isListbox(): bool
    {
        return (bool) $this->evaluate($this->isListbox);
    }

    public function isAutocomplete(): bool
    {
        return (bool) $this->evaluate($this->isAutocomplete);
    }

    public function hasCreateMissingOption(): bool
    {
        return (bool) $this->evaluate($this->isCreateMissingOption);
    }

    public function getCreateMissingOptionUsing(): ?Closure
    {
        return $this->createMissingOptionUsing;
    }

    public function isMultiple(): bool
    {
        if ($this->hasRelationship() && $this->isBelongsToMany()) {
            return true;
        }

        return (bool) $this->evaluate($this->isMultiple);
    }

    public function getOptions(): array
    {
        // Async search (searchable without preload): only return selected options initially
        if ($this->isSearchable() && ! $this->isPreload()) {
            return $this->getSelectedOptions();
        }

        // Preload or no search: return all options
        $options = $this->evaluate($this->options);

        if ($options !== null) {
            if ($options instanceof Collection) {
                return $options->toArray();
            }

            return $options;
        }

        if ($this->hasRelationship()) {
            return $this->getRelationshipOptions();
        }

        return [];
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

    public function isNative(): bool
    {
        return (bool) $this->evaluate($this->isNative);
    }

    /**
     * Search options based on query string.
     * Used by async search to query the database.
     *
     * @return array<int|string, string>
     */
    public function searchOptions(string $search): array
    {
        $results = [];

        // Custom search callback takes precedence
        if ($this->getSearchResultsUsing) {
            $results = $this->evaluate($this->getSearchResultsUsing, [
                'search' => $search,
            ]) ?? [];
        }
        // Default: search via relationship if available
        elseif ($this->hasRelationship()) {
            $results = $this->searchRelationshipOptions($search);
        }

        // Apply filterOptionsUsing in hide mode
        if ($this->filterOptionsCallback && ! $this->filterOptionsDisabled && ! empty($results)) {
            $results = array_filter($results, function ($label, $value) {
                return (bool) $this->evaluate($this->filterOptionsCallback, [
                    'value' => $value,
                    'label' => $label,
                ]);
            }, ARRAY_FILTER_USE_BOTH);
        }

        return $results;
    }

    /**
     * Search relationship options with a query string.
     *
     * @return array<int|string, string>
     */
    protected function searchRelationshipOptions(string $search): array
    {
        $relation = $this->getRelation();

        if (! $relation) {
            return [];
        }

        $query = $this->getRelationshipQuery();
        $titleAttribute = $this->relationshipTitleAttribute;
        $keyName = $relation->getRelated()->getKeyName();

        // Get columns to search on
        $searchColumns = $this->getSearchColumns() ?? [$titleAttribute];

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
        $limit = $this->optionsLimit ?? 50;
        $query->limit($limit);

        return $query->pluck($titleAttribute, $keyName)->toArray();
    }

    /**
     * Get the currently selected option(s) for display.
     * Used when async search to show the initial selected value.
     *
     * @return array<int|string, string>
     */
    public function getSelectedOptions(): array
    {
        if (! $this->hasRelationship()) {
            return [];
        }

        $relation = $this->getRelation();
        if (! $relation) {
            return [];
        }

        // Get the current value from state
        $container = $this->container ?? null;
        if (! $container) {
            return [];
        }

        $statePath = $this->getStatePath();
        $formStatePath = method_exists($container, 'getStatePath') ? $container->getStatePath() : null;

        // Get the relative path within the form data
        $relativePath = $formStatePath ? str_replace($formStatePath . '.', '', $statePath) : $statePath;

        // Access the livue component to get state
        $livue = method_exists($container, 'getLivue') ? $container->getLivue() : null;
        if (! $livue) {
            return [];
        }

        $formData = $livue->{$formStatePath} ?? [];
        $value = data_get($formData, $relativePath);

        if (empty($value)) {
            return [];
        }

        $titleAttribute = $this->relationshipTitleAttribute;
        $keyName = $relation->getRelated()->getKeyName();
        $relatedModel = $relation->getRelated();

        // Handle single value or array of values
        $ids = is_array($value) ? $value : [$value];

        return $relatedModel->whereIn($keyName, $ids)
            ->pluck($titleAttribute, $keyName)
            ->toArray();
    }

    /**
     * Get options formatted for PrimeVue Select component.
     *
     * @return array<array{label: string, value: mixed}>
     */
    public function getOptionsForVue(): array
    {
        $options = $this->getFilteredOptions();

        return collect($options)->map(function ($label, $value) {
            $option = [
                'label' => $label,
                'value' => $value,
            ];

            if ($this->isOptionDisabled($value, $label)) {
                $option['disabled'] = true;
            }

            return $option;
        })->values()->all();
    }

    /**
     * Set the same form schema for both create and edit option modals.
     */
    public function upsertOptionForm(array|Closure $schema): static
    {
        $this->createOptionForm($schema);
        $this->editOptionForm($schema);

        return $this;
    }

    /**
     * Apply a modifier to both create and edit option actions.
     */
    public function upsertOptionAction(?Closure $modifier): static
    {
        $this->createOptionAction($modifier);
        $this->editOptionAction($modifier);

        return $this;
    }

    protected function getAutoRules(): array
    {
        if ($this->isMultiple()) {
            return ['array'];
        }

        return [];
    }

    protected function getUnwrappedStyle(): array
    {
        return [
            'select' => ['style' => 'border: 0; background: transparent; box-shadow: none;'],
        ];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.select';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'options' => $this->getFilteredOptions(),
            'multiple' => $this->isMultiple(),
            'searchable' => $this->isSearchable(),
            'native' => $this->isNative(),
            'preload' => $this->isPreload(),
            'searchDebounce' => $this->getSearchDebounce(),
            'minSearchLength' => $this->getMinSearchLength(),
            'searchPrompt' => $this->searchPrompt,
            'noSearchResultsMessage' => $this->noSearchResultsMessage,
            'loadingMessage' => $this->loadingMessage,
            'optionsLimit' => $this->optionsLimit,
            'hasCreateOption' => $this->hasCreateOptionForm(),
            'hasEditOption' => $this->hasEditOptionForm(),
            'hasCreateMissingOption' => $this->hasCreateMissingOption(),
            'tree' => $this->isTree(),
            'cascading' => $this->isCascading(),
            'listbox' => $this->isListbox(),
            'autoComplete' => $this->isAutocomplete(),
        ]);
    }
}
