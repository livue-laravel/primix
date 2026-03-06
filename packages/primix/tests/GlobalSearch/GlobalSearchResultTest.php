<?php

use Primix\GlobalSearch\GlobalSearchResult;

// ============================================================
// Construction
// ============================================================

it('can be constructed with required properties', function () {
    $result = new GlobalSearchResult(title: 'Test', url: '/test');

    expect($result->title)->toBe('Test')
        ->and($result->url)->toBe('/test');
});

it('has empty details by default', function () {
    $result = new GlobalSearchResult(title: 'Test', url: '/test');

    expect($result->details)->toBe([]);
});

it('has null panelId by default', function () {
    $result = new GlobalSearchResult(title: 'Test', url: '/test');

    expect($result->panelId)->toBeNull();
});

it('can be constructed with all properties', function () {
    $result = new GlobalSearchResult(
        title: 'Product #1',
        url: '/admin/products/1/edit',
        details: ['SKU' => 'ABC-123', 'Price' => '$9.99'],
        panelId: 'admin',
    );

    expect($result->title)->toBe('Product #1')
        ->and($result->url)->toBe('/admin/products/1/edit')
        ->and($result->details)->toBe(['SKU' => 'ABC-123', 'Price' => '$9.99'])
        ->and($result->panelId)->toBe('admin');
});

it('has readonly properties', function () {
    $result = new GlobalSearchResult(title: 'Test', url: '/test');

    $ref = new ReflectionClass($result);

    expect($ref->getProperty('title')->isReadOnly())->toBeTrue()
        ->and($ref->getProperty('url')->isReadOnly())->toBeTrue()
        ->and($ref->getProperty('details')->isReadOnly())->toBeTrue()
        ->and($ref->getProperty('panelId')->isReadOnly())->toBeTrue();
});

it('preserves details array order', function () {
    $details = ['Category' => 'Electronics', 'Brand' => 'Acme'];
    $result = new GlobalSearchResult(title: 'Test', url: '/test', details: $details);

    expect(array_keys($result->details))->toBe(['Category', 'Brand']);
});
