<?php

namespace Primix\Forms\Concerns;

use Closure;
use Illuminate\Support\Collection;

trait HasOptions
{
    protected array|Collection|Closure|null $options = null;

    protected ?Closure $filterOptionsCallback = null;

    protected bool $filterOptionsDisabled = false;

    public function options(array|Collection|Closure|null $options): static
    {
        $this->options = $options;

        return $this;
    }

    public function filterOptionsUsing(?Closure $callback, bool $disabled = false): static
    {
        $this->filterOptionsCallback = $callback;
        $this->filterOptionsDisabled = $disabled;

        return $this;
    }

    public function getOptions(): array
    {
        $options = $this->evaluate($this->options);

        if ($options instanceof Collection) {
            return $options->toArray();
        }

        return $options ?? [];
    }

    public function getFilteredOptions(): array
    {
        $options = $this->getOptions();

        if (! $this->filterOptionsCallback) {
            return $options;
        }

        $filteredOptions = [];

        foreach ($options as $value => $label) {
            $shouldInclude = $this->evaluate($this->filterOptionsCallback, [
                'value' => $value,
                'label' => $label,
            ]);

            if (! $this->filterOptionsDisabled && ! $shouldInclude) {
                continue;
            }

            $filteredOptions[$value] = $label;
        }

        return $filteredOptions;
    }

    public function isOptionDisabled(mixed $value, string $label): bool
    {
        if (! $this->filterOptionsCallback) {
            return false;
        }

        if (! $this->filterOptionsDisabled) {
            return false;
        }

        $result = $this->evaluate($this->filterOptionsCallback, [
            'value' => $value,
            'label' => $label,
        ]);

        return ! $result;
    }
}
