<?php

it('sidebar template keeps full viewport height under topbar and enables internal scroll', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/sidebar.blade.php');

    expect($template)
        ->toContain('style="top: 4rem; bottom: 0; height: calc(100vh - 4rem);"')
        ->toContain('lg:block')
        ->toContain('w-64 overflow-y-auto border-r')
        ->toContain('<nav class="mt-6 space-y-1 px-3 pb-6">');
});

it('panel layout keeps a minimum screen height for sidebar/content shell', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/layouts/shell.blade.php');

    expect($template)->toContain("'flex w-full min-h-screen'");
});
