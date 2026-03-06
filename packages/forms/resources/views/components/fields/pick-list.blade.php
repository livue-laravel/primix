<div class="primix-pick-list">
    <p-pick-list
        v-model="{{ $statePath }}"
        :options="{!! \Illuminate\Support\Js::from($sourceOptions) !!}"
        data-key="value"
        breakpoint="1400px"
        @if($filterable) filter @endif
        @if($disabled) disabled @endif
        {!! $component->getExtraAttributes() !!}
    >
        <template #option="{ option }">
            <span v-text="option.label"></span>
        </template>
    </p-pick-list>
</div>
