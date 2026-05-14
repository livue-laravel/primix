<?php

it('widgets template forwards configured widget variants to livue', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/widgets.blade.php');

    expect($template)
        ->toContain("\$configuredWidgetData['variant'] = \$widget->getVariant()")
        ->and($template)->toContain('@livue($widgetClass, $configuredWidgetData)');
});
