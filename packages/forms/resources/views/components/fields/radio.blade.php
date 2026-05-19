@php
    $style = $style ?? [];
    $radioPt = !empty($style['radio']) ? ['root' => $style['radio']] : null;
    $optionStyle = $style['option'] ?? [];
    $optionClass = is_array($optionStyle) ? ($optionStyle['class'] ?? '') : '';
    $isButtons = $component->isButtons();
    $isCards = $component->isCards();
@endphp

@if($isCards)
    <div>
        @if($component->getLabel())
            <label class="block mb-2 font-medium text-surface-700 dark:text-surface-200">
                {{ $component->getLabel() }}
                @if($required)
                    <span class="text-red-500">*</span>
                @endif
            </label>
        @endif
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            @foreach($options as $option)
                @php
                    $optionValueJs = \Illuminate\Support\Js::from($option['value']);
                    $optionDisabled = $disabled || ($option['disabled'] ?? false);
                    $badge = $option['badge'] ?? null;
                    $badgeClasses = match($badge['severity'] ?? 'info') {
                        'success' => 'bg-green-500/15 text-green-500 dark:text-green-400',
                        'danger'  => 'bg-red-500/15 text-red-500 dark:text-red-400',
                        'warn'    => 'bg-yellow-500/15 text-yellow-500 dark:text-yellow-400',
                        default   => 'bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-200',
                    };
                @endphp
                <label
                    for="{{ $id }}_{{ $option['value'] }}"
                    :class="[
                        'primix-radio-card group relative flex flex-col gap-3 p-4 rounded-xl border-2 transition',
                        {{ $optionDisabled ? 'true' : 'false' }} ? 'opacity-50 pointer-events-none' : 'cursor-pointer',
                        {{ $statePath }} === {!! $optionValueJs !!}
                            ? 'border-primary-500 bg-primary-500/5'
                            : 'border-surface-200 hover:border-surface-300 dark:border-surface-700 dark:hover:border-surface-600',
                    ]"
                >
                    <input
                        type="radio"
                        id="{{ $id }}_{{ $option['value'] }}"
                        v-model="{{ $statePath }}"
                        :value="{!! $optionValueJs !!}"
                        class="sr-only"
                        @if($optionDisabled) disabled @endif
                        @error($component->getStatePath()) aria-invalid="true" @enderror
                    />
                    @if(!empty($option['icon']))
                        <span :class="[
                            'inline-flex items-center justify-center w-11 h-11 rounded-lg transition',
                            {{ $statePath }} === {!! $optionValueJs !!}
                                ? 'bg-primary-500 text-surface-950'
                                : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-300',
                        ]">
                            <i class="{{ $option['icon'] }} text-xl"></i>
                        </span>
                    @endif
                    <div class="flex-1 min-w-0">
                        <div class="font-semibold text-surface-900 dark:text-surface-50">
                            {{ $option['label'] }}
                        </div>
                        @if($option['description'] ?? null)
                            <div class="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
                                {{ $option['description'] }}
                            </div>
                        @endif
                    </div>
                    @if($badge)
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium w-fit {{ $badgeClasses }}">
                            {{ $badge['text'] }}
                        </span>
                    @endif
                </label>
            @endforeach
        </div>
    </div>
@elseif($isButtons)
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
