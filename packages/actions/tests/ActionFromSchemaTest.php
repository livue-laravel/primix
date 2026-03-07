<?php

use Primix\Actions\Action;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Resources\Actions\DeleteAction;
use Primix\Support\ComponentTypeRegistry;
use Primix\Support\SchemaBuilder;

beforeEach(function () {
    $registry = new ComponentTypeRegistry();

    $registry->registerMany('action', [
        'action' => Action::class,
        'delete-action' => DeleteAction::class,
    ]);

    $registry->registerMany('field', [
        'text-input' => TextInput::class,
    ]);

    app()->instance(ComponentTypeRegistry::class, $registry);
    app()->instance(SchemaBuilder::class, new SchemaBuilder($registry));
});

it('builds an action from schema with callback and nested form', function () {
    $called = false;

    $action = Action::fromSchema([
        'id' => 'action-test',
        'label' => 'Action Test',
        'action' => function () use (&$called): void {
            $called = true;
        },
        'form' => [
            ['type' => 'text-input', 'name' => 'title', 'required' => true],
        ],
    ]);

    expect($action)->toBeInstanceOf(Action::class);
    expect($action->getId())->toBe('action-test');
    expect($action->getLabel())->toBe('Action Test');
    expect($action->hasForm())->toBeTrue();

    $formSchema = $action->getFormSchema();

    expect($formSchema)->toHaveCount(1);
    expect($formSchema[0])->toBeInstanceOf(TextInput::class);
    expect($formSchema[0]->getName())->toBe('title');
    expect($formSchema[0]->isRequired())->toBeTrue();

    $action->call();

    expect($called)->toBeTrue();
});

it('supports named callbacks in action schema', function () {
    $called = false;

    $action = Action::fromSchema([
        'action' => '@handleAction',
    ], [
        'handleAction' => function () use (&$called): void {
            $called = true;
        },
    ]);

    $action->call();

    expect($called)->toBeTrue();
});

it('resolves specific action types from schema', function () {
    $action = Action::fromSchema([
        'type' => 'delete-action',
    ]);

    expect($action)->toBeInstanceOf(DeleteAction::class);
    expect($action->getName())->toBe('delete');
});

it('throws when action type cannot be resolved', function () {
    expect(fn () => Action::fromSchema([
        'type' => 'unknown-action',
    ]))->toThrow(\InvalidArgumentException::class);
});
