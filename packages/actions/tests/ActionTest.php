<?php

use Primix\Actions\Action;
use Primix\Support\Enums\TooltipPosition;

it('can be created with make', function () {
    $action = Action::make('edit');

    expect($action)->toBeInstanceOf(Action::class);
});

it('sets name via constructor', function () {
    $action = Action::make('edit');

    expect($action->getName())->toBe('edit');
});

it('auto-generates label from name', function () {
    $action = Action::make('create_post');

    expect($action->getLabel())->toBe('Create Post');
});

it('can set custom label', function () {
    $action = Action::make('edit')->label('Edit Record');

    expect($action->getLabel())->toBe('Edit Record');
});

it('throws when name is blank', function () {
    $action = Action::make(null);

    $action->getName();
})->throws(\Exception::class);

it('is not disabled by default', function () {
    $action = Action::make('edit');

    expect($action->isDisabled())->toBeFalse();
});

it('can be disabled', function () {
    $action = Action::make('edit')->disabled();

    expect($action->isDisabled())->toBeTrue();
});

it('is enabled when not disabled', function () {
    $action = Action::make('edit');

    expect($action->isEnabled())->toBeTrue();
});

it('is not hidden by default', function () {
    $action = Action::make('edit');

    expect($action->isHidden())->toBeFalse();
});

it('can be hidden', function () {
    $action = Action::make('edit')->hidden();

    expect($action->isHidden())->toBeTrue();
});

it('is visible when not hidden', function () {
    $action = Action::make('edit');

    expect($action->isVisible())->toBeTrue();
});

it('can set action callback', function () {
    $callback = fn () => 'executed';
    $action = Action::make('edit')->action($callback);

    expect($action->getAction())->toBe($callback);
});

it('can call action with data', function () {
    $action = Action::make('save')->action(function (array $data) {
        return $data['name'];
    });

    $result = $action->call(['name' => 'John']);

    expect($result)->toBe('John');
});

it('returns null when calling without action', function () {
    $action = Action::make('edit');

    expect($action->call())->toBeNull();
});

it('has null url by default', function () {
    $action = Action::make('edit');

    expect($action->getUrl())->toBeNull();
});

it('can set url', function () {
    $action = Action::make('view')->url('/posts/1');

    expect($action->getUrl())->toBe('/posts/1');
});

it('can set url with closure', function () {
    $action = Action::make('view')->url(fn () => '/posts/1');

    expect($action->getUrl())->toBe('/posts/1');
});

it('does not open url in new tab by default', function () {
    $action = Action::make('view')->url('/posts/1');

    expect($action->shouldOpenUrlInNewTab())->toBeFalse();
});

it('can set open url in new tab', function () {
    $action = Action::make('view')->url('/posts/1')->openUrlInNewTab();

    expect($action->shouldOpenUrlInNewTab())->toBeTrue();
});

it('is not icon button by default', function () {
    $action = Action::make('edit');

    expect($action->isIconButton())->toBeFalse();
});

it('is not link by default', function () {
    $action = Action::make('edit');

    expect($action->isLink())->toBeFalse();
});

it('can be link', function () {
    $action = Action::make('edit')->link();

    expect($action->isLink())->toBeTrue();
});

it('link is exposed in vue props', function () {
    $props = Action::make('edit')->link()->toVueProps();

    expect($props)->toHaveKey('isLink', true);
});

it('can be icon button', function () {
    $action = Action::make('edit')->iconButton();

    expect($action->isIconButton())->toBeTrue();
});

it('icon button can be disabled', function () {
    $action = Action::make('edit')->iconButton()->iconButton(false);

    expect($action->isIconButton())->toBeFalse();
});

it('is not tooltip by default', function () {
    $action = Action::make('edit');

    expect($action->hasTooltip())->toBeFalse();
});

it('can enable tooltip', function () {
    $action = Action::make('edit')->tooltip();

    expect($action->hasTooltip())->toBeTrue();
});

it('can disable tooltip', function () {
    $action = Action::make('edit')->tooltip()->tooltip(false);

    expect($action->hasTooltip())->toBeFalse();
});

it('can set tooltip position', function () {
    $action = Action::make('edit')->tooltip(true, TooltipPosition::Left);

    expect($action->getTooltipPosition())->toBe(TooltipPosition::Left);
});

it('icon button enables tooltip by default', function () {
    $action = Action::make('edit')->iconButton();

    expect($action->hasTooltip())->toBeTrue();
});

it('icon button tooltip can be disabled', function () {
    $action = Action::make('edit')->iconButton(true, false);

    expect($action->hasTooltip())->toBeFalse();
});

it('icon button can set tooltip position', function () {
    $action = Action::make('edit')->iconButton(true, true, TooltipPosition::Left);

    expect($action->getTooltipPosition())->toBe(TooltipPosition::Left);
});

it('url method can set new tab flag', function () {
    $action = Action::make('view')->url('/posts/1', shouldOpenInNewTab: true);

    expect($action->shouldOpenUrlInNewTab())->toBeTrue();
});

it('has null keyboard shortcut by default', function () {
    $action = Action::make('save');

    expect($action->getKeyboardShortcut())->toBeNull();
});

it('can set keyboard shortcut', function () {
    $action = Action::make('save')->keyboardShortcut('ctrl+s');

    expect($action->getKeyboardShortcut())->toBe('ctrl+s');
});

it('is not outlined by default', function () {
    $action = Action::make('edit');

    expect($action->isOutlined())->toBeFalse();
});

it('can be outlined', function () {
    $action = Action::make('edit')->outlined();

    expect($action->isOutlined())->toBeTrue();
});

it('is not submit by default', function () {
    $action = Action::make('save');

    expect($action->isSubmit())->toBeFalse();
});

it('can be submit', function () {
    $action = Action::make('save')->submit();

    expect($action->isSubmit())->toBeTrue();
});

it('has null js action by default', function () {
    $action = Action::make('edit');

    expect($action->getJsAction())->toBeNull();
});

it('can set js action', function () {
    $action = Action::make('print')->jsAction('window.print()');

    expect($action->getJsAction())->toBe('window.print()');
});

it('has null icon by default', function () {
    $action = Action::make('edit');

    expect($action->getIcon())->toBeNull();
});

it('can set icon', function () {
    $action = Action::make('edit')->icon('pi pi-pencil');

    expect($action->getIcon())->toBe('pi pi-pencil');
});

it('has null color by default', function () {
    $action = Action::make('edit');

    expect($action->getColor())->toBeNull();
});

it('can set color', function () {
    $action = Action::make('delete')->color('danger');

    expect($action->getColor())->toBe('danger');
});

it('has null size by default', function () {
    $action = Action::make('edit');

    expect($action->getSize())->toBeNull();
});

it('can set size', function () {
    $action = Action::make('edit')->size('sm');

    expect($action->getSize())->toBe('sm');
});

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

it('returns correct view', function () {
    $action = Action::make('edit');

    expect($action->getView())->toBe('primix-actions::action');
});

it('url action template applies spa passthrough to button root link', function () {
    $template = file_get_contents(dirname(__DIR__) . '/resources/views/action.blade.php');

    expect($template)
        ->toContain("@if(!\$openUrlInNewTab && (\$spa ?? false)) :pt=\"{ root: { 'data-livue-navigate': 'true' } }\" @endif");
});

it('action template supports icon-only buttons with aria-label', function () {
    $template = file_get_contents(dirname(__DIR__) . '/resources/views/action.blade.php');

    expect($template)
        ->toContain('$isIconButton')
        ->toContain('$isLink')
        ->toContain('@if($isLink) text @endif')
        ->toContain('$extraAttributes')
        ->toContain('{!! $extraAttributes !!}')
        ->toContain('@if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif')
        ->toContain('$hasTooltip')
        ->toContain('$tooltipPosition')
        ->toContain("v-tooltip.top=\"'{{ addslashes(\$tooltipLabel) }}'\"")
        ->toContain("v-tooltip.right=\"'{{ addslashes(\$tooltipLabel) }}'\"")
        ->toContain("v-tooltip.bottom=\"'{{ addslashes(\$tooltipLabel) }}'\"")
        ->toContain("v-tooltip.left=\"'{{ addslashes(\$tooltipLabel) }}'\"");
});

it('returns complete vue props', function () {
    $action = Action::make('delete')
        ->label('Delete')
        ->icon('pi pi-trash')
        ->color('danger')
        ->size('sm')
        ->outlined()
        ->iconButton(true, false, TooltipPosition::Bottom)
        ->requiresConfirmation();

    $props = $action->toVueProps();

    expect($props)
        ->toHaveKey('name', 'delete')
        ->toHaveKey('label', 'Delete')
        ->toHaveKey('icon', 'pi pi-trash')
        ->toHaveKey('color', 'danger')
        ->toHaveKey('size', 'sm')
        ->toHaveKey('outlined', true)
        ->toHaveKey('isLink', false)
        ->toHaveKey('isIconButton', true)
        ->toHaveKey('hasTooltip', false)
        ->toHaveKey('tooltipPosition', 'bottom')
        ->toHaveKey('disabled', false)
        ->toHaveKey('requiresConfirmation', true)
        ->toHaveKey('isModal', false)
        ->toHaveKey('hasForm', false)
        ->toHaveKey('isSubmit', false);
});

it('vue props defaults color to primary and size to md', function () {
    $action = Action::make('edit');

    $props = $action->toVueProps();

    expect($props)
        ->toHaveKey('color', 'primary')
        ->toHaveKey('size', 'md')
        ->toHaveKey('isLink', false);
});

it('can use fluent chaining', function () {
    $action = Action::make('save')
        ->label('Save')
        ->icon('pi pi-save')
        ->color('success')
        ->size('lg')
        ->url('/save')
        ->keyboardShortcut('ctrl+s');

    expect($action->getName())->toBe('save');
    expect($action->getLabel())->toBe('Save');
    expect($action->getIcon())->toBe('pi pi-save');
    expect($action->getColor())->toBe('success');
    expect($action->getSize())->toBe('lg');
    expect($action->getUrl())->toBe('/save');
    expect($action->getKeyboardShortcut())->toBe('ctrl+s');
});

it('is not popover by default', function () {
    $action = Action::make('test');

    expect($action->isPopover())->toBeFalse();
});

it('can be popover', function () {
    $action = Action::make('test')->popover();

    expect($action->isPopover())->toBeTrue();
});

it('popover can be disabled', function () {
    $action = Action::make('test')->popover()->popover(false);

    expect($action->isPopover())->toBeFalse();
});
