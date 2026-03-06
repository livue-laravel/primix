<?php

namespace Primix\Support\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait HasPrimixQueryScopes
{
    public function scopeActive(Builder $query, bool $active = true): Builder
    {
        return $this->applyPrimixBooleanScope($query, $this->getPrimixActiveColumn(), $active);
    }

    public function scopeVisible(Builder $query, bool $visible = true): Builder
    {
        return $this->applyPrimixBooleanScope($query, $this->getPrimixVisibleColumn(), $visible);
    }

    public function scopeOrdered(Builder $query, string $direction = 'asc'): Builder
    {
        $column = $this->getPrimixOrderColumn();

        if (! $this->primixTableHasColumn($column)) {
            return $query;
        }

        return $query->orderBy($this->qualifyColumn($column), $direction);
    }

    public function scopeLatestFirst(Builder $query): Builder
    {
        $column = $this->getPrimixLatestColumn();

        if (! $this->primixTableHasColumn($column)) {
            return $query;
        }

        return $query->orderByDesc($this->qualifyColumn($column));
    }

    public function getPrimixActiveColumn(): string
    {
        return 'is_active';
    }

    public function getPrimixVisibleColumn(): string
    {
        return 'is_visible';
    }

    public function getPrimixOrderColumn(): string
    {
        return 'sort_order';
    }

    public function getPrimixLatestColumn(): string
    {
        return $this->getCreatedAtColumn();
    }
}

