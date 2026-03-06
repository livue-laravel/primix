<?php

use Primix\Actions\Action;
use Primix\Actions\ActionGroup;

it('can be created with make', function () {
    $group = ActionGroup::make();

    expect($group)->toBeInstanceOf(ActionGroup::class);
});

it('can create with actions array', function () {
    $group = ActionGroup::make([
        Action::make('edit'),
        Action::make('delete'),
    ]);

    expect($group->getActions())->toHaveCount(2);
});

it('has empty actions by default', function () {
    $group = ActionGroup::make();

    expect($group->getActions())->toBe([]);
});

it('filters hidden actions from getActions', function () {
    $group = ActionGroup::make([
        Action::make('edit'),
        Action::make('delete')->hidden(),
    ]);

    expect($group->getActions())->toHaveCount(1);
});

it('has null label by default', function () {
    $group = ActionGroup::make();

    expect($group->getLabel())->toBeNull();
});

it('can set label', function () {
    $group = ActionGroup::make()->label('Actions');

    expect($group->getLabel())->toBe('Actions');
});

it('has null tooltip by default', function () {
    $group = ActionGroup::make();

    expect($group->getTooltip())->toBeNull();
});

it('can set tooltip', function () {
    $group = ActionGroup::make()->tooltip('More actions');

    expect($group->getTooltip())->toBe('More actions');
});

it('is dropdown by default', function () {
    $group = ActionGroup::make();

    expect($group->isDropdown())->toBeTrue();
});

it('can disable dropdown', function () {
    $group = ActionGroup::make()->dropdown(false);

    expect($group->isDropdown())->toBeFalse();
});

it('has null icon by default', function () {
    $group = ActionGroup::make();

    expect($group->getIcon())->toBeNull();
});

it('can set icon', function () {
    $group = ActionGroup::make()->icon('pi pi-cog');

    expect($group->getIcon())->toBe('pi pi-cog');
});

it('has null color by default', function () {
    $group = ActionGroup::make();

    expect($group->getColor())->toBeNull();
});

it('can set color', function () {
    $group = ActionGroup::make()->color('primary');

    expect($group->getColor())->toBe('primary');
});

it('returns vue props with nested action props', function () {
    $group = ActionGroup::make([
        Action::make('edit')->label('Edit'),
    ])->label('Actions');

    $props = $group->toVueProps();

    expect($props)
        ->toHaveKey('label', 'Actions')
        ->toHaveKey('actions')
        ->toHaveKey('isDropdown', true)
        ->toHaveKey('icon', 'pi pi-ellipsis-v')
        ->toHaveKey('color', 'secondary');

    expect($props['actions'])->toHaveCount(1);
    expect($props['actions'][0])->toHaveKey('name', 'edit');
});

it('toArray returns same keys as toVueProps', function () {
    $group = ActionGroup::make([
        Action::make('edit'),
    ]);

    $array = $group->toArray();
    $props = $group->toVueProps();

    expect(array_keys($array))->toBe(array_keys($props));
    expect($array['label'])->toBe($props['label']);
    expect($array['isDropdown'])->toBe($props['isDropdown']);
    expect(count($array['actions']))->toBe(count($props['actions']));
});

it('is not speed dial by default', function () {
    $group = ActionGroup::make();

    expect($group->isSpeedDial())->toBeFalse();
});

it('can enable speed dial', function () {
    $group = ActionGroup::make()->speedDial();

    expect($group->isSpeedDial())->toBeTrue();
});

it('has default speed dial direction of up', function () {
    $group = ActionGroup::make()->speedDial();

    expect($group->getSpeedDialDirection())->toBe('up');
});

it('can set speed dial direction', function () {
    $group = ActionGroup::make()->speedDial('left');

    expect($group->getSpeedDialDirection())->toBe('left');
});

it('has default speed dial type of linear', function () {
    $group = ActionGroup::make()->speedDial();

    expect($group->getSpeedDialType())->toBe('linear');
});

it('can set speed dial type', function () {
    $group = ActionGroup::make()->speedDial('up', 'circle');

    expect($group->getSpeedDialType())->toBe('circle');
});

it('includes speed dial props in vue props', function () {
    $group = ActionGroup::make()->speedDial('down', 'semi-circle');

    $props = $group->toVueProps();

    expect($props)
        ->toHaveKey('isSpeedDial', true)
        ->toHaveKey('speedDialDirection', 'down')
        ->toHaveKey('speedDialType', 'semi-circle');
});

it('dropdown menu template applies spa passthrough when spa is enabled', function () {
    $template = file_get_contents(dirname(__DIR__) . '/resources/views/action-group.blade.php');

    expect($template)
        ->toContain("@if(\$spa ?? false)")
        ->and($template)->toContain(":pt=\"{ itemLink: { 'data-livue-navigate': 'true' } }\"");
});
