<?php

use Primix\Actions\Action;

function renderActionView(Action $action): string
{
    $vueProps = $action->toVueProps();
    $vueProps['component'] = $action;

    return view($action->getView(), $vueProps)->render();
}

it('binds isCallingAction loading on a simple action button', function () {
    $action = Action::make('refresh')->action(fn () => null);

    $html = renderActionView($action);

    expect($html)->toContain(":loading=\"livue.isCallingAction('refresh')\"");
    expect($html)->toContain("livue.runAction('refresh', 'callAction')");
});

it('binds isCallingAction loading on a confirmation action', function () {
    $action = Action::make('delete')
        ->requiresConfirmation()
        ->action(fn () => null);

    $html = renderActionView($action);

    expect($html)->toContain(":loading=\"livue.isCallingAction('delete')\"");
    expect($html)->toContain("livue.runActionWithConfirm('delete', 'callAction',");
});

it('binds isSubmittingForm loading on a submit button', function () {
    $action = Action::make('save')->submit();

    $html = renderActionView($action);

    expect($html)->toContain(':loading="livue.isSubmittingForm()"');
    expect($html)->toContain('type="submit"');
});

it('does not bind loading on a url link action', function () {
    $action = Action::make('view')->url('https://example.com');

    $html = renderActionView($action);

    expect($html)->not->toContain(':loading=');
});

it('does not bind loading on a jsAction button', function () {
    $action = Action::make('print')->jsAction('window.print()');

    $html = renderActionView($action);

    expect($html)->not->toContain(':loading=');
});

it('does not bind loading on a modal opener', function () {
    $action = Action::make('edit')->modal();

    $html = renderActionView($action);

    expect($html)->not->toContain(':loading=');
});

it('passes recordKey through runAction params', function () {
    $action = Action::make('archive')->action(fn () => null);

    $vueProps = $action->toVueProps();
    $vueProps['component'] = $action;
    $vueProps['recordKey'] = 42;

    $html = view($action->getView(), $vueProps)->render();

    expect($html)->toContain("livue.runAction('archive', 'callAction'")
        ->and($html)->toContain('recordKey: &#039;42&#039;');
});
