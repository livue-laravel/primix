<?php

use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Wizard;
use Primix\Forms\Components\Layouts\Wizard\Step;

it('can be created with label', function () {
    $wizard = Wizard::make('Registration');

    expect($wizard->getLabel())->toBe('Registration');
});

it('can add steps', function () {
    $wizard = Wizard::make()->steps([
        Step::make('Account'),
        Step::make('Profile'),
    ]);

    expect($wizard->getSteps())->toHaveCount(2);
});

it('can set start step', function () {
    $wizard = Wizard::make()->startStep(2);

    expect($wizard->getStartStep())->toBe(2);
});

it('has null start step by default', function () {
    $wizard = Wizard::make();

    expect($wizard->getStartStep())->toBeNull();
});

it('is linear by default', function () {
    $wizard = Wizard::make();

    expect($wizard->isLinear())->toBeTrue();
});

it('can disable linear mode', function () {
    $wizard = Wizard::make()->linear(false);

    expect($wizard->isLinear())->toBeFalse();
});

it('can set submit action', function () {
    $wizard = Wizard::make()->submitAction('register');

    expect($wizard->getSubmitAction())->toBe('register');
});

it('has null submit action by default', function () {
    $wizard = Wizard::make();

    expect($wizard->getSubmitAction())->toBeNull();
});

it('can set submit label', function () {
    $wizard = Wizard::make()->submitLabel('Register');

    expect($wizard->getSubmitLabel())->toBe('Register');
});

it('has default submit label', function () {
    $wizard = Wizard::make();

    expect($wizard->getSubmitLabel())->toBe('Submit');
});

it('returns correct view', function () {
    $wizard = Wizard::make();

    expect($wizard->getView())->toBe('primix-forms::components.layouts.wizard.wizard');
});

it('uses steps as vue prop key for children', function () {
    $wizard = Wizard::make()->steps([
        Step::make('Account'),
    ]);

    $props = $wizard->toVueProps();

    expect($props)->toHaveKey('steps');
    expect($props)->not->toHaveKey('components');
    expect($props['steps'])->toHaveCount(1);
});

it('returns vue props', function () {
    $wizard = Wizard::make()
        ->startStep(1)
        ->linear(false)
        ->submitAction('register')
        ->submitLabel('Register');

    $props = $wizard->toVueProps();

    expect($props)
        ->toHaveKey('startStep', 1)
        ->toHaveKey('linear', false)
        ->toHaveKey('submitAction', 'register')
        ->toHaveKey('submitLabel', 'Register');
});

// Step tests

it('creates step with label and auto-generated name', function () {
    $step = Step::make('Personal Info');

    expect($step->getLabel())->toBe('Personal Info');
    expect($step->getName())->toBe('personal-info');
});

it('step can set badge', function () {
    $step = Step::make('Account')->badge('1');

    expect($step->getBadge())->toBe('1');
});

it('step has null badge by default', function () {
    $step = Step::make('Account');

    expect($step->getBadge())->toBeNull();
});

it('step can set icon', function () {
    $step = Step::make('Account')->icon('heroicon-o-user');

    expect($step->getIcon())->toBe('heroicon-o-user');
});

it('step can set description', function () {
    $step = Step::make('Account')->description('Create your account');

    expect($step->getDescription())->toBe('Create your account');
});

it('step can have schema', function () {
    $step = Step::make('Account')->schema([
        TextInput::make('email'),
        TextInput::make('password'),
    ]);

    expect($step->getSchema())->toHaveCount(2);
});

it('step returns correct view', function () {
    $step = Step::make('Account');

    expect($step->getView())->toBe('primix-forms::components.layouts.wizard.step');
});

it('step returns vue props', function () {
    $step = Step::make('Account')
        ->badge('1')
        ->icon('heroicon-o-user')
        ->description('Create account')
        ->schema([TextInput::make('email')]);

    $props = $step->toVueProps();

    expect($props)
        ->toHaveKey('label', 'Account')
        ->toHaveKey('name', 'account')
        ->toHaveKey('badge', '1')
        ->toHaveKey('icon', 'heroicon-o-user')
        ->toHaveKey('description', 'Create account')
        ->toHaveKey('components');

    expect($props['components'])->toHaveCount(1);
});
