<?php

use Primix\Resources\Actions\ViewAction;

// ============================================================
// Defaults
// ============================================================

it('has view as default name', function () {
    expect(ViewAction::getDefaultName())->toBe('view');
});

it('has correct default label', function () {
    expect(ViewAction::make()->getLabel())->toBe('View');
});

it('has correct default icon', function () {
    expect(ViewAction::make()->getIcon())->toBe('heroicon-o-eye');
});

it('has correct default color', function () {
    expect(ViewAction::make()->getColor())->toBe('gray');
});

// ============================================================
// URL
// ============================================================

it('getUrl returns null without resource', function () {
    expect(ViewAction::make()->getUrl())->toBeNull();
});

// ============================================================
// Visibility
// ============================================================

it('is not hidden by default without resource', function () {
    expect(ViewAction::make()->isHidden())->toBeFalse();
});

it('is an instance of base Action', function () {
    expect(ViewAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('can override label', function () {
    expect(ViewAction::make()->label('Details')->getLabel())->toBe('Details');
});
