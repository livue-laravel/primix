@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;
    $textInputStylePt = \Illuminate\Support\Arr::only($style, ['input', 'group']);
    $prefixAddonPt = !empty($style['prefix']) ? ['root' => $style['prefix']] : null;
    $suffixAddonPt = !empty($style['suffix']) ? ['root' => $style['suffix']] : null;
@endphp

@include($component->getVariantView())
