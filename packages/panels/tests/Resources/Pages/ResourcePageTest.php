<?php

use Primix\Resources\Pages\CreateRecord;
use Primix\Resources\Pages\EditRecord;
use Primix\Resources\Pages\ListRecords;
use Primix\Resources\Pages\Page;
use Primix\Resources\Pages\ViewRecord;

// ============================================================
// Resources\Pages\Page — base
// ============================================================

it('shouldRegisterNavigation is false by default on resource pages', function () {
    expect(Page::shouldRegisterNavigation())->toBeFalse();
});

it('getResource throws RuntimeException when no resource or route context', function () {
    $page = new class extends Page { protected function render(): string { return ''; } };

    expect(fn () => $page::getResource())->toThrow(RuntimeException::class);
});

it('getResource returns static $resource when set', function () {
    $page = new class extends Page {
        protected static ?string $resource = 'App\\Primix\\Resources\\PostResource';

        protected function render(): string { return ''; }
    };

    expect($page::getResource())->toBe('App\\Primix\\Resources\\PostResource');
});

// ============================================================
// ListRecords
// ============================================================

it('ListRecords uses HasForms trait', function () {
    expect(class_uses_recursive(ListRecords::class))->toContain(\Primix\Forms\HasForms::class);
});

it('ListRecords uses HasTable trait', function () {
    expect(class_uses_recursive(ListRecords::class))->toContain(\Primix\Tables\HasTable::class);
});

it('ListRecords extends Resources\\Pages\\Page', function () {
    expect(is_subclass_of(ListRecords::class, Page::class))->toBeTrue();
});

// ============================================================
// CreateRecord
// ============================================================

it('CreateRecord uses HasForms trait', function () {
    expect(class_uses_recursive(CreateRecord::class))->toContain(\Primix\Forms\HasForms::class);
});

it('CreateRecord extends Resources\\Pages\\Page', function () {
    expect(is_subclass_of(CreateRecord::class, Page::class))->toBeTrue();
});

it('CreateRecord has public data array property', function () {
    $ref = new ReflectionClass(CreateRecord::class);
    $prop = $ref->getProperty('data');

    expect($prop->isPublic())->toBeTrue()
        ->and($prop->getDefaultValue())->toBeArray();
});

// ============================================================
// EditRecord
// ============================================================

it('EditRecord uses HasForms trait', function () {
    expect(class_uses_recursive(EditRecord::class))->toContain(\Primix\Forms\HasForms::class);
});

it('EditRecord uses HasRelationManagers trait', function () {
    expect(class_uses_recursive(EditRecord::class))->toContain(\Primix\Resources\Concerns\HasRelationManagers::class);
});

it('EditRecord extends Resources\\Pages\\Page', function () {
    expect(is_subclass_of(EditRecord::class, Page::class))->toBeTrue();
});

it('EditRecord has public nullable record property', function () {
    $ref = new ReflectionClass(EditRecord::class);
    $prop = $ref->getProperty('record');

    expect($prop->isPublic())->toBeTrue()
        ->and($prop->getDefaultValue())->toBeNull();
});

it('EditRecord has public data array property', function () {
    $ref = new ReflectionClass(EditRecord::class);
    $prop = $ref->getProperty('data');

    expect($prop->isPublic())->toBeTrue()
        ->and($prop->getDefaultValue())->toBeArray();
});

// ============================================================
// ViewRecord
// ============================================================

it('ViewRecord uses HasRelationManagers trait', function () {
    expect(class_uses_recursive(ViewRecord::class))->toContain(\Primix\Resources\Concerns\HasRelationManagers::class);
});

it('ViewRecord extends Resources\\Pages\\Page', function () {
    expect(is_subclass_of(ViewRecord::class, Page::class))->toBeTrue();
});

it('ViewRecord has public nullable record property', function () {
    $ref = new ReflectionClass(ViewRecord::class);
    $prop = $ref->getProperty('record');

    expect($prop->isPublic())->toBeTrue()
        ->and($prop->getDefaultValue())->toBeNull();
});

it('ViewRecord has public data array property', function () {
    $ref = new ReflectionClass(ViewRecord::class);
    $prop = $ref->getProperty('data');

    expect($prop->isPublic())->toBeTrue()
        ->and($prop->getDefaultValue())->toBeArray();
});

// ============================================================
// Breadcrumb Label Resolution
// ============================================================

function callBreadcrumbLabel(string $route, ?string $name): string
{
    $page = new class extends Page { protected function render(): string { return ''; } };
    $method = (new ReflectionClass($page))->getMethod('resolveResourcePathBreadcrumbLabel');
    $method->setAccessible(true);

    return $method->invokeArgs($page, [$route, $name]);
}

it('breadcrumb label returns list for empty route', function () {
    expect(callBreadcrumbLabel('', null))->toBe('List');
});

it('breadcrumb label returns list for root slash route', function () {
    expect(callBreadcrumbLabel('/', null))->toBe('List');
});

it('breadcrumb label returns list for index name', function () {
    expect(callBreadcrumbLabel('', 'index'))->toBe('List');
});

it('breadcrumb label returns create for create name', function () {
    expect(callBreadcrumbLabel('', 'create'))->toBe('Create');
});

it('breadcrumb label returns edit for edit name', function () {
    expect(callBreadcrumbLabel('', 'edit'))->toBe('Edit');
});

it('breadcrumb label returns view for view name', function () {
    expect(callBreadcrumbLabel('', 'view'))->toBe('View');
});

it('breadcrumb label headline-cases last segment for unknown route', function () {
    expect(callBreadcrumbLabel('export-csv', 'export-csv'))->toBe('Export Csv');
});

it('breadcrumb label skips route parameters and uses last static segment', function () {
    // name 'edit' is a known key → returns translated 'Edit'
    expect(callBreadcrumbLabel('/{record}/edit', 'edit'))->toBe('Edit');
});

it('breadcrumb label uses route segment when name is unknown', function () {
    expect(callBreadcrumbLabel('bulk-export', 'bulk-export'))->toBe('Bulk Export');
});
