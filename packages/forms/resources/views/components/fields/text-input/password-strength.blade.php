<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <p-password
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($disabled) :disabled="true" @endif
        @error($component->getStatePath()) :invalid="true" @enderror
        @if($placeholder) placeholder="{{ $placeholder }}" @endif
        :feedback="true"
        :toggle-mask="{{ $revealable ? 'true' : 'false' }}"
        fluid
        {!! $component->getExtraAttributes() !!}
    ></p-password>
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</p-float-label>
