@php
    $label = $component->getLabel();
    $hasLabel = $label && ! $component->isLabelHidden();
    $helperText = method_exists($component, 'getHelperText') ? $component->getHelperText() : null;

    $wrapperAttributes = $component->getExtraWrapperAttributes()
        ->merge(['class' => 'primix-entry']);
@endphp

<div {!! $wrapperAttributes !!}>
    @if($hasLabel)
        <div class="text-sm font-medium leading-6 text-gray-900 dark:text-white">{{ $label }}</div>
    @endif

    <div @class(['text-sm leading-6 text-gray-700 dark:text-gray-300', 'mt-1' => $hasLabel])>
        {!! $slot !!}
    </div>

    @if($helperText)
        <small class="text-xs text-surface-500 dark:text-surface-400">{{ $helperText }}</small>
    @endif
</div>
