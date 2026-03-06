@php
    $style = $style ?? [];
    $checkboxPt = !empty($style['checkbox']) ? ['root' => $style['checkbox']] : null;
    $labelStyle = $style['label'] ?? [];
    $labelClass = is_array($labelStyle) ? ($labelStyle['class'] ?? '') : '';
@endphp

<div class="flex items-start gap-2">
    <p-checkbox
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        binary
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        @if($checkboxPt) :pt="{!! \Illuminate\Support\Js::from($checkboxPt) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    ></p-checkbox>
    <label for="{{ $id }}" class="cursor-pointer{{ $labelClass ? " {$labelClass}" : '' }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</div>
