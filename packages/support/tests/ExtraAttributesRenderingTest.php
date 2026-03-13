<?php

use Primix\Support\Components\Component;
use Primix\Support\Components\ComponentAttributeBag;

it('normalizes extra attributes for rendering with base classes', function () {
    $component = new class extends Component {};

    $component->extraAttributes([
        'class' => 'text-sm md:text-base',
        'data-test' => 'value',
        'aria-label' => 'foo',
    ]);

    $renderable = $component->getRenderableExtraAttributes('primix-action-button');

    expect($renderable['class'])->toBe('primix-action-button text-sm md:text-base')
        ->and($renderable['attributes'])->toBeInstanceOf(ComponentAttributeBag::class)
        ->and($renderable['attributes']->get('class'))->toBeNull()
        ->and($renderable['attributes']->get('data-test'))->toBe('value')
        ->and($renderable['attributes']->get('aria-label'))->toBe('foo');
});

it('normalizes extra wrapper attributes for rendering with base classes', function () {
    $component = new class extends Component {};

    $component->extraWrapperAttributes([
        'class' => 'w-full gap-2',
        'data-section' => 'toolbar',
    ]);

    $renderable = $component->getRenderableExtraWrapperAttributes('primix-action-group');

    expect($renderable['class'])->toBe('primix-action-group w-full gap-2')
        ->and($renderable['attributes'])->toBeInstanceOf(ComponentAttributeBag::class)
        ->and($renderable['attributes']->get('class'))->toBeNull()
        ->and($renderable['attributes']->get('data-section'))->toBe('toolbar');
});

it('can remove one or more keys from component attribute bag', function () {
    $bag = new ComponentAttributeBag([
        'class' => 'foo',
        'data-test' => 'x',
        'aria-label' => 'label',
    ]);

    $withoutClass = $bag->except('class');
    $withoutMultiple = $bag->except(['class', 'aria-label']);

    expect($withoutClass->get('class'))->toBeNull()
        ->and($withoutClass->get('data-test'))->toBe('x')
        ->and($withoutClass->get('aria-label'))->toBe('label')
        ->and($withoutMultiple->get('class'))->toBeNull()
        ->and($withoutMultiple->get('aria-label'))->toBeNull()
        ->and($withoutMultiple->get('data-test'))->toBe('x');
});
