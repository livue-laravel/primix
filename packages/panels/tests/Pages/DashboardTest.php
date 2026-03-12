<?php

use Primix\Pages\Dashboard;

// ============================================================
// Static Properties (via Reflection)
// ============================================================

it('has home icon', function () {
    $ref = new ReflectionClass(Dashboard::class);
    $prop = $ref->getProperty('navigationIcon');

    expect($prop->getDefaultValue())->toBe('heroicon-o-home');
});

it('has negative sort to appear first', function () {
    $ref = new ReflectionClass(Dashboard::class);
    $prop = $ref->getProperty('navigationSort');

    expect($prop->getDefaultValue())->toBe(-2);
});

it('has empty slug for root url', function () {
    $ref = new ReflectionClass(Dashboard::class);
    $prop = $ref->getProperty('slug');

    expect($prop->getDefaultValue())->toBe('');
});

it('has Dashboard as title', function () {
    $ref = new ReflectionClass(Dashboard::class);
    $prop = $ref->getProperty('title');

    expect($prop->getDefaultValue())->toBe('Dashboard');
});
