<?php

namespace Primix\Resources\Concerns;

use Illuminate\Database\Eloquent\Model;
use Primix\GlobalSearch\GlobalSearchResult;

trait HasGlobalSearch
{
    protected static bool $isGloballySearchable = false;

    protected static array $globalSearchAttributes = [];

    protected static int $globalSearchResultsLimit = 50;

    public static function isGloballySearchable(): bool
    {
        return static::$isGloballySearchable
            && static::getRecordTitleAttribute() !== null;
    }

    public static function getGloballySearchableAttributes(): array
    {
        if (static::$globalSearchAttributes !== []) {
            return static::$globalSearchAttributes;
        }

        $modelClass = static::getModel();

        if (method_exists($modelClass, 'getPrimixSearchableColumns')) {
            $attributes = $modelClass::getPrimixSearchableColumns();

            if (is_array($attributes)) {
                return $attributes;
            }
        }

        return [];
    }

    public static function getGlobalSearchResultsLimit(): int
    {
        return static::$globalSearchResultsLimit;
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [];
    }

    public static function getGlobalSearchResultTitle(Model $record): string
    {
        return static::getRecordTitle($record) ?? '';
    }

    public static function getGlobalSearchResultUrl(Model $record): string
    {
        return static::getUrl('edit', ['record' => $record->getKey()]);
    }

    public static function getGlobalSearchResults(string $search): array
    {
        $attributes = static::getGloballySearchableAttributes();

        if (empty($attributes)) {
            return [];
        }

        $query = static::getEloquentQuery();

        $query->where(function ($q) use ($attributes, $search) {
            foreach ($attributes as $attribute) {
                $q->orWhere($attribute, 'like', "%{$search}%");
            }
        });

        $query->limit(static::getGlobalSearchResultsLimit());

        return $query->get()
            ->map(fn (Model $record) => new GlobalSearchResult(
                title: static::getGlobalSearchResultTitle($record),
                url: static::getGlobalSearchResultUrl($record),
                details: static::getGlobalSearchResultDetails($record),
            ))
            ->all();
    }
}
