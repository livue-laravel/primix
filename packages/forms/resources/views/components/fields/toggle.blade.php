@php
    $style = $style ?? [];
    $switchPt = !empty($style['switch']) ? ['root' => $style['switch']] : null;
    $labelStyle = $style['label'] ?? [];
    $labelClass = is_array($labelStyle) ? ($labelStyle['class'] ?? '') : '';
    $isButton = $component->isButton();
@endphp

@if($isButton)
    {{-- ToggleButton mode --}}
    <p-toggle-button
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($component->getOnLabel()) on-label="{{ $component->getOnLabel() }}" @endif
        @if($component->getOffLabel()) off-label="{{ $component->getOffLabel() }}" @endif
        @if($component->getOnIcon()) on-icon="{{ $component->getOnIcon() }}" @endif
        @if($component->getOffIcon()) off-icon="{{ $component->getOffIcon() }}" @endif
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        {!! $component->getExtraAttributes() !!}
    ></p-toggle-button>
@else
<div class="flex flex-col gap-2">
    <label for="{{ $id }}" class="cursor-pointer{{ $labelClass ? " {$labelClass}" : '' }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
    <p-toggle-switch
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        @if($switchPt) :pt="{!! \Illuminate\Support\Js::from($switchPt) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    ></p-toggle-switch>
</div>
@endif
