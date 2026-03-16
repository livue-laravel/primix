<?php

it('page class uses has topbar and has sidebar patterns for panel layout data', function () {
    $source = file_get_contents(dirname(__DIR__, 2) . '/src/Pages/Page.php');

    expect($source)
        ->toContain('use HasSidebar;')
        ->toContain('use HasTopbar;')
        ->toContain("'sidebar' => \$this->sidebar,")
        ->toContain("'topbar' => \$this->topbar,")
        ->toContain("->view('primix::ui.panel-sidebar')")
        ->toContain("->view('primix::ui.panel-topbar')");
});

it('panel sidebar detached view renders primix-sidebar livue component', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/ui/panel-sidebar.blade.php');

    expect($template)
        ->toContain("@livue('primix-sidebar', \$payload)");
});

it('panel topbar detached view renders primix-topbar livue component', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/ui/panel-topbar.blade.php');

    expect($template)
        ->toContain("@livue('primix-topbar', \$payload)");
});
