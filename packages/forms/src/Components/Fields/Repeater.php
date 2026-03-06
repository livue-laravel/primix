<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\HasSchema;

class Repeater extends Field
{
    use HasSchema;

    protected int|Closure|null $minItems = null;

    protected int|Closure|null $maxItems = null;

    protected bool|Closure $isReorderable = true;

    protected bool|Closure $isAddable = true;

    protected bool|Closure $isDeletable = true;

    protected bool|Closure $isCollapsible = false;

    protected bool|Closure $isCloneable = false;

    protected string|Closure|null $addActionLabel = null;

    protected string|Closure|null $itemLabel = null;

    protected int|Closure $columns = 1;

    protected ?array $defaultItems = null;

    protected string|Closure $layout = 'default';

    public function minItems(int|Closure|null $count): static
    {
        $this->minItems = $count;

        return $this;
    }

    public function maxItems(int|Closure|null $count): static
    {
        $this->maxItems = $count;

        return $this;
    }

    public function reorderable(bool|Closure $condition = true): static
    {
        $this->isReorderable = $condition;

        return $this;
    }

    public function addable(bool|Closure $condition = true): static
    {
        $this->isAddable = $condition;

        return $this;
    }

    public function deletable(bool|Closure $condition = true): static
    {
        $this->isDeletable = $condition;

        return $this;
    }

    public function collapsible(bool|Closure $condition = true): static
    {
        $this->isCollapsible = $condition;

        return $this;
    }

    public function cloneable(bool|Closure $condition = true): static
    {
        $this->isCloneable = $condition;

        return $this;
    }

    public function addActionLabel(string|Closure|null $label): static
    {
        $this->addActionLabel = $label;

        return $this;
    }

    public function itemLabel(string|Closure|null $label): static
    {
        $this->itemLabel = $label;

        return $this;
    }

    public function grid(int|Closure $columns): static
    {
        $this->columns = $columns;

        return $this;
    }

    public function defaultItems(?array $items): static
    {
        $this->defaultItems = $items;

        return $this;
    }

    public function layout(string|Closure $layout): static
    {
        $this->layout = $layout;

        return $this;
    }

    public function table(): static
    {
        $this->layout = 'table';

        return $this;
    }

    public function getMinItems(): ?int
    {
        return $this->evaluate($this->minItems);
    }

    public function getMaxItems(): ?int
    {
        return $this->evaluate($this->maxItems);
    }

    public function isReorderable(): bool
    {
        return (bool) $this->evaluate($this->isReorderable);
    }

    public function isAddable(): bool
    {
        return (bool) $this->evaluate($this->isAddable);
    }

    public function isDeletable(): bool
    {
        return (bool) $this->evaluate($this->isDeletable);
    }

    public function getLayout(): string
    {
        return $this->evaluate($this->layout);
    }

    public function isTableLayout(): bool
    {
        return $this->getLayout() === 'table';
    }

    public function isCollapsible(): bool
    {
        if ($this->isTableLayout()) {
            return false;
        }

        return (bool) $this->evaluate($this->isCollapsible);
    }

    public function isCloneable(): bool
    {
        return (bool) $this->evaluate($this->isCloneable);
    }

    public function getAddActionLabel(): string
    {
        return $this->evaluate($this->addActionLabel) ?? 'Add item';
    }

    public function getItemLabel(): ?string
    {
        return $this->evaluate($this->itemLabel);
    }

    public function getGridColumns(): int
    {
        return $this->evaluate($this->columns);
    }

    /**
     * Get current items from LiVue state.
     */
    public function getItems(): array
    {
        $livue = $this->getLiVue();

        if (! $livue) {
            return [];
        }

        return data_get($livue, $this->getStatePath()) ?? [];
    }

    /**
     * Get blank item data from schema field defaults.
     */
    public function getBlankItemData(): array
    {
        $data = [];

        foreach ($this->getSchema() as $component) {
            if (method_exists($component, 'getDefaultValue') && method_exists($component, 'getName')) {
                $name = $component->getName();

                if ($name) {
                    $data[$name] = $component->getDefaultValue();
                }
            }
        }

        return $data;
    }

    /**
     * Get the column headers for table layout.
     */
    public function getTableColumns(): array
    {
        $columns = [];

        foreach ($this->getSchema() as $component) {
            $columns[] = [
                'label' => $component->getLabel(),
                'required' => method_exists($component, 'isRequired') && $component->isRequired(),
                'name' => method_exists($component, 'getName') ? $component->getName() : null,
                'width' => $component->getWidth(),
            ];
        }

        return $columns;
    }

    /**
     * Render a single field for a specific item index without label (for table layout).
     * Clones the field, hides the label, and sets the correct indexed state path.
     */
    public function renderItemFieldForTable(object $field, int $index): string
    {
        $clone = clone $field;

        $itemPath = $this->getStatePath() . '.' . $index . '.' . $field->getName();
        $clone->statePath($itemPath);

        if (method_exists($clone, 'container')) {
            $clone->container(null);
        }

        $livue = $this->getLiVue();
        if ($livue && method_exists($clone, 'livue')) {
            $clone->livue($livue);
        }

        $clone->hiddenLabel();

        if ($this->isUnwrapped() && method_exists($clone, 'unwrapped')) {
            $clone->unwrapped();
        }

        return $clone->toHtml();
    }

    /**
     * Render a single field for a specific item index.
     * Clones the field and sets the correct indexed state path.
     */
    public function renderItemField(object $field, int $index): string
    {
        $clone = clone $field;

        $itemPath = $this->getStatePath() . '.' . $index . '.' . $field->getName();
        $clone->statePath($itemPath);

        // Clear container to prevent double-prefixing in getStatePath()
        if (method_exists($clone, 'container')) {
            $clone->container(null);
        }

        // Propagate LiVue context
        $livue = $this->getLiVue();
        if ($livue && method_exists($clone, 'livue')) {
            $clone->livue($livue);
        }

        // Propagate unwrapped from Repeater to child fields
        if ($this->isUnwrapped() && method_exists($clone, 'unwrapped')) {
            $clone->unwrapped();
        }

        return $clone->toHtml();
    }

    public function getChildComponents(): array
    {
        return array_merge($this->childComponents, parent::getChildComponents());
    }

    public function getSchema(): array
    {
        return $this->childComponents;
    }

    protected function getAutoRules(): array
    {
        $rules = ['array'];

        $minItems = $this->getMinItems();
        if ($minItems !== null) {
            $rules[] = 'min:' . $minItems;
        }

        $maxItems = $this->getMaxItems();
        if ($maxItems !== null) {
            $rules[] = 'max:' . $maxItems;
        }

        return $rules;
    }

    public function getView(): string
    {
        if ($this->isTableLayout()) {
            return 'primix-forms::components.fields.repeater-table';
        }

        return 'primix-forms::components.fields.repeater';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'layout' => $this->getLayout(),
            'minItems' => $this->getMinItems(),
            'maxItems' => $this->getMaxItems(),
            'reorderable' => $this->isReorderable(),
            'addable' => $this->isAddable(),
            'deletable' => $this->isDeletable(),
            'collapsible' => $this->isCollapsible(),
            'cloneable' => $this->isCloneable(),
            'addActionLabel' => $this->getAddActionLabel(),
            'itemLabel' => $this->getItemLabel(),
            'blankItem' => $this->getBlankItemData(),
            'gridColumns' => $this->getGridColumns(),
        ]);
    }
}
