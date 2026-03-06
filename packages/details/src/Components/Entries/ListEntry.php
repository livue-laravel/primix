<?php

namespace Primix\Details\Components\Entries;

use Closure;
use DateTimeInterface;
use Illuminate\Support\Collection;
use Primix\Forms\Concerns\HasOptions;

class ListEntry extends Entry
{
    use HasOptions;

    protected string|Closure $separator = ', ';

    protected bool|Closure $isBulleted = true;

    public function separator(string|Closure $separator): static
    {
        $this->separator = $separator;

        return $this;
    }

    public function bulleted(bool|Closure $condition = true): static
    {
        $this->isBulleted = $condition;

        return $this;
    }

    public function getSeparator(): string
    {
        return (string) $this->evaluate($this->separator);
    }

    public function isBulleted(): bool
    {
        return (bool) $this->evaluate($this->isBulleted);
    }

    public function getItems(): array
    {
        $items = $this->normalizeStateToItems($this->getState());
        $options = $this->getFilteredOptions();

        $items = array_map(function (mixed $item) use ($options): mixed {
            $item = $this->mapItemWithOptions($item, $options);

            return $this->normalizeItemForDisplay($item);
        }, $items);

        return array_values(array_filter($items, fn (mixed $item): bool => ! ($item === null || $item === '')));
    }

    protected function mapItemWithOptions(mixed $item, array $options): mixed
    {
        if (empty($options)) {
            return $item;
        }

        if (is_bool($item)) {
            $boolKey = $item ? '1' : '0';

            if (array_key_exists($boolKey, $options)) {
                return $options[$boolKey];
            }
        }

        if (is_scalar($item) && array_key_exists($item, $options)) {
            return $options[$item];
        }

        $stringKey = is_scalar($item) ? (string) $item : null;

        if ($stringKey !== null && array_key_exists($stringKey, $options)) {
            return $options[$stringKey];
        }

        return $item;
    }

    protected function normalizeStateToItems(mixed $state): array
    {
        if ($state === null) {
            return [];
        }

        if ($state instanceof Collection) {
            $state = $state->all();
        }

        if (! is_array($state)) {
            return [$state];
        }

        $items = [];

        foreach ($state as $item) {
            if ($item instanceof Collection) {
                $item = $item->all();
            }

            if (is_array($item) && $this->isListArray($item)) {
                $items = [...$items, ...$this->normalizeStateToItems($item)];

                continue;
            }

            $items[] = $item;
        }

        return $items;
    }

    protected function isListArray(array $value): bool
    {
        if ($value === []) {
            return true;
        }

        return array_keys($value) === range(0, count($value) - 1);
    }

    protected function normalizeItemForDisplay(mixed $item): mixed
    {
        if ($item instanceof DateTimeInterface) {
            return $item->format('Y-m-d H:i:s');
        }

        if (is_bool($item)) {
            return $item ? 'Yes' : 'No';
        }

        if (is_array($item) || is_object($item)) {
            $encoded = json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

            return $encoded === false ? null : $encoded;
        }

        return $item;
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.list-entry';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'items' => $this->getItems(),
            'separator' => $this->getSeparator(),
            'bulleted' => $this->isBulleted(),
            'options' => $this->getFilteredOptions(),
        ]);
    }
}
