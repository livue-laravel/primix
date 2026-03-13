<?php

it('panel layout content wrapper is not vertically centered', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/layouts/shell.blade.php');

    expect($template)
        ->toContain('class="flex w-full flex-grow"')
        ->not->toContain('items-center justify-center');
});
