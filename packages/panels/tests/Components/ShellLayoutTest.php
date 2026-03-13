<?php

it('panel layout delegates rendering to the shared shell component', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/layouts/panel.blade.php');

    expect($template)
        ->toContain('<x-primix::layouts.shell :layout="$shell ?? null" :topbar="$topbar ?? null">')
        ->toContain('{{ $slot }}');
});

it('shared shell template supports conditional topbar/sidebar and shell-level controls', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/layouts/shell.blade.php');

    expect($template)
        ->toContain("\$resolvedTopbar = \$layoutConfig['topbar'] ?? (\$topbar ?? null);")
        ->toContain('@if($showTopbar && $resolvedTopbar instanceof \Illuminate\Contracts\Support\Htmlable)')
        ->toContain('{{ $resolvedTopbar }}')
        ->toContain("@if(\$showSidebar && ! \$topBarNavigation)")
        ->not->toContain("@livue('primix-topbar'");
});

it('topbar template can hide panel switcher and user menu when shell disables them', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/topbar.blade.php');

    expect($template)
        ->toContain('@if($showPanelSwitcher)')
        ->toContain('@if($showUserMenu)');
});
