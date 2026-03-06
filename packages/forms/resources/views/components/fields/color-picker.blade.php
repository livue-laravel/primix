@php
    $style = $style ?? [];
    $pickerPt = !empty($style['picker']) ? ['root' => $style['picker']] : null;
    $labelStyle = $style['label'] ?? [];
    $labelClass = is_array($labelStyle) ? ($labelStyle['class'] ?? '') : '';
@endphp

<div class="flex items-center gap-3">
    <p-color-picker
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        format="{{ $format }}"
        @if($inline) inline @endif
        @if($disabled) disabled @endif
        @if($pickerPt) :pt="{!! \Illuminate\Support\Js::from($pickerPt) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    ></p-color-picker>
    <label for="{{ $id }}" class="cursor-pointer{{ $labelClass ? " {$labelClass}" : '' }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</div>
