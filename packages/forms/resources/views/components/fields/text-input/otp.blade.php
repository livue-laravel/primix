<div>
    @if($label)
        <label for="{{ $id }}" class="block mb-2 font-medium text-surface-700 dark:text-surface-200">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    @endif
    <p-input-otp
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        :length="{{ $component->getOtpLength() }}"
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        integer-only
        {!! $component->getExtraAttributes() !!}
    ></p-input-otp>
</div>
