<?php

use Primix\Resources\Actions\CloneAction;
use Primix\Resources\Actions\DeleteAction;
use Primix\Resources\Actions\DeleteBulkAction;
use Primix\Resources\Actions\ForceDeleteAction;
use Primix\Resources\Actions\ForceDeleteBulkAction;
use Primix\Resources\Actions\RestoreAction;
use Primix\Resources\Actions\RestoreBulkAction;

// ============================================================
// DeleteAction
// ============================================================

it('has delete as default name', function () {
    expect(DeleteAction::getDefaultName())->toBe('delete');
});

it('DeleteAction has correct default label', function () {
    expect(DeleteAction::make()->getLabel())->toBe('Delete');
});

it('DeleteAction has correct default icon', function () {
    expect(DeleteAction::make()->getIcon())->toBe('heroicon-o-trash');
});

it('DeleteAction has correct default color', function () {
    expect(DeleteAction::make()->getColor())->toBe('danger');
});

it('DeleteAction requires confirmation by default', function () {
    expect(DeleteAction::make()->doesRequireConfirmation())->toBeTrue();
});

it('DeleteAction is an instance of Action', function () {
    expect(DeleteAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('DeleteAction is not hidden by default without resource', function () {
    expect(DeleteAction::make()->isHidden())->toBeFalse();
});

it('DeleteAction can override label', function () {
    expect(DeleteAction::make()->label('Remove')->getLabel())->toBe('Remove');
});

// ============================================================
// DeleteBulkAction
// ============================================================

it('DeleteBulkAction has delete as default name', function () {
    expect(DeleteBulkAction::getDefaultName())->toBe('delete');
});

it('DeleteBulkAction has correct default label', function () {
    expect(DeleteBulkAction::make()->getLabel())->toBe('Delete selected');
});

it('DeleteBulkAction has correct default icon', function () {
    expect(DeleteBulkAction::make()->getIcon())->toBe('heroicon-o-trash');
});

it('DeleteBulkAction has correct default color', function () {
    expect(DeleteBulkAction::make()->getColor())->toBe('danger');
});

it('DeleteBulkAction requires confirmation by default', function () {
    expect(DeleteBulkAction::make()->doesRequireConfirmation())->toBeTrue();
});

it('DeleteBulkAction is an instance of BulkAction', function () {
    expect(DeleteBulkAction::make())->toBeInstanceOf(\Primix\Actions\BulkAction::class);
});

// ============================================================
// RestoreAction
// ============================================================

it('RestoreAction has restore as default name', function () {
    expect(RestoreAction::getDefaultName())->toBe('restore');
});

it('RestoreAction has correct default label', function () {
    expect(RestoreAction::make()->getLabel())->toBe('Restore');
});

it('RestoreAction has correct default icon', function () {
    expect(RestoreAction::make()->getIcon())->toBe('heroicon-o-arrow-uturn-left');
});

it('RestoreAction has correct default color', function () {
    expect(RestoreAction::make()->getColor())->toBe('success');
});

it('RestoreAction requires confirmation by default', function () {
    expect(RestoreAction::make()->doesRequireConfirmation())->toBeTrue();
});

it('RestoreAction is an instance of Action', function () {
    expect(RestoreAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('RestoreAction is not hidden by default without resource', function () {
    expect(RestoreAction::make()->isHidden())->toBeFalse();
});

// ============================================================
// RestoreBulkAction
// ============================================================

it('RestoreBulkAction has restore as default name', function () {
    expect(RestoreBulkAction::getDefaultName())->toBe('restore');
});

it('RestoreBulkAction has correct default label', function () {
    expect(RestoreBulkAction::make()->getLabel())->toBe('Restore selected');
});

it('RestoreBulkAction has correct default icon', function () {
    expect(RestoreBulkAction::make()->getIcon())->toBe('heroicon-o-arrow-uturn-left');
});

it('RestoreBulkAction has correct default color', function () {
    expect(RestoreBulkAction::make()->getColor())->toBe('success');
});

it('RestoreBulkAction requires confirmation by default', function () {
    expect(RestoreBulkAction::make()->doesRequireConfirmation())->toBeTrue();
});

it('RestoreBulkAction is an instance of BulkAction', function () {
    expect(RestoreBulkAction::make())->toBeInstanceOf(\Primix\Actions\BulkAction::class);
});

// ============================================================
// ForceDeleteAction
// ============================================================

it('ForceDeleteAction has force-delete as default name', function () {
    expect(ForceDeleteAction::getDefaultName())->toBe('force-delete');
});

it('ForceDeleteAction has correct default label', function () {
    expect(ForceDeleteAction::make()->getLabel())->toBe('Force delete');
});

it('ForceDeleteAction has correct default icon', function () {
    expect(ForceDeleteAction::make()->getIcon())->toBe('heroicon-o-trash');
});

it('ForceDeleteAction has correct default color', function () {
    expect(ForceDeleteAction::make()->getColor())->toBe('danger');
});

it('ForceDeleteAction requires confirmation by default', function () {
    expect(ForceDeleteAction::make()->doesRequireConfirmation())->toBeTrue();
});

it('ForceDeleteAction is an instance of Action', function () {
    expect(ForceDeleteAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('ForceDeleteAction is not hidden by default without resource', function () {
    expect(ForceDeleteAction::make()->isHidden())->toBeFalse();
});

// ============================================================
// ForceDeleteBulkAction
// ============================================================

it('ForceDeleteBulkAction has force-delete as default name', function () {
    expect(ForceDeleteBulkAction::getDefaultName())->toBe('force-delete');
});

it('ForceDeleteBulkAction has correct default label', function () {
    expect(ForceDeleteBulkAction::make()->getLabel())->toBe('Force delete selected');
});

it('ForceDeleteBulkAction has correct default icon', function () {
    expect(ForceDeleteBulkAction::make()->getIcon())->toBe('heroicon-o-trash');
});

it('ForceDeleteBulkAction has correct default color', function () {
    expect(ForceDeleteBulkAction::make()->getColor())->toBe('danger');
});

it('ForceDeleteBulkAction requires confirmation by default', function () {
    expect(ForceDeleteBulkAction::make()->doesRequireConfirmation())->toBeTrue();
});

it('ForceDeleteBulkAction is an instance of BulkAction', function () {
    expect(ForceDeleteBulkAction::make())->toBeInstanceOf(\Primix\Actions\BulkAction::class);
});

// ============================================================
// CloneAction
// ============================================================

it('CloneAction has clone as default name', function () {
    expect(CloneAction::getDefaultName())->toBe('clone');
});

it('CloneAction has correct default label', function () {
    expect(CloneAction::make()->getLabel())->toBe('Clone');
});

it('CloneAction has correct default icon', function () {
    expect(CloneAction::make()->getIcon())->toBe('heroicon-o-document-duplicate');
});

it('CloneAction has correct default color', function () {
    expect(CloneAction::make()->getColor())->toBe('gray');
});

it('CloneAction is an instance of Action', function () {
    expect(CloneAction::make())->toBeInstanceOf(\Primix\Actions\Action::class);
});

it('CloneAction is not hidden by default without resource', function () {
    expect(CloneAction::make()->isHidden())->toBeFalse();
});

it('CloneAction can override label', function () {
    expect(CloneAction::make()->label('Duplicate')->getLabel())->toBe('Duplicate');
});
