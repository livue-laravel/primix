<div class="primix-rating">
    <p-rating
        v-model="{{ $statePath }}"
        :stars="{{ $stars }}"
        :cancel="{{ $cancelable ? 'true' : 'false' }}"
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        {!! $component->getExtraAttributes() !!}
    ></p-rating>
</div>
