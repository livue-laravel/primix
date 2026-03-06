@php
$label = $component->getLabel();
$description = method_exists($component, 'getDescription') ? $component->getDescription() : null;
$isAside = method_exists($component, 'isAside') && $component->isAside();
$hasLabel = $label && !$component->isLabelHidden();
$hasExtraAttributes = $component->getExtraWrapperAttributes()->isNotEmpty();
$needsWrapper = $hasLabel || $description || $hasExtraAttributes || $isAside;

$wrapperAttributes = $component->getExtraWrapperAttributes()
    ->class([
        'primix-layout-wrapper',
        'primix-label-hidden' => $component->isLabelHidden(),
        'primix-aside' => $isAside,
    ]);
@endphp

@if($needsWrapper)
<div {!! $wrapperAttributes !!}>
    @if($hasLabel || $description)
        <div class="primix-layout-label @if(!$isAside) mb-3 @endif">
            @if($hasLabel)
                <span class="text-lg font-semibold text-surface-700 dark:text-surface-300">{{ $label }}</span>
            @endif
            @if($description)
                <p class="primix-layout-description text-sm text-surface-500 dark:text-surface-400 @if($hasLabel) mt-1 @endif">{{ $description }}</p>
            @endif
        </div>
    @endif

    @if($isAside)
        <div class="primix-aside-content">
            {!! $slot !!}
        </div>
    @else
        {!! $slot !!}
    @endif
</div>
@else
{!! $slot !!}
@endif
