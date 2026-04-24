<?php

use Primix\Support\Icons\Sets\PrimixIconSet;

it('renders trend up svg with provided classes', function () {
    $set = new PrimixIconSet();

    $html = $set->render('primix-trend-up', 'h-4 w-4');

    expect($html)
        ->toContain('<svg')
        ->toContain('class="h-4 w-4"')
        ->toContain('stroke="currentColor"');
});

it('renders trend down svg with named size classes', function () {
    $set = new PrimixIconSet();

    $html = $set->render('primix-trend-down', null, 'sm');

    expect($html)
        ->toContain('class="w-4 h-4"')
        ->toContain('stroke="currentColor"');
});
