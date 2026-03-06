@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $timePickerPt = [];
    if (!empty($style['picker'])) $timePickerPt['root'] = $style['picker'];
@endphp

<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <p-date-picker
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        time-only
        @if(!$is24Hour) hour-format="12" @endif
        @if($withSeconds) show-seconds @endif
        @if($hourStep !== 1) :step-hour="{{ $hourStep }}" @endif
        @if($minuteStep !== 1) :step-minute="{{ $minuteStep }}" @endif
        @if($secondStep !== 1) :step-second="{{ $secondStep }}" @endif
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        @if(!empty($timePickerPt)) :pt="{!! \Illuminate\Support\Js::from($timePickerPt) !!}" @endif
        show-icon
        fluid
        {!! $component->getExtraAttributes() !!}
    ></p-date-picker>
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</p-float-label>
