<?php

use Primix\GlobalSearch\GlobalSearchResult;
use Primix\GlobalSearch\GlobalSearchResultGroup;

// ============================================================
// Construction
// ============================================================

it('can be constructed with required properties', function () {
    $group = new GlobalSearchResultGroup(label: 'Products');

    expect($group->label)->toBe('Products');
});

it('has null icon by default', function () {
    $group = new GlobalSearchResultGroup(label: 'Products');

    expect($group->icon)->toBeNull();
});

it('has empty results by default', function () {
    $group = new GlobalSearchResultGroup(label: 'Products');

    expect($group->results)->toBe([]);
});

it('has null panelLabel by default', function () {
    $group = new GlobalSearchResultGroup(label: 'Products');

    expect($group->panelLabel)->toBeNull();
});

it('can be constructed with all properties', function () {
    $results = [
        new GlobalSearchResult(title: 'Product 1', url: '/p/1'),
        new GlobalSearchResult(title: 'Product 2', url: '/p/2'),
    ];

    $group = new GlobalSearchResultGroup(
        label: 'Products',
        icon: 'heroicon-o-shopping-bag',
        results: $results,
        panelLabel: 'Admin',
    );

    expect($group->label)->toBe('Products')
        ->and($group->icon)->toBe('heroicon-o-shopping-bag')
        ->and($group->results)->toHaveCount(2)
        ->and($group->panelLabel)->toBe('Admin');
});

it('has readonly properties', function () {
    $group = new GlobalSearchResultGroup(label: 'Products');

    $ref = new ReflectionClass($group);

    expect($ref->getProperty('label')->isReadOnly())->toBeTrue()
        ->and($ref->getProperty('icon')->isReadOnly())->toBeTrue()
        ->and($ref->getProperty('results')->isReadOnly())->toBeTrue()
        ->and($ref->getProperty('panelLabel')->isReadOnly())->toBeTrue();
});
