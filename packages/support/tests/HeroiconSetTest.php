<?php

use Primix\Support\Icons\Sets\HeroiconSet;

it('applies a default heroicon size when no size class is provided', function () {
    $set = new HeroiconSet();

    $html = $set->render('heroicon-o-check-circle', 'mr-1');

    expect($html)
        ->toContain('w-5 h-5')
        ->toContain('mr-1');
});

it('does not force default size when explicit dimension classes are present', function () {
    $set = new HeroiconSet();

    $html = $set->render('heroicon-o-check-circle', 'w-4 h-4 mr-1');

    expect($html)
        ->toContain('w-4 h-4')
        ->not->toContain('w-5 h-5');
});

it('uses the requested named size when provided', function () {
    $set = new HeroiconSet();

    $html = $set->render('heroicon-o-check-circle', 'mr-1', 'xl');

    expect($html)
        ->toContain('w-8 h-8')
        ->toContain('mr-1');
});
