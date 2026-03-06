<?php

use Primix\Resources\Actions\DeleteAction;

it('can be created with make', function () {
    $action = DeleteAction::make();

    expect($action)->toBeInstanceOf(DeleteAction::class);
});

it('has default name', function () {
    $action = DeleteAction::make();

    expect($action->getName())->toBe('delete');
});

it('has default label', function () {
    $action = DeleteAction::make();

    expect($action->getLabel())->toBe('Delete');
});

it('has default icon', function () {
    $action = DeleteAction::make();

    expect($action->getIcon())->toBe('heroicon-o-trash');
});

it('has default color', function () {
    $action = DeleteAction::make();

    expect($action->getColor())->toBe('danger');
});

it('requires confirmation by default', function () {
    $action = DeleteAction::make();

    expect($action->doesRequireConfirmation())->toBeTrue();
});

it('is not hidden without record', function () {
    $action = DeleteAction::make();

    expect($action->isHidden())->toBeFalse();
});

it('is not hidden when record does not use SoftDeletes', function () {
    $record = new class {
        public int $id = 1;
    };

    $action = DeleteAction::make()->record($record);

    expect($action->isHidden())->toBeFalse();
});

it('is not hidden when record uses SoftDeletes but is not trashed', function () {
    $record = new class {
        public int $id = 1;

        public function trashed(): bool
        {
            return false;
        }
    };

    $action = DeleteAction::make()->record($record);

    expect($action->isHidden())->toBeFalse();
});

it('is hidden when record is trashed', function () {
    $record = new class {
        public int $id = 1;

        public function trashed(): bool
        {
            return true;
        }
    };

    $action = DeleteAction::make()->record($record);

    expect($action->isHidden())->toBeTrue();
});

it('respects explicit visibility over trashed state', function () {
    $record = new class {
        public int $id = 1;

        public function trashed(): bool
        {
            return true;
        }
    };

    $action = DeleteAction::make()->visible()->record($record);

    expect($action->isHidden())->toBeFalse();
});
