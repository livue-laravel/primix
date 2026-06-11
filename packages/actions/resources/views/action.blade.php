@once('primix-actions-assets')
    @livueLoadStyle('primix-actions', 'primix/actions')
    @livueLoadScript('primix-actions', 'primix/actions', ['type' => 'module'])
@endonce

@php
    $severity = $component->hasGradient()
        ? null
        : app(\Primix\Support\Colors\ColorManager::class)->toPrimeVueSeverity($color ?? 'primary');

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
    $runActionParams = isset($recordKey) && $recordKey !== null
        ? ", { recordKey: '" . addslashes($recordKey) . "' }"
        : '';
    $confirmDescription = addslashes($confirmationDescription ?? 'Are you sure?');
    $escapedName = addslashes($name ?? '');
    $iconHtml = $icon ? app(\Primix\Support\Icons\IconManager::class)->render($icon, 'primix-action-icon') : null;
    $renderableAttributes = $component->getRenderableExtraAttributes(
        'primix-action-button',
        $component->getGradientExtraAttributes(),
    );
    $buttonClass = $renderableAttributes['class'];
    $extraAttributes = $renderableAttributes['attributes'];
@endphp

@if($isSubmit)
    {{-- Submit button for forms --}}
    <p-button
        class="{{ $buttonClass }}"
        type="submit"
        :loading="livue.isSubmittingForm()"
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
        class="{{ $buttonClass }}"
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
        class="{{ $buttonClass }}"
        :loading="livue.isCallingAction('{{ $escapedName }}')"
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
        @click="livue.runActionWithConfirm('{{ $escapedName }}', '{{ $callMethod }}', '{{ $confirmDescription }}'{{ $runActionParams }})"
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@elseif($isModal)
    {{-- Button that opens modal --}}
    <p-button
        class="{{ $buttonClass }}"
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
        class="{{ $buttonClass }}"
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
        class="{{ $buttonClass }}"
        :loading="livue.isCallingAction('{{ $escapedName }}')"
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
        @click="livue.runAction('{{ $escapedName }}', '{{ $callMethod }}'{{ $runActionParams }})"
    >@if($iconHtml)<template #icon>{!! $iconHtml !!}</template>@endif</p-button>
@endif
