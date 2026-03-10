<?php

use Primix\Pages\PageRegistration;

// ============================================================
// Construction & Getters
// ============================================================

it('can be constructed', function () {
    $reg = new PageRegistration(page: 'App\\Primix\\Pages\\Dashboard', route: '/');

    expect($reg)->toBeInstanceOf(PageRegistration::class);
});

it('returns the page class', function () {
    $reg = new PageRegistration(page: 'App\\Primix\\Resources\\PostResource\\Pages\\ListPosts', route: '/');

    expect($reg->getPage())->toBe('App\\Primix\\Resources\\PostResource\\Pages\\ListPosts');
});

it('returns the route', function () {
    $reg = new PageRegistration(page: 'App\\Primix\\Resources\\PostResource\\Pages\\EditPost', route: '/{record}/edit');

    expect($reg->getRoute())->toBe('/{record}/edit');
});

it('preserves exact values without modification', function () {
    $reg = new PageRegistration(page: 'My\\Custom\\Page', route: '/custom/{id}');

    expect($reg->getPage())->toBe('My\\Custom\\Page')
        ->and($reg->getRoute())->toBe('/custom/{id}');
});
