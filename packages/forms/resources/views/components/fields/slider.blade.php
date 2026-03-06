<div class="primix-slider">
    <p-slider
        v-model="{{ $statePath }}"
        :min="{{ $min }}"
        :max="{{ $max }}"
        :step="{{ $step }}"
        @if($range) range @endif
        @if($orientation === 'vertical') orientation="vertical" style="height: 14rem;" @endif
        @if($disabled) disabled @endif
        {!! $component->getExtraAttributes() !!}
    ></p-slider>
</div>
