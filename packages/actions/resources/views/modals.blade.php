{{--
    Modale generica per le actions di un componente LiVue.

    Usa $this direttamente (il componente LiVue corrente) grazie a LiVueCompilerEngine
    che, tramite Closure::bind(), rende $this disponibile in tutti i Blade template
    (inclusi gli anonymous components) durante il ciclo di rendering.

    Utilizzo in qualsiasi componente LiVue che usa HasActions:
        @fragment('modal')
        <x-primix-actions::modals />
        @endfragment
--}}

{{-- Stacked modals (se il componente supporta HasModalStack) --}}
@if(method_exists($this, 'shouldStackModals') && $this->shouldStackModals())
    @foreach($this->modalStack as $entry)
        <x-primix-actions::action-modal-stacked :entry="$entry" />
    @endforeach
@endif

{{-- Modal corrente: action --}}
<x-primix-actions::action-modal
    :action="$this->getMountedAction()"
    :action-form="$this->getActionForm()"
    type="page"
/>

{{-- Modal corrente: form field action (solo se il componente la supporta) --}}
@if(method_exists($this, 'getMountedFormFieldAction'))
    <x-primix-actions::action-modal
        :action="$this->getMountedFormFieldAction()"
        :action-form="$this->getFieldActionForm()"
        :edit-picker-options="$this->mountedFormFieldActionEditOptions ?? []"
        :edit-key="$this->mountedFormFieldActionEditKey ?? null"
        type="field"
    />
@endif
