<?php

use Primix\Resources\Actions\CreateAction;

// ============================================================
// Defaults
// ============================================================

it('has create as default name', function () {
    expect(CreateAction::getDefaultName())->toBe('create');
});

it('has correct default label', function () {
    $action = CreateAction::make();

    expect($action->getLabel())->toBe('New');
});

it('has correct default icon', function () {
    $action = CreateAction::make();

    expect($action->getIcon())->toBe('heroicon-o-plus');
});

it('has correct default color', function () {
    $action = CreateAction::make();

    expect($action->getColor())->toBe('primary');
});

// ============================================================
// URL
// ============================================================

it('getUrl returns null without resource', function () {
    $action = CreateAction::make();

    expect($action->getUrl())->toBeNull();
});

// ============================================================
// Visibility
// ============================================================

it('is not hidden by default without resource', function () {
    $action = CreateAction::make();

    expect($action->isHidden())->toBeFalse();
});

it('is an instance of Action', function () {
    expect(CreateAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('can override label', function () {
    $action = CreateAction::make()->label('Add');

    expect($action->getLabel())->toBe('Add');
});
