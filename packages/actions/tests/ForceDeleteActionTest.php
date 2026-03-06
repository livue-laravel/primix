<?php

use Primix\Resources\Actions\ForceDeleteAction;

it('can be created with make', function () {
    $action = ForceDeleteAction::make();

    expect($action)->toBeInstanceOf(ForceDeleteAction::class);
});

it('has default name', function () {
    $action = ForceDeleteAction::make();

    expect($action->getName())->toBe('force-delete');
});

it('has default label', function () {
    $action = ForceDeleteAction::make();

    expect($action->getLabel())->toBe('Force delete');
});

it('has default icon', function () {
    $action = ForceDeleteAction::make();

    expect($action->getIcon())->toBe('heroicon-o-trash');
});

it('has default color', function () {
    $action = ForceDeleteAction::make();

    expect($action->getColor())->toBe('danger');
});

it('requires confirmation by default', function () {
    $action = ForceDeleteAction::make();

    expect($action->doesRequireConfirmation())->toBeTrue();
});

it('calls custom action when set', function () {
    $called = false;

    $action = ForceDeleteAction::make()->action(function () use (&$called) {
        $called = true;
    });
    $action->call();

    expect($called)->toBeTrue();
});

it('is not hidden without record', function () {
    $action = ForceDeleteAction::make();

    expect($action->isHidden())->toBeFalse();
});

it('is hidden when record does not use SoftDeletes', function () {
    $record = new class {
        public int $id = 1;
    };

    $action = ForceDeleteAction::make()->record($record);

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

    $action = ForceDeleteAction::make()->record($record);

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

    $action = ForceDeleteAction::make()->record($record);

    expect($action->isHidden())->toBeFalse();
});

it('respects explicit visibility', function () {
    $action = ForceDeleteAction::make()->hidden();

    expect($action->isHidden())->toBeTrue();
});
