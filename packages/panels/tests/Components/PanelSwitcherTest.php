<?php

it('panel switcher link template applies spa navigate attribute when spa is enabled', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/panel-switcher.blade.php');

    expect($template)->toContain("@if(\$spa ?? false) data-livue-navigate=\"true\" @endif");
});

