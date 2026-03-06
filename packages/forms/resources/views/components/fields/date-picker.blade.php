@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $datePickerPt = [];
    if (!empty($style['picker']))    $datePickerPt['root'] = $style['picker'];
    if (!empty($style['icon']))      $datePickerPt['inputIcon'] = $style['icon'];
    if (!empty($style['buttonBar'])) $datePickerPt['buttonbar'] = $style['buttonBar'];
@endphp

<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <p-date-picker
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        @if($format) date-format="{{ $format }}" @endif
        @if($component->getDateView()) view="{{ $component->getDateView() }}" @endif
        @if($component->isRange()) selection-mode="range" @endif
        @if(!empty($datePickerPt)) :pt="{!! \Illuminate\Support\Js::from($datePickerPt) !!}" @endif
        show-icon
        show-button-bar
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
