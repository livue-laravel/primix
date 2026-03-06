<?php

use Primix\Resources\Actions\EditAction;

// ============================================================
// Defaults
// ============================================================

it('has edit as default name', function () {
    expect(EditAction::getDefaultName())->toBe('edit');
});

it('has correct default label', function () {
    expect(EditAction::make()->getLabel())->toBe('Edit');
});

it('has correct default icon', function () {
    expect(EditAction::make()->getIcon())->toBe('heroicon-o-pencil-square');
});

it('has correct default color', function () {
    expect(EditAction::make()->getColor())->toBe('primary');
});

// ============================================================
// URL
// ============================================================

it('getUrl returns null without resource', function () {
    expect(EditAction::make()->getUrl())->toBeNull();
});

// ============================================================
// Visibility
// ============================================================

it('is not hidden by default without resource', function () {
    expect(EditAction::make()->isHidden())->toBeFalse();
});

it('is an instance of Action', function () {
    expect(EditAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('can override label', function () {
    expect(EditAction::make()->label('Modify')->getLabel())->toBe('Modify');
});
