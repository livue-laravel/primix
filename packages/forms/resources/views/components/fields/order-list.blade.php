<div class="primix-order-list">
    <p-order-list
        v-model="{{ $statePath }}"
        data-key="value"
        @if($filterable) filter @endif
        @if($disabled) disabled @endif
        {!! $component->getExtraAttributes() !!}
    >
        <template #option="{ option }">
            <span v-text="option.label"></span>
        </template>
    </p-order-list>
</div>
