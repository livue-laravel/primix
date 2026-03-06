@php
    $style = $style ?? [];
    $radioPt = !empty($style['radio']) ? ['root' => $style['radio']] : null;
    $optionStyle = $style['option'] ?? [];
    $optionClass = is_array($optionStyle) ? ($optionStyle['class'] ?? '') : '';
    $isButtons = $component->isButtons();
@endphp

@if($isButtons)
    {{-- SelectButton mode (single selection) --}}
    <div>
        @if($component->getLabel())
            <label class="block mb-2 font-medium text-surface-700 dark:text-surface-200">
                {{ $component->getLabel() }}
                @if($required)
                    <span class="text-red-500">*</span>
                @endif
            </label>
        @endif
        <p-select-button
            v-model="{{ $statePath }}"
            :options="{!! \Illuminate\Support\Js::from($options) !!}"
            option-label="label"
            option-value="value"
            option-disabled="disabled"
            @if($disabled) disabled @endif
            @error($component->getStatePath()) invalid @enderror
            {!! $component->getExtraAttributes() !!}
        ></p-select-button>
    </div>
@else
<div class="primix-radio-group @if($inline) flex flex-wrap gap-4 @else flex flex-col gap-2 @endif">
    @foreach($options as $option)
        <div class="flex items-start gap-2{{ $optionClass ? " {$optionClass}" : '' }}">
            <p-radio-button
                id="{{ $id }}_{{ $option['value'] }}"
                v-model="{{ $statePath }}"
                value="{{ $option['value'] }}"
                @if($disabled || ($option['disabled'] ?? false)) disabled @endif
                @error($component->getStatePath()) invalid @enderror
                @if($radioPt) :pt="{!! \Illuminate\Support\Js::from($radioPt) !!}" @endif
            ></p-radio-button>
            <div>
                <label for="{{ $id }}_{{ $option['value'] }}" class="cursor-pointer">
                    {{ $option['label'] }}
                </label>
                @if($option['description'] ?? null)
                    <p class="text-sm text-surface-500">{{ $option['description'] }}</p>
                @endif
            </div>
        </div>
    @endforeach
</div>
@endif
