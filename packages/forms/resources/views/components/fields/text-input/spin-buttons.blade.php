<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <p-input-number
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($disabled) :disabled="true" @endif
        @error($component->getStatePath()) :invalid="true" @enderror
        @if($component->getNumberMode()) mode="{{ $component->getNumberMode() }}" @endif
        @if($component->getCurrencyCode()) currency="{{ $component->getCurrencyCode() }}" @endif
        @if($component->getCurrencyLocale()) locale="{{ $component->getCurrencyLocale() }}" @endif
        @if($component->getNumberStep()) :step="{{ $component->getNumberStep() }}" @endif
        @if($component->getButtonLayout()) button-layout="{{ $component->getButtonLayout() }}" @endif
        show-buttons
        fluid
        {!! $component->getExtraAttributes() !!}
    ></p-input-number>
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</p-float-label>
