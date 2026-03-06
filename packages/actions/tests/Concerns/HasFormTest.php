<?php

use Primix\Actions\Action;

// Tests for HasForm trait via Action class

it('has empty form schema by default', function () {
    $action = Action::make('edit');

    expect($action->getFormSchema())->toBe([]);
});

it('has no form by default', function () {
    $action = Action::make('edit');

    expect($action->hasForm())->toBeFalse();
});

it('can set form schema with array', function () {
    $schema = ['field1', 'field2'];
    $action = Action::make('edit')->form($schema);

    expect($action->getFormSchema())->toBe($schema);
});

it('has form when schema is set', function () {
    $action = Action::make('edit')->form(['field1']);

    expect($action->hasForm())->toBeTrue();
});

it('can set form schema with closure', function () {
    $action = Action::make('edit')->form(fn () => ['field1', 'field2']);

    expect($action->getFormSchema())->toBe(['field1', 'field2']);
});

it('has empty form data by default', function () {
    $action = Action::make('edit');

    expect($action->getFormData())->toBe([]);
});

it('can fill form data', function () {
    $data = ['name' => 'John', 'email' => 'john@example.com'];
    $action = Action::make('edit')->fillForm($data);

    expect($action->getFormData())->toBe($data);
});
