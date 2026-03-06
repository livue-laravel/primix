<?php

use Primix\Resources\Actions\RestoreAction;

it('can be created with make', function () {
    $action = RestoreAction::make();

    expect($action)->toBeInstanceOf(RestoreAction::class);
});

it('has default name', function () {
    $action = RestoreAction::make();

    expect($action->getName())->toBe('restore');
});

it('has default label', function () {
    $action = RestoreAction::make();

    expect($action->getLabel())->toBe('Restore');
});

it('has default icon', function () {
    $action = RestoreAction::make();

    expect($action->getIcon())->toBe('heroicon-o-arrow-uturn-left');
});

it('has default color', function () {
    $action = RestoreAction::make();

    expect($action->getColor())->toBe('success');
});

it('requires confirmation by default', function () {
    $action = RestoreAction::make();

    expect($action->doesRequireConfirmation())->toBeTrue();
});

it('calls custom action when set', function () {
    $called = false;

    $action = RestoreAction::make()->action(function () use (&$called) {
        $called = true;
    });
    $action->call();

    expect($called)->toBeTrue();
});

it('is not hidden without record', function () {
    $action = RestoreAction::make();

    expect($action->isHidden())->toBeFalse();
});

it('is hidden when record does not use SoftDeletes', function () {
    $record = new class {
        public int $id = 1;
    };

    $action = RestoreAction::make()->record($record);

    expect($action->isHidden())->toBeTrue();
});

it('is hidden when record is not trashed', function () {
    $record = new class {
        public int $id = 1;

        public function trashed(): bool
        {
            return false;
        }
    };

    $action = RestoreAction::make()->record($record);

    expect($action->isHidden())->toBeTrue();
});

it('is visible when record is trashed', function () {
    $record = new class {
        public int $id = 1;

        public function trashed(): bool
        {
            return true;
        }
    };

    $action = RestoreAction::make()->record($record);

    expect($action->isHidden())->toBeFalse();
});

it('respects explicit visibility', function () {
    $action = RestoreAction::make()->hidden();

    expect($action->isHidden())->toBeTrue();
});
