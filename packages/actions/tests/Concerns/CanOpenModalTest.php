<?php

use Primix\Actions\Action;
use Primix\Support\Enums\SlideOverPosition;

// Tests for CanOpenModal trait via Action class

it('is not modal by default', function () {
    $action = Action::make('edit');

    expect($action->isModal())->toBeFalse();
});

it('can enable modal', function () {
    $action = Action::make('edit')->modal();

    expect($action->isModal())->toBeTrue();
});

it('modal heading defaults to label', function () {
    $action = Action::make('create_post')->modal();

    expect($action->getModalHeading())->toBe('Create Post');
});

it('can set modal heading', function () {
    $action = Action::make('edit')->modal()->modalHeading('Edit Record');

    expect($action->getModalHeading())->toBe('Edit Record');
});

it('has null modal description by default', function () {
    $action = Action::make('edit');

    expect($action->getModalDescription())->toBeNull();
});

it('can set modal description', function () {
    $action = Action::make('edit')->modalDescription('Fill in the form below');

    expect($action->getModalDescription())->toBe('Fill in the form below');
});

it('has default modal width of md', function () {
    $action = Action::make('edit');

    expect($action->getModalWidth())->toBe('md');
});

it('can set modal width', function () {
    $action = Action::make('edit')->modalWidth('lg');

    expect($action->getModalWidth())->toBe('lg');
});

it('has default modal submit action label of Submit', function () {
    $action = Action::make('edit');

    expect($action->getModalSubmitActionLabel())->toBe('Submit');
});

it('can set modal submit action label', function () {
    $action = Action::make('edit')->modalSubmitActionLabel('Save Changes');

    expect($action->getModalSubmitActionLabel())->toBe('Save Changes');
});

it('has default modal cancel action label of Cancel', function () {
    $action = Action::make('edit');

    expect($action->getModalCancelActionLabel())->toBe('Cancel');
});

it('can set modal cancel action label', function () {
    $action = Action::make('edit')->modalCancelActionLabel('Dismiss');

    expect($action->getModalCancelActionLabel())->toBe('Dismiss');
});

it('closes modal on click away by default', function () {
    $action = Action::make('edit');

    expect($action->shouldCloseModalOnClickAway())->toBeTrue();
});

it('can disable close on click away', function () {
    $action = Action::make('edit')->closeModalOnClickAway(false);

    expect($action->shouldCloseModalOnClickAway())->toBeFalse();
});

it('closes modal on escape by default', function () {
    $action = Action::make('edit');

    expect($action->shouldCloseModalOnEscape())->toBeTrue();
});

it('can disable close on escape', function () {
    $action = Action::make('edit')->closeModalOnEscape(false);

    expect($action->shouldCloseModalOnEscape())->toBeFalse();
});

it('has default modal position of center', function () {
    $action = Action::make('edit');

    expect($action->getModalPosition())->toBe('center');
});

it('can set modal position', function () {
    $action = Action::make('edit')->modalPosition('top');

    expect($action->getModalPosition())->toBe('top');
});

it('blocks scroll by default', function () {
    $action = Action::make('edit');

    expect($action->shouldModalBlockScroll())->toBeTrue();
});

it('can disable block scroll', function () {
    $action = Action::make('edit')->modalBlockScroll(false);

    expect($action->shouldModalBlockScroll())->toBeFalse();
});

it('is not draggable by default', function () {
    $action = Action::make('edit');

    expect($action->isModalDraggable())->toBeFalse();
});

it('can enable draggable', function () {
    $action = Action::make('edit')->modalDraggable();

    expect($action->isModalDraggable())->toBeTrue();
});

it('is not maximizable by default', function () {
    $action = Action::make('edit');

    expect($action->isModalMaximizable())->toBeFalse();
});

it('can enable maximizable', function () {
    $action = Action::make('edit')->modalMaximizable();

    expect($action->isModalMaximizable())->toBeTrue();
});

it('has empty pass through by default', function () {
    $action = Action::make('edit');

    expect($action->getModalPassThrough())->toBe([]);
});

it('can set modal pass through', function () {
    $pt = ['root' => ['class' => 'custom-modal']];
    $action = Action::make('edit')->modalPt($pt);

    expect($action->getModalPassThrough())->toBe($pt);
});

it('is not slide over by default', function () {
    $action = Action::make('edit');

    expect($action->isSlideOver())->toBeFalse();
});

it('can enable slide over', function () {
    $action = Action::make('edit')->slideOver();

    expect($action->isSlideOver())->toBeTrue();
});

it('slide over defaults to right position', function () {
    $action = Action::make('edit')->slideOver();

    expect($action->getSlideOverPosition())->toBe(SlideOverPosition::Right);
});

it('can set slide over position', function () {
    $action = Action::make('edit')->slideOver(position: SlideOverPosition::Left);

    expect($action->getSlideOverPosition())->toBe(SlideOverPosition::Left);
});
