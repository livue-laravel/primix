<?php

use Primix\Actions\Action;

// Tests for CanRequireConfirmation trait via Action class

it('does not require confirmation by default', function () {
    $action = Action::make('delete');

    expect($action->doesRequireConfirmation())->toBeFalse();
});

it('can require confirmation', function () {
    $action = Action::make('delete')->requiresConfirmation();

    expect($action->doesRequireConfirmation())->toBeTrue();
});

it('has null confirmation heading by default', function () {
    $action = Action::make('delete');

    expect($action->getConfirmationHeading())->toBeNull();
});

it('can set confirmation heading', function () {
    $action = Action::make('delete')->confirmationHeading('Are you sure?');

    expect($action->getConfirmationHeading())->toBe('Are you sure?');
});

it('has null confirmation description by default', function () {
    $action = Action::make('delete');

    expect($action->getConfirmationDescription())->toBeNull();
});

it('can set confirmation description', function () {
    $action = Action::make('delete')
        ->confirmationDescription('This action cannot be undone.');

    expect($action->getConfirmationDescription())->toBe('This action cannot be undone.');
});

it('has default confirmation button label of Confirm', function () {
    $action = Action::make('delete');

    expect($action->getConfirmationButtonLabel())->toBe('Confirm');
});

it('can set confirmation button label', function () {
    $action = Action::make('delete')->confirmationButtonLabel('Yes, delete');

    expect($action->getConfirmationButtonLabel())->toBe('Yes, delete');
});

it('has default cancel button label of Cancel', function () {
    $action = Action::make('delete');

    expect($action->getCancelButtonLabel())->toBe('Cancel');
});

it('can set cancel button label', function () {
    $action = Action::make('delete')->cancelButtonLabel('No, keep it');

    expect($action->getCancelButtonLabel())->toBe('No, keep it');
});
