@once('primix-forms-assets')
    @livueLoadStyle('primix-forms', 'primix/forms')
    @livueLoadScript('primix-forms', 'primix/forms', ['type' => 'module'])
@endonce

<form @submit.prevent="{{ $form->getSubmitAction() }}()" @class(['primix-form', 'mt-6' => $form->isWrapped()])>
    @if($form->isWrapped())
    <div class="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
        <div class="px-4 py-6 sm:p-8">
    @endif

    <div class="primix-grid" style="{{ $form->getGridStyle() }}">
        @foreach($form->getComponents() as $component)
            <div class="primix-grid-item"
                @if(method_exists($component, 'getGridItemStyle') && $component->getGridItemStyle()) style="{{ $component->getGridItemStyle() }}" @endif
                @if(method_exists($component, 'isColumnSpanFull') && $component->isColumnSpanFull()) data-col-span-full @endif
            >
                {{ $component }}
            </div>
        @endforeach
    </div>

    @if($form->isWrapped())
        </div>
        @if($form->hasFooterActions())
            <div class="flex items-center justify-end gap-x-3 border-t border-gray-900/10 dark:border-gray-700 px-4 py-4 sm:px-8">
                @foreach($form->getFooterActions() as $action)
                    {{ $action }}
                @endforeach
            </div>
        @endif
    </div>
    @endif

    @if(!$form->isWrapped() && $form->hasSubmitButton())
        <div class="primix-form-actions pt-4" data-col-span-full>
            {{ $form->getSubmitButton() }}
        </div>
    @endif
</form>
