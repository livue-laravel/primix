<?php

use Primix\Resources\Actions\RestoreBulkAction;

it('can be created with make', function () {
    $action = RestoreBulkAction::make();

    expect($action)->toBeInstanceOf(RestoreBulkAction::class);
});

it('has default name', function () {
    $action = RestoreBulkAction::make();

    expect($action->getName())->toBe('restore');
});

it('has default label', function () {
    $action = RestoreBulkAction::make();

    expect($action->getLabel())->toBe('Restore selected');
});

it('has default icon', function () {
    $action = RestoreBulkAction::make();

    expect($action->getIcon())->toBe('heroicon-o-arrow-uturn-left');
});

it('has default color', function () {
    $action = RestoreBulkAction::make();

    expect($action->getColor())->toBe('success');
});

it('requires confirmation by default', function () {
    $action = RestoreBulkAction::make();

    expect($action->doesRequireConfirmation())->toBeTrue();
});

it('calls custom action when set', function () {
    $called = false;

    $action = RestoreBulkAction::make()->action(function () use (&$called) {
        $called = true;
    });
    $action->records(collect([]));
    $action->call();

    expect($called)->toBeTrue();
});
