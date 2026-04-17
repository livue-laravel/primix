@props([
    'action' => null,
    'actionForm' => null,
    'type' => 'page',           // 'page' | 'field'
    'editPickerOptions' => [],
    'editKey' => null,
])

@once('primix-forms-assets')
    @livueLoadStyle('primix-forms', 'primix/forms')
    @livueLoadScript('primix-forms', 'primix/forms', ['type' => 'module'])
@endonce

@php
    $isPageAction = $type === 'page';
    $isEditPicker = !$isPageAction && !empty($editPickerOptions) && $editKey === null;
    // For page actions the form is built by getMountedActionForm() on the component.
    // For field actions the form is passed explicitly via the $actionForm prop.
    $resolvedActionForm = $actionForm ?? ($isPageAction ? $this->getMountedActionForm() : null);
@endphp

@if($action && $isEditPicker)
    {{-- Edit picker: selezione del record da modificare in multi-select --}}
    <p-dialog
        :visible="mountedFormFieldAction !== null"
        @update:visible="(val) => { if (!val) { mountedFormFieldAction = null; closeFormFieldAction() } }"
        modal
        :header="'{{ addslashes(__('Select option to edit')) }}'"
        :style="{ width: '400px' }"
    >
        <p-listbox
            :options="{!! \Illuminate\Support\Js::from($editPickerOptions) !!}"
            option-label="label"
            option-value="value"
            @update:model-value="(val) => { if (val !== null && val !== undefined) selectFormFieldEditRecord(val) }"
        ></p-listbox>
    </p-dialog>
@elseif($action)
    @php
        $modalContentRaw = $action->getModalContent();
        $modalContentHtml = $modalContentRaw !== null
            ? '<div class="primix-modal-content mb-4">'
                . ($modalContentRaw instanceof \Illuminate\Contracts\Support\Htmlable
                    ? $modalContentRaw->toHtml()
                    : e($modalContentRaw))
                . '</div>'
            : null;
        $showContentAfterForm = $action->shouldShowModalContentAfterForm();

        $isSlideOver = $action->isSlideOver();
        $slideOverPosition = $isSlideOver ? $action->getSlideOverPosition() : null;
        $transitionMs = 300;

        $sizePx = match($action->getModalWidth()) {
            'sm' => '400px',
            'md' => '500px',
            'lg' => '700px',
            'xl' => '900px',
            '2xl' => '1100px',
            // Width enum values
            'max-w-xs' => '320px',
            'max-w-sm' => '384px',
            'max-w-md' => '448px',
            'max-w-lg' => '512px',
            'max-w-xl' => '576px',
            'max-w-2xl' => '672px',
            'max-w-3xl' => '768px',
            'max-w-4xl' => '896px',
            'max-w-5xl' => '1024px',
            'max-w-6xl' => '1152px',
            'max-w-7xl' => '1280px',
            'max-w-full' => '100%',
            'max-w-screen-2xl' => '1536px',
            default => '500px',
        };

        if ($isSlideOver) {
            $dialogPosition = $slideOverPosition->getDialogPosition();
            $dialogStyle = $slideOverPosition->isVertical()
                ? "width: {$sizePx}; height: 100%; max-height: 100%; border-radius: 0; margin: 0;"
                : "width: 100%; max-width: 100%; height: {$sizePx}; border-radius: 0; margin: 0;";
        } else {
            $dialogPosition = $action->getModalPosition();
            $dialogStyle = "width: {$sizePx};";
        }

        $pt = $action->getModalPassThrough();
        if ($isSlideOver) {
            $pt = array_merge($pt, ['transition' => $slideOverPosition->getTransitionPt()]);
        }

        if ($isPageAction) {
            $visibleExpr = 'mountedAction !== null';
            $closeHandler = $isSlideOver
                ? "mountedAction = null; setTimeout(() => closeActionModal(), {$transitionMs})"
                : "mountedAction = null; closeActionModal()";
        } else {
            $visibleExpr = 'mountedFormFieldAction !== null';
            $closeHandler = $isSlideOver
                ? "mountedFormFieldAction = null; setTimeout(() => closeFormFieldAction(), {$transitionMs})"
                : "mountedFormFieldAction = null; closeFormFieldAction()";
        }
    @endphp

    @if($isPageAction && $action->isPopover())
        {{-- Popover (solo per page actions) --}}
        <p-popover
            :visible="mountedAction !== null"
            @update:visible="(val) => { if (!val) { mountedAction = null; closeActionModal() } }"
        >
            @if($action->getModalHeading())
                <div class="font-semibold mb-2">{{ $action->getModalHeading() }}</div>
            @endif
            @if($action->getModalDescription())
                <p class="text-surface-500 dark:text-surface-400 mb-3 text-sm">{{ $action->getModalDescription() }}</p>
            @endif

            @if($modalContentHtml && !$showContentAfterForm)
                {!! $modalContentHtml !!}
            @endif

            @if($resolvedActionForm)
                {{ $resolvedActionForm }}
            @elseif($action->hasForm())
                <div class="primix-action-form space-y-3">
                    @foreach($action->getFormSchema() as $field)
                        {{ $field }}
                    @endforeach
                </div>
            @endif

            @if($modalContentHtml && $showContentAfterForm)
                {!! $modalContentHtml !!}
            @endif

            @if(!$action->isModalFooterHidden() && count($action->getModalActions()) > 0)
                <div class="flex justify-end gap-2 mt-3">
                    @foreach($action->getModalActions() as $modalAction)
                        @php
                            if ($modalAction->isCancel()) {
                                $clickExpr = "mountedAction = null; closeActionModal()";
                            } elseif ($modalAction->isSubmit()) {
                                $clickExpr = "callAction({ name: '" . addslashes($action->getName()) . "' })";
                            } else {
                                $clickExpr = $modalAction->getJsAction() ?? '';
                            }
                        @endphp
                        <p-button
                            label="{{ $modalAction->getLabel() }}"
                            severity="{{ $modalAction->getSeverity() }}"
                            size="small"
                            @click="{{ $clickExpr }}"
                            @if($modalAction->isOutlined()) outlined @endif
                        ></p-button>
                    @endforeach
                </div>
            @endif
        </p-popover>
    @else
        <p-dialog
            :visible="{{ $visibleExpr }}"
            @update:visible="(val) => { if (!val) { {{ $closeHandler }} } }"
            modal
            :header="'{{ addslashes($action->getModalHeading()) }}'"
            :style="{ {{ collect(explode(';', $dialogStyle))->filter()->map(function ($rule) {
                $rule = trim($rule);
                if (!$rule) return null;
                [$prop, $val] = array_map('trim', explode(':', $rule, 2));
                $camel = \Illuminate\Support\Str::camel($prop);
                return "'{$camel}': '{$val}'";
            })->filter()->implode(', ') }} }"
            :closable="{{ $action->shouldCloseModalOnClickAway() ? 'true' : 'false' }}"
            :close-on-escape="{{ $action->shouldCloseModalOnEscape() ? 'true' : 'false' }}"
            position="{{ $dialogPosition }}"
            :block-scroll="{{ $action->shouldModalBlockScroll() ? 'true' : 'false' }}"
            :draggable="{{ $action->isModalDraggable() ? 'true' : 'false' }}"
            :maximizable="{{ $action->isModalMaximizable() ? 'true' : 'false' }}"
            :auto-z-index="false"
            @php $pt = array_merge_recursive($pt, ['mask' => ['style' => 'z-index: 100']]); @endphp
            :pt="{!! \Illuminate\Support\Js::from($pt) !!}"
        >
            @if($action->getModalDescription())
                <p class="text-surface-500 dark:text-surface-400 mb-4">{{ $action->getModalDescription() }}</p>
            @endif

            @if($modalContentHtml && !$showContentAfterForm)
                {!! $modalContentHtml !!}
            @endif

            @if($resolvedActionForm)
                {{ $resolvedActionForm }}
            @elseif($action->hasForm())
                <div class="primix-action-form space-y-4">
                    @foreach($action->getFormSchema() as $field)
                        {{ $field }}
                    @endforeach
                </div>
            @endif

            @if($modalContentHtml && $showContentAfterForm)
                {!! $modalContentHtml !!}
            @endif

            @if((!$isPageAction || !$action->isModalFooterHidden()) && count($action->getModalActions()) > 0)
                <template #footer>
                    @foreach($action->getModalActions() as $modalAction)
                        @php
                            if ($modalAction->isCancel()) {
                                $clickExpr = $closeHandler;
                            } elseif ($modalAction->isSubmit()) {
                                $clickExpr = $isPageAction
                                    ? "callAction({ name: '" . addslashes($action->getName()) . "' })"
                                    : 'submitFormFieldAction()';
                            } else {
                                $clickExpr = $modalAction->getJsAction() ?? '';
                            }
                        @endphp
                        <p-button
                            label="{{ $modalAction->getLabel() }}"
                            severity="{{ $modalAction->getSeverity() }}"
                            @click="{{ $clickExpr }}"
                            @if($modalAction->isOutlined()) outlined @endif
                        ></p-button>
                    @endforeach
                </template>
            @endif
        </p-dialog>
    @endif
@endif
