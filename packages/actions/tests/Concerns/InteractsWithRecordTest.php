<?php

use Primix\Actions\Action;

// Tests for InteractsWithRecord trait via Action class

it('has null record by default', function () {
    $action = Action::make('edit');

    expect($action->getRecord())->toBeNull();
});

it('can set record', function () {
    $record = (object) ['id' => 1, 'name' => 'Test'];
    $action = Action::make('edit')->record($record);

    expect($action->getRecord())->toBe($record);
});

it('has null record title by default', function () {
    $action = Action::make('edit');

    expect($action->getRecordTitle())->toBeNull();
});

it('can set record title', function () {
    $action = Action::make('edit')->recordTitle('Post #1');

    expect($action->getRecordTitle())->toBe('Post #1');
});

it('record title returns custom title when set', function () {
    $record = (object) ['id' => 1];
    $action = Action::make('edit')->record($record)->recordTitle('Custom Title');

    expect($action->getRecordTitle())->toBe('Custom Title');
});

it('record title returns null for non-model record without custom title', function () {
    $record = (object) ['id' => 1];
    $action = Action::make('edit')->record($record);

    expect($action->getRecordTitle())->toBeNull();
});
