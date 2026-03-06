<div class="primix-knob">
    <p-knob
        v-model="{{ $statePath }}"
        :min="{{ $min }}"
        :max="{{ $max }}"
        :step="{{ $step }}"
        :size="{{ $size }}"
        :stroke-width="{{ $strokeWidth }}"
        :show-value="{{ $showValue ? 'true' : 'false' }}"
        @if($valueTemplate) value-template="{{ $valueTemplate }}" @endif
        @if($disabled) disabled @endif
        {!! $component->getExtraAttributes() !!}
    ></p-knob>
</div>
