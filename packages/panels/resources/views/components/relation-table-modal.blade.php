@php
    if (! property_exists($this, 'mountedRelationTableField')) {
        $isVisible = false;
    } else {
        $isVisible = $this->mountedRelationTableField !== null;
        $action    = $this->mountedRelationTableAction ?? 'create';
        $isAttach  = $action === 'attach';
        $isEdit    = $this->mountedRelationTableIndex !== null;
        $heading   = $isAttach ? __('Attach record') : ($isEdit ? __('Edit record') : __('Add record'));
        $rtField   = method_exists($this, 'getMountedRelationTableField') ? $this->getMountedRelationTableField() : null;
    }

    if ($isVisible && ! $isAttach && $rtField !== null) {
        $managerClass = $rtField->getManagerClass();
        $modalForm    = \Primix\Forms\Form::make()
            ->livue($this)
            ->name('mountedRelationTableData')
            ->statePath('mountedRelationTableData')
            ->submitAction('saveRelationTableRecord')
            ->schema($managerClass::form(new \Primix\Forms\Form())->getFields());
    }
@endphp

@if($isVisible)
    <p-dialog
        :visible="mountedRelationTableField !== null"
        @update:visible="(val) => { if (!val) closeRelationTableModal() }"
        modal
        :header="'{{ addslashes($heading) }}'"
        :style="{ width: '32rem' }"
        :draggable="false"
    >
        @if($isAttach && $rtField !== null)
            <div class="pt-2">
                <p-select
                    v-model="mountedRelationTableAttachId"
                    :options="{!! \Illuminate\Support\Js::from($rtField->getAvailableRecords()) !!}"
                    option-label="{{ $rtField->getRecordTitleAttribute() ?? 'id' }}"
                    option-value="id"
                    placeholder="{{ __('Select a record...') }}"
                    fluid
                ></p-select>
            </div>
        @elseif(isset($modalForm))
            @include('primix-forms::form', ['form' => $modalForm, 'renderFieldActionModal' => false])
        @endif

        <template #footer>
            <p-button label="{{ __('Cancel') }}" severity="secondary" @click="closeRelationTableModal()" />
            @if($isAttach)
                <p-button label="{{ __('Attach') }}" @click="attachRelationTableRecord()" />
            @else
                <p-button label="{{ __('Save') }}" @click="saveRelationTableRecord()" />
            @endif
        </template>
    </p-dialog>
@endif
