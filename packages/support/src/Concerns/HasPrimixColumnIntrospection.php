<?php

namespace Primix\Support\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;

trait HasPrimixColumnIntrospection
{
    /** @var array<string, bool> */
    protected static array $primixColumnExistenceCache = [];

    public function hasPrimixColumn(string $column): bool
    {
        return $this->primixTableHasColumn($column);
    }

    protected function primixTableHasColumn(string $column): bool
    {
        $cacheKey = static::class . '|' . $this->getConnectionName() . '|' . $this->getTable() . '|' . $column;

        if (array_key_exists($cacheKey, static::$primixColumnExistenceCache)) {
            return static::$primixColumnExistenceCache[$cacheKey];
        }

        try {
            $hasColumn = Schema::connection($this->getConnectionName())->hasColumn($this->getTable(), $column);
        } catch (\Throwable) {
            $hasColumn = false;
        }

        static::$primixColumnExistenceCache[$cacheKey] = $hasColumn;

        return $hasColumn;
    }

    protected function applyPrimixBooleanScope(Builder $query, string $column, bool $expected): Builder
    {
        if (! $this->primixTableHasColumn($column)) {
            return $query;
        }

        return $query->where($this->qualifyColumn($column), $expected);
    }
}
