<?php

use Primix\Resources\Actions\ForceDeleteBulkAction;

it('can be created with make', function () {
    $action = ForceDeleteBulkAction::make();

    expect($action)->toBeInstanceOf(ForceDeleteBulkAction::class);
});

it('has default name', function () {
    $action = ForceDeleteBulkAction::make();

    expect($action->getName())->toBe('force-delete');
});

it('has default label', function () {
    $action = ForceDeleteBulkAction::make();

    expect($action->getLabel())->toBe('Force delete selected');
});

it('has default icon', function () {
    $action = ForceDeleteBulkAction::make();

    expect($action->getIcon())->toBe('heroicon-o-trash');
});

it('has default color', function () {
    $action = ForceDeleteBulkAction::make();

    expect($action->getColor())->toBe('danger');
});

it('requires confirmation by default', function () {
    $action = ForceDeleteBulkAction::make();

    expect($action->doesRequireConfirmation())->toBeTrue();
});

it('calls custom action when set', function () {
    $called = false;

    $action = ForceDeleteBulkAction::make()->action(function () use (&$called) {
        $called = true;
    });
    $action->records(collect([]));
    $action->call();

    expect($called)->toBeTrue();
});
