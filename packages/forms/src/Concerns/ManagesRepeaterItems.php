<?php

namespace Primix\Forms\Concerns;

trait ManagesRepeaterItems
{
    public function repeaterAddItem(string $statePath, array $blankItem): void
    {
        $items = $this->getRepeaterItems($statePath);
        $items[] = $blankItem;
        $this->setRepeaterItems($statePath, $items);
    }

    public function repeaterRemoveItem(string $statePath, int $index): void
    {
        $items = $this->getRepeaterItems($statePath);
        array_splice($items, $index, 1);
        $this->setRepeaterItems($statePath, array_values($items));
    }

    public function repeaterMoveItem(string $statePath, int $fromIndex, int $toIndex): void
    {
        $items = $this->getRepeaterItems($statePath);

        if ($fromIndex < 0 || $fromIndex >= count($items) || $toIndex < 0 || $toIndex >= count($items)) {
            return;
        }

        $temp = $items[$fromIndex];
        $items[$fromIndex] = $items[$toIndex];
        $items[$toIndex] = $temp;
        $this->setRepeaterItems($statePath, $items);
    }

    public function repeaterCloneItem(string $statePath, int $index): void
    {
        $items = $this->getRepeaterItems($statePath);

        if ($index < 0 || $index >= count($items)) {
            return;
        }

        $clone = $items[$index];
        array_splice($items, $index + 1, 0, [$clone]);
        $this->setRepeaterItems($statePath, $items);
    }

    protected function getRepeaterItems(string $statePath): array
    {
        return data_get($this, $this->normalizeRepeaterStatePath($statePath)) ?? [];
    }

    protected function setRepeaterItems(string $statePath, array $items): void
    {
        $segments = explode('.', $this->normalizeRepeaterStatePath($statePath));
        $property = array_shift($segments);

        if (empty($segments)) {
            $this->{$property} = $items;

            return;
        }

        $data = $this->{$property};
        data_set($data, implode('.', $segments), $items);
        $this->{$property} = $data;
    }

    /**
     * Repeater action statePaths arrive as JS expressions (the same form used
     * for v-model), e.g. "data.items[0].children". Convert the "[index]"
     * segments back to Laravel dot notation ("data.items.0.children") so
     * data_get()/data_set() resolve nested repeaters correctly. Top-level
     * repeaters ("data.items") contain no brackets and are left untouched.
     */
    protected function normalizeRepeaterStatePath(string $statePath): string
    {
        return preg_replace('/\[(\d+)\]/', '.$1', $statePath);
    }
}
