@php
    $hasTicks = !empty($ticks) && $orientation !== 'vertical';
    $tickSuffix = $tickLabelSuffix !== '' ? ' ' . $tickLabelSuffix : '';
@endphp
<div @class([
    'primix-slider',
    'primix-slider-with-ticks' => $hasTicks,
    'primix-slider-with-value' => $showCurrentValue && $orientation !== 'vertical',
])>
    <div class="primix-slider-track">
        <p-slider
            v-model="{{ $statePath }}"
            :min="{{ $min }}"
            :max="{{ $max }}"
            :step="{{ $step }}"
            @if($range) range @endif
            @if($orientation === 'vertical') orientation="vertical" style="height: 14rem;" @endif
            @if($disabled) disabled @endif
            {!! $component->getExtraAttributes() !!}
        ></p-slider>
        @if($hasTicks)
            <div class="primix-slider-ticks">
                @foreach($ticks as $tick)
                    <span class="primix-slider-tick">{{ $tick }}{{ $tickSuffix }}</span>
                @endforeach
            </div>
        @endif
    </div>
    @if($showCurrentValue && $orientation !== 'vertical')
        <div class="primix-slider-current-value">
            <span v-text="({{ $statePath }} ?? {{ $min }}) + '{{ $currentValueSuffix }}'"></span>
        </div>
    @endif
</div>
