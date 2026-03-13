@php
    $severity = app(\Primix\Support\Colors\ColorManager::class)->toPrimeVueSeverity($color ?? 'primary');

    $buttonSize = match($size ?? 'md') {
        'xs', 'sm' => 'small',
        'lg', 'xl' => 'large',
        default => null,
    };

    $isIconButton = (bool) ($isIconButton ?? false);
    $isLink = (bool) ($isLink ?? false);
    $hasTooltip = (bool) ($hasTooltip ?? false);
    $tooltipPosition = $tooltipPosition ?? null;
    $fallbackLabel = isset($name) && $name !== '' ? str($name)->headline()->toString() : null;
    $resolvedLabel = $label !== null && $label !== '' ? $label : $fallbackLabel;
    $hasLabel = ! $isIconButton && $label !== null && $label !== '';
    $ariaLabel = $isIconButton ? $resolvedLabel : null;
    $tooltipLabel = $hasTooltip ? $resolvedLabel : null;
    $hasTooltipLabel = $tooltipLabel !== null && $tooltipLabel !== '';

    $recordKeyArg = isset($recordKey) && $recordKey !== null ? ", recordKey: '" . addslashes($recordKey) . "'" : '';
    $iconHtml = $icon ? app(\Primix\Support\Icons\IconManager::class)->render($icon, 'primix-action-icon') : null;
    $extraAttributes = $component->getExtraAttributes();
@endphp

@if($isSubmit)
    {{-- Submit button for forms --}}
    <p-button
        class="primix-action-button"
        type="submit"
        @if($severity) severity="{{ $severity }}" @endif
        @if($buttonSize) size="{{ $buttonSize }}" @endif
        @if($outlined) outlined @endif
        @if($isLink) text @endif
        @if($disabled) disabled @endif
        @if($hasLabel) label="{{ $label }}" @endif
        @if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'top') v-tooltip.top="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'right') v-tooltip.right="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'bottom') v-tooltip.bottom="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'left') v-tooltip.left="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && !in_array($tooltipPosition, ['top', 'right', 'bottom', 'left'], true)) v-tooltip="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($iconPosition === 'after') icon-pos="right" @endif
        {!! $extraAttributes !!}
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@elseif($url && !$requiresConfirmation)
    {{-- Simple link button --}}
    <p-button
        class="primix-action-button"
        as="a"
        href="{{ $url }}"
        @if(!$openUrlInNewTab && ($spa ?? false)) :pt="{ root: { 'data-livue-navigate': 'true' } }" @endif
        @if($openUrlInNewTab) target="_blank" rel="noopener noreferrer" @endif
        @if($severity) severity="{{ $severity }}" @endif
        @if($buttonSize) size="{{ $buttonSize }}" @endif
        @if($outlined) outlined @endif
        @if($isLink) text @endif
        @if($disabled) disabled @endif
        @if($hasLabel) label="{{ $label }}" @endif
        @if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'top') v-tooltip.top="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'right') v-tooltip.right="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'bottom') v-tooltip.bottom="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'left') v-tooltip.left="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && !in_array($tooltipPosition, ['top', 'right', 'bottom', 'left'], true)) v-tooltip="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($iconPosition === 'after') icon-pos="right" @endif
        {!! $extraAttributes !!}
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@elseif($requiresConfirmation)
    {{-- Button with confirmation dialog --}}
    <p-button
        class="primix-action-button"
        @if($severity) severity="{{ $severity }}" @endif
        @if($buttonSize) size="{{ $buttonSize }}" @endif
        @if($outlined) outlined @endif
        @if($isLink) text @endif
        @if($disabled) disabled @endif
        @if($hasLabel) label="{{ $label }}" @endif
        @if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'top') v-tooltip.top="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'right') v-tooltip.right="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'bottom') v-tooltip.bottom="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'left') v-tooltip.left="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && !in_array($tooltipPosition, ['top', 'right', 'bottom', 'left'], true)) v-tooltip="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($iconPosition === 'after') icon-pos="right" @endif
        {!! $extraAttributes !!}
        @click="livue.callWithConfirm('{{ $callMethod }}', '{{ addslashes($confirmationDescription ?? 'Are you sure?') }}', { name: '{{ $name }}'{{ $recordKeyArg }} })"
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@elseif($isModal)
    {{-- Button that opens modal --}}
    <p-button
        class="primix-action-button"
        @if($severity) severity="{{ $severity }}" @endif
        @if($buttonSize) size="{{ $buttonSize }}" @endif
        @if($outlined) outlined @endif
        @if($isLink) text @endif
        @if($disabled) disabled @endif
        @if($hasLabel) label="{{ $label }}" @endif
        @if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'top') v-tooltip.top="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'right') v-tooltip.right="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'bottom') v-tooltip.bottom="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'left') v-tooltip.left="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && !in_array($tooltipPosition, ['top', 'right', 'bottom', 'left'], true)) v-tooltip="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($iconPosition === 'after') icon-pos="right" @endif
        {!! $extraAttributes !!}
        @click="openActionModal({ name: '{{ $name }}', callMethod: '{{ $callMethod }}'{{ $recordKeyArg }} })"
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@elseif($jsAction)
    {{-- Client-side JavaScript action --}}
    <p-button
        class="primix-action-button"
        @if($severity) severity="{{ $severity }}" @endif
        @if($buttonSize) size="{{ $buttonSize }}" @endif
        @if($outlined) outlined @endif
        @if($isLink) text @endif
        @if($disabled) disabled @endif
        @if($hasLabel) label="{{ $label }}" @endif
        @if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'top') v-tooltip.top="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'right') v-tooltip.right="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'bottom') v-tooltip.bottom="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'left') v-tooltip.left="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && !in_array($tooltipPosition, ['top', 'right', 'bottom', 'left'], true)) v-tooltip="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($iconPosition === 'after') icon-pos="right" @endif
        {!! $extraAttributes !!}
        @click="{!! $jsAction !!}"
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@else
    {{-- Simple action button --}}
    <p-button
        class="primix-action-button"
        @if($severity) severity="{{ $severity }}" @endif
        @if($buttonSize) size="{{ $buttonSize }}" @endif
        @if($outlined) outlined @endif
        @if($isLink) text @endif
        @if($disabled) disabled @endif
        @if($hasLabel) label="{{ $label }}" @endif
        @if($ariaLabel) aria-label="{{ $ariaLabel }}" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'top') v-tooltip.top="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'right') v-tooltip.right="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'bottom') v-tooltip.bottom="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && $tooltipPosition === 'left') v-tooltip.left="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($hasTooltipLabel && !in_array($tooltipPosition, ['top', 'right', 'bottom', 'left'], true)) v-tooltip="'{{ addslashes($tooltipLabel) }}'" @endif
        @if($iconPosition === 'after') icon-pos="right" @endif
        {!! $extraAttributes !!}
        @click="{{ $callMethod }}({ name: '{{ $name }}'{{ $recordKeyArg }} })"
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@endif
