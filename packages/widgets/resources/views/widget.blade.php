@props([
    'widget' => null,
    'variant' => null,
])

@php
    $resolvedVariant = $variant;

    if (($resolvedVariant === null) && ($widget instanceof \Primix\Widgets\Widget)) {
        $resolvedVariant = $widget->getVariant();
    }

    if (! in_array($resolvedVariant, ['boxed', 'unboxed'], true)) {
        $resolvedVariant = 'boxed';
    }

    $boxedStyle = null;

    if ($resolvedVariant === 'boxed') {
        $colorManager = app(\Primix\Support\Colors\ColorManager::class);
        $cardBorderColor = $colorManager->shadeOf('primary', 700)->toHex();
        $cardBorderDarkColor = $colorManager->shadeOf('primary', 400)->toHex();
        $boxedStyle = "--px-widget-card-border: color-mix(in srgb, {$cardBorderColor} 28%, transparent); --px-widget-card-border-dark: color-mix(in srgb, {$cardBorderDarkColor} 34%, transparent);";
    }
@endphp

<div
    {{ $attributes->class([
        'primix-widget',
        'primix-widget-boxed rounded-[1.75rem] border border-[var(--px-widget-card-border)] bg-surface-0 p-5 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.18),0_2px_8px_-4px_rgba(15,23,42,0.08)] dark:border-[var(--px-widget-card-border-dark)] dark:bg-surface-900 dark:shadow-[0_16px_36px_-22px_rgba(2,6,23,0.55),0_2px_10px_-6px_rgba(2,6,23,0.35)]' => $resolvedVariant === 'boxed',
        'primix-widget-unboxed' => $resolvedVariant === 'unboxed',
    ]) }}
    @if($boxedStyle) style="{{ $boxedStyle }}" @endif
    data-primix-widget
    data-primix-widget-variant="{{ $resolvedVariant }}"
>
    {{ $slot }}
</div>
