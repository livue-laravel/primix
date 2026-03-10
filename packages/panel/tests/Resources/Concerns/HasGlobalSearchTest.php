<?php

use Illuminate\Database\Eloquent\Model;
use Primix\Support\Models\Model as PrimixModel;

// ── Test doubles ────────────────────────────────────────────

class SearchTestModel extends Model
{
    protected $table = 'search_test_models';
}

class SearchableResource extends \Primix\Resources\Resource
{
    protected static ?string $model = SearchTestModel::class;
    protected static bool $isGloballySearchable = true;
    protected static ?string $recordTitleAttribute = 'name';
    protected static array $globalSearchAttributes = ['name', 'email'];
    protected static int $globalSearchResultsLimit = 25;

    public static function getPages(): array
    {
        return [];
    }
}

class NonSearchableResource extends \Primix\Resources\Resource
{
    protected static ?string $model = SearchTestModel::class;

    public static function getPages(): array
    {
        return [];
    }
}

class SearchableNoTitleResource extends \Primix\Resources\Resource
{
    protected static ?string $model = SearchTestModel::class;
    protected static bool $isGloballySearchable = true;
    // No recordTitleAttribute set

    public static function getPages(): array
    {
        return [];
    }
}

class SearchMetadataModel extends PrimixModel
{
    protected $table = 'search_metadata_models';

    public static function getPrimixSearchableColumns(): array
    {
        return ['name', 'sku'];
    }
}

class ModelMetadataSearchResource extends \Primix\Resources\Resource
{
    protected static ?string $model = SearchMetadataModel::class;
    protected static bool $isGloballySearchable = true;
    protected static ?string $recordTitleAttribute = 'name';

    public static function getPages(): array
    {
        return [];
    }
}

// ============================================================
// isGloballySearchable
// ============================================================

it('is not globally searchable by default', function () {
    expect(NonSearchableResource::isGloballySearchable())->toBeFalse();
});

it('is globally searchable when enabled and has recordTitleAttribute', function () {
    expect(SearchableResource::isGloballySearchable())->toBeTrue();
});

it('is not globally searchable without recordTitleAttribute even if flag is true', function () {
    expect(SearchableNoTitleResource::isGloballySearchable())->toBeFalse();
});

// ============================================================
// Search Attributes & Limit
// ============================================================

it('returns globally searchable attributes', function () {
    expect(SearchableResource::getGloballySearchableAttributes())->toBe(['name', 'email']);
});

it('returns custom results limit', function () {
    expect(SearchableResource::getGlobalSearchResultsLimit())->toBe(25);
});

it('has default results limit of 50', function () {
    expect(NonSearchableResource::getGlobalSearchResultsLimit())->toBe(50);
});

it('falls back to model searchable metadata when resource attributes are not defined', function () {
    expect(ModelMetadataSearchResource::getGloballySearchableAttributes())->toBe(['name', 'sku']);
});
