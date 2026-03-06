@php
    $style = $style ?? [];
    $checkboxPt = !empty($style['checkbox']) ? ['root' => $style['checkbox']] : null;
    $optionStyle = $style['option'] ?? [];
    $optionClass = is_array($optionStyle) ? ($optionStyle['class'] ?? '') : '';
    $needsVueComponent = $searchable || $bulkToggleable;
    $isButtons = $component->isButtons();
@endphp

@if($isButtons)
    {{-- SelectButton mode (toggle buttons) --}}
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
            multiple
            @if($disabled) disabled @endif
            @error($component->getStatePath()) invalid @enderror
            {!! $component->getExtraAttributes() !!}
        ></p-select-button>
    </div>
@elseif($needsVueComponent)
    <primix-checkbox-list
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        :options="{!! \Illuminate\Support\Js::from($options) !!}"
        :disabled="{{ $disabled ? 'true' : 'false' }}"
        :searchable="{{ $searchable ? 'true' : 'false' }}"
        :bulk-toggleable="{{ $bulkToggleable ? 'true' : 'false' }}"
        :inline="{{ $inline ? 'true' : 'false' }}"
        @if($gridColumns) :grid-columns="{{ $gridColumns }}" @endif
        @if($checkboxPt) :checkbox-pt="{!! \Illuminate\Support\Js::from($checkboxPt) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    ></primix-checkbox-list>
@else
    <div class="primix-checkbox-list @if($inline) flex flex-wrap gap-4 @else flex flex-col gap-2 @endif"
        @if($gridColumns) style="display: grid; grid-template-columns: repeat({{ $gridColumns }}, 1fr); gap: 0.5rem;" @endif
    >
        @foreach($options as $option)
            <div class="flex items-start gap-2{{ $optionClass ? " {$optionClass}" : '' }}">
                <p-checkbox
                    id="{{ $id }}_{{ $option['value'] }}"
                    v-model="{{ $statePath }}"
                    value="{{ $option['value'] }}"
                    @if($disabled || ($option['disabled'] ?? false)) disabled @endif
                    @error($component->getStatePath()) invalid @enderror
                    @if($checkboxPt) :pt="{!! \Illuminate\Support\Js::from($checkboxPt) !!}" @endif
                ></p-checkbox>
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
