<?php

it('page class uses has topbar pattern for panel layout data', function () {
    $source = file_get_contents(dirname(__DIR__, 2) . '/src/Pages/Page.php');

    expect($source)
        ->toContain('use HasTopbar;')
        ->toContain("'topbar' => \$this->topbar,")
        ->toContain("->view('primix::ui.panel-topbar')");
});

it('panel topbar detached view renders primix-topbar livue component', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/ui/panel-topbar.blade.php');

    expect($template)
        ->toContain("@livue('primix-topbar', \$payload)");
});
