<?php

use Primix\Actions\Action;
use Primix\Forms\Form;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Support\ComponentTypeRegistry;
use Primix\Support\SchemaBuilder;

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

it('can build form schema from definitions', function () {
    $registry = new ComponentTypeRegistry();
    $registry->registerMany('field', [
        'text-input' => TextInput::class,
    ]);
    app()->instance(ComponentTypeRegistry::class, $registry);
    app()->instance(SchemaBuilder::class, new SchemaBuilder($registry));

    expect($registry->resolve('text-input', 'field'))->toBe(TextInput::class);

    $action = Action::make('edit')->formFromSchema([
        ['type' => 'text-input', 'name' => 'title', 'required' => true],
    ]);

    $schema = $action->getFormSchema();

    expect($schema)->toHaveCount(1);
    expect($schema[0])->toBeInstanceOf(TextInput::class);
    expect($schema[0]->getName())->toBe('title');
    expect($schema[0]->isRequired())->toBeTrue();
});

it('can build form schema from definitions with callbacks', function () {
    $registry = new ComponentTypeRegistry();
    $registry->registerMany('field', [
        'select' => Select::class,
    ]);
    app()->instance(ComponentTypeRegistry::class, $registry);
    app()->instance(SchemaBuilder::class, new SchemaBuilder($registry));

    expect($registry->resolve('select', 'field'))->toBe(Select::class);

    $action = Action::make('edit')->formFromSchema([
        ['type' => 'select', 'name' => 'status', 'options' => '@statusOptions'],
    ], [
        'statusOptions' => fn () => ['draft' => 'Draft', 'published' => 'Published'],
    ]);

    $schema = $action->getFormSchema();

    expect($schema)->toHaveCount(1);
    expect($schema[0])->toBeInstanceOf(Select::class);
});

it('buildForm preserves the operation set inside the form closure', function () {
    // Mirrors how ListRecords wires modal CreateAction/EditAction/ViewAction:
    // the closure receives the pre-built Form and sets the resource operation on it.
    $action = Action::make('create')->form(
        fn (Form $form) => $form->schema([TextInput::make('slug')])->operation('create')
    );

    $form = $action->buildForm();

    expect($form)->toBeInstanceOf(Form::class);
    expect($form->getOperation())->toBe('create');
    expect($form->getComponents()[0]->getOperation())->toBe('create');
});

it('buildForm leaves operation null when the closure does not set one', function () {
    $action = Action::make('edit')->form(
        fn (Form $form) => $form->schema([TextInput::make('slug')])
    );

    $form = $action->buildForm();

    expect($form->getOperation())->toBeNull();
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
