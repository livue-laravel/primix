<?php

use Illuminate\Database\Eloquent\Model;
use Primix\Details\Details;
use Primix\Forms\Form;
use Primix\Pages\PageRegistration;
use Primix\Tables\Table;

// ── Test doubles ────────────────────────────────────────────

class ResourceTestModel extends Model
{
    protected $table = 'resource_test_models';
}

class ProductVariant extends Model
{
    protected $table = 'product_variants';
}

class BasicTestResource extends \Primix\Resources\Resource
{
    protected static ?string $model = ResourceTestModel::class;

    public static function getPages(): array
    {
        return [
            'index' => new PageRegistration('ListPage', '/'),
            'create' => new PageRegistration('CreatePage', '/create'),
            'edit' => new PageRegistration('EditPage', '/{record}/edit'),
        ];
    }
}

class NoModelTestResource extends \Primix\Resources\Resource
{
    public static function getPages(): array
    {
        return [];
    }
}

class ProductVariantTestResource extends \Primix\Resources\Resource
{
    protected static ?string $model = ProductVariant::class;

    public static function getPages(): array
    {
        return [];
    }
}

class CustomTestResource extends \Primix\Resources\Resource
{
    protected static ?string $model = ResourceTestModel::class;
    protected static ?string $slug = 'custom-items';
    protected static ?string $navigationLabel = 'My Items';
    protected static ?string $navigationIcon = 'heroicon-o-star';
    protected static ?string $navigationGroup = 'Content';
    protected static ?string $navigationSubGroup = 'Blog';
    protected static ?int $navigationSort = 5;
    protected static ?string $modelLabel = 'article';
    protected static ?string $pluralModelLabel = 'articles';
    protected static ?string $recordTitleAttribute = 'title';
    protected static bool $shouldRegisterNavigation = false;

    public static function getPages(): array
    {
        return [];
    }
}

// ============================================================
// Model Resolution
// ============================================================

it('getModel returns model class', function () {
    expect(BasicTestResource::getModel())->toBe(ResourceTestModel::class);
});

it('getModel throws when model not defined', function () {
    NoModelTestResource::getModel();
})->throws(\Exception::class);

// ============================================================
// Slug Generation
// ============================================================

it('auto-generates slug from class name', function () {
    // BasicTestResource → 'BasicTest' → plural 'BasicTests' → kebab 'basic-tests'
    expect(BasicTestResource::getSlug())->toBe('basic-tests');
});

it('returns custom slug when defined', function () {
    expect(CustomTestResource::getSlug())->toBe('custom-items');
});

// ============================================================
// Label Generation
// ============================================================

it('auto-generates navigation label from class name', function () {
    // BasicTestResource → 'BasicTest' → plural 'BasicTests' → headline 'Basic Tests'
    expect(BasicTestResource::getNavigationLabel())->toBe('Basic Tests');
});

it('returns custom navigation label when defined', function () {
    expect(CustomTestResource::getNavigationLabel())->toBe('My Items');
});

it('auto-generates model label from model class', function () {
    // ResourceTestModel → headline 'Resource Test Model' → lower+ucfirst 'Resource test model'
    expect(BasicTestResource::getModelLabel())->toBe('Resource test model');
});

it('returns custom model label', function () {
    expect(CustomTestResource::getModelLabel())->toBe('article');
});

it('auto-generates plural model label', function () {
    expect(BasicTestResource::getPluralModelLabel())->toBe('Resource test models');
});

it('returns custom plural model label', function () {
    expect(CustomTestResource::getPluralModelLabel())->toBe('articles');
});

it('formats product variant labels in ucfirst sentence case', function () {
    expect(ProductVariantTestResource::getModelLabel())->toBe('Product variant')
        ->and(ProductVariantTestResource::getPluralModelLabel())->toBe('Product variants');
});

// ============================================================
// Navigation Properties
// ============================================================

it('has default navigation icon', function () {
    expect(BasicTestResource::getNavigationIcon())->toBe('heroicon-o-rectangle-stack');
});

it('returns custom navigation icon', function () {
    expect(CustomTestResource::getNavigationIcon())->toBe('heroicon-o-star');
});

it('has null navigation group by default', function () {
    expect(BasicTestResource::getNavigationGroup())->toBeNull();
});

it('returns custom navigation group', function () {
    expect(CustomTestResource::getNavigationGroup())->toBe('Content');
});

it('has null navigation subGroup by default', function () {
    expect(BasicTestResource::getNavigationSubGroup())->toBeNull();
});

it('returns custom navigation subGroup', function () {
    expect(CustomTestResource::getNavigationSubGroup())->toBe('Blog');
});

it('has null navigation sort by default', function () {
    expect(BasicTestResource::getNavigationSort())->toBeNull();
});

it('returns custom navigation sort', function () {
    expect(CustomTestResource::getNavigationSort())->toBe(5);
});

it('registers navigation by default', function () {
    expect(BasicTestResource::shouldRegisterNavigation())->toBeTrue();
});

it('can disable navigation registration', function () {
    expect(CustomTestResource::shouldRegisterNavigation())->toBeFalse();
});

// ============================================================
// Record Title
// ============================================================

it('has null record title attribute by default', function () {
    expect(BasicTestResource::getRecordTitleAttribute())->toBeNull();
});

it('returns custom record title attribute', function () {
    expect(CustomTestResource::getRecordTitleAttribute())->toBe('title');
});

it('getRecordTitle returns null when no attribute set', function () {
    expect(BasicTestResource::getRecordTitle(new ResourceTestModel()))->toBeNull();
});

// ============================================================
// Pages
// ============================================================

it('returns page registrations', function () {
    expect(BasicTestResource::getPages())->toHaveCount(3);
});

it('hasPage returns true for existing page', function () {
    expect(BasicTestResource::hasPage('index'))->toBeTrue()
        ->and(BasicTestResource::hasPage('create'))->toBeTrue()
        ->and(BasicTestResource::hasPage('edit'))->toBeTrue();
});

it('hasPage returns false for non-existing page', function () {
    expect(BasicTestResource::hasPage('view'))->toBeFalse()
        ->and(BasicTestResource::hasPage('delete'))->toBeFalse();
});

// ============================================================
// Widgets
// ============================================================

it('getWidgets returns empty array by default', function () {
    expect(BasicTestResource::getWidgets())->toBe([]);
});

it('form table and details return same builder by default', function () {
    $form = Form::make();
    $table = Table::make();
    $details = Details::make();

    expect(BasicTestResource::form($form))->toBe($form)
        ->and(BasicTestResource::table($table))->toBe($table)
        ->and(BasicTestResource::details($details))->toBe($details);
});
