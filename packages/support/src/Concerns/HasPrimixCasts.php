<?php

namespace Primix\Support\Concerns;

trait HasPrimixCasts
{
    public function getCasts(): array
    {
        return array_merge(
            $this->getPrimixDefaultCasts(),
            parent::getCasts(),
            $this->getPrimixCustomCasts(),
        );
    }

    /**
     * Default framework-level casts.
     *
     * @return array<string, string>
     */
    protected function getPrimixDefaultCasts(): array
    {
        $casts = [
            $this->getCreatedAtColumn() => 'immutable_datetime',
            $this->getUpdatedAtColumn() => 'immutable_datetime',
        ];

        if (method_exists($this, 'getDeletedAtColumn')) {
            $casts[$this->getDeletedAtColumn()] = 'immutable_datetime';
        }

        return $casts;
    }

    /**
     * Model-level custom casts for Primix features.
     *
     * @return array<string, string>
     */
    protected function getPrimixCustomCasts(): array
    {
        $casts = $this->getPrimixCasts();

        foreach ($this->getPrimixArrayCasts() as $column) {
            $casts[$column] = 'array';
        }

        foreach ($this->getPrimixDecimalCasts() as $column => $precision) {
            $casts[$column] = 'decimal:' . max(0, (int) $precision);
        }

        return $casts;
    }

    /**
     * @return array<string, string>
     */
    protected function getPrimixCasts(): array
    {
        return [];
    }

    /**
     * @return string[]
     */
    protected function getPrimixArrayCasts(): array
    {
        return [];
    }

    /**
     * @return array<string, int>
     */
    protected function getPrimixDecimalCasts(): array
    {
        return [];
    }
}

