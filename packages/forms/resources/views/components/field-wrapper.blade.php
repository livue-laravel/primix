@php
$isInline = $component->isLabelInline();

$aboveLabel = $component->getAboveLabel();
$belowLabel = $component->getBelowLabel();
$aboveField = $component->getAboveField();
$belowField = $component->getBelowField();

$helperText = method_exists($component, 'getHelperText') ? $component->getHelperText() : null;

$statePath = $component->getStatePath();

$wrapperAttributes = $component->getExtraWrapperAttributes()
    ->merge(['class' => 'primix-field'])
    ->class([
        'primix-label-hidden' => $component->isLabelHidden(),
        'primix-label-inline' => $isInline,
    ]);
@endphp

<div {!! $wrapperAttributes !!}
    @if(method_exists($component, 'getWatchDirective')) {!! $component->getWatchDirective() !!} @endif
>
    @if($isInline)
        <div class="primix-inline-label-area">
            @if($aboveLabel)
                <div class="primix-slot-above-label">{{ $aboveLabel }}</div>
            @endif
            <label class="primix-inline-label" for="{{ $component->getId() }}">
                {{ $component->getLabel() }}
                @if(method_exists($component, 'isRequired') && $component->isRequired())
                    <span class="text-red-500">*</span>
                @endif
            </label>
            @if($belowLabel)
                <div class="primix-slot-below-label">{{ $belowLabel }}</div>
            @endif
        </div>
        <div class="primix-field-content">
            @if($aboveField)
                <div class="primix-slot-above-field">{{ $aboveField }}</div>
            @endif

            {!! $slot !!}

            @if($belowField)
                <div class="primix-slot-below-field">{{ $belowField }}</div>
            @endif

            @if($helperText)
                <small class="primix-field-helper text-surface-500 dark:text-surface-400">{{ $helperText }}</small>
            @endif

            <div v-if="$errors['{{ $statePath }}']" class="primix-field-errors">
                <small class="text-red-500" v-text="$errors['{{ $statePath }}']"></small>
            </div>
        </div>
    @else
        @if($aboveLabel)
            <div class="primix-slot-above-label">{{ $aboveLabel }}</div>
        @endif
        @if($belowLabel)
            <div class="primix-slot-below-label">{{ $belowLabel }}</div>
        @endif
        @if($aboveField)
            <div class="primix-slot-above-field">{{ $aboveField }}</div>
        @endif

        {!! $slot !!}

        @if($belowField)
            <div class="primix-slot-below-field">{{ $belowField }}</div>
        @endif

        @if($helperText)
            <small class="primix-field-helper text-surface-500 dark:text-surface-400">{{ $helperText }}</small>
        @endif

        <div v-if="$errors['{{ $statePath }}']" class="primix-field-errors">
            <small class="text-red-500" v-text="$errors['{{ $statePath }}']"></small>
        </div>
    @endif
</div>
