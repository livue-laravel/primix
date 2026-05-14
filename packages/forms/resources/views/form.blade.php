@once('primix-forms-assets')
    @livueLoadStyle('primix-forms', 'primix/forms')
    @livueLoadScript('primix-forms', 'primix/forms', ['type' => 'module'])
@endonce

<form @submit.prevent="{{ $form->getSubmitAction() }}()" @class(['primix-form', 'mt-6' => $form->isWrapped()])>
    @if($form->isWrapped())
    <div class="bg-[var(--p-content-background)] shadow-none ring-1 ring-[var(--p-content-border-color)] sm:rounded-lg">
        <div class="px-4 py-6 sm:p-8">
    @endif

    <div class="primix-grid" style="{{ $form->getGridStyle() }}">
        @foreach($form->getComponents() as $component)
            @if(!method_exists($component, 'isHidden') || !$component->isHidden())
            <div class="primix-grid-item"
                @if(method_exists($component, 'getGridItemStyle') && $component->getGridItemStyle()) style="{{ $component->getGridItemStyle() }}" @endif
                @if(method_exists($component, 'isColumnSpanFull') && $component->isColumnSpanFull()) data-col-span-full @endif
            >
                {{ $component }}
            </div>
            @endif
        @endforeach
    </div>

    @if($form->isWrapped())
        </div>
    </div>
    @endif

    @if($form->hasFooterActions())
        <div class="primix-form-actions flex items-center justify-end gap-x-3 pt-4" data-col-span-full>
            @foreach($form->getFooterActions() as $action)
                {{ $action }}
            @endforeach
        </div>
    @elseif($form->hasSubmitButton())
        <div class="primix-form-actions pt-4" data-col-span-full>
            {{ $form->getSubmitButton() }}
        </div>
    @endif
</form>
