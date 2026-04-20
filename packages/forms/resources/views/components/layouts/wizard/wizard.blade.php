@php
    $style = $style ?? [];
    $stepperPt = !empty($style['stepper']) ? ['root' => $style['stepper']] : null;
    $stepPanelPt = !empty($style['stepPanel']) ? ['root' => $style['stepPanel']] : null;
    $navigationPt = !empty($style['navigation']) ? $style['navigation'] : null;

    // Step list: always scrollable, merge with user style
    $stepListBasePt = ['root' => ['style' => 'overflow-x: auto; flex-wrap: nowrap']];
    if (!empty($style['stepList'])) {
        $stepListBasePt['root'] = $style['stepList'];
    }

    // Step: always hide PrimeVue default number, merge with user style
    $stepBasePt = ['number' => ['style' => 'display: none']];
    if (!empty($style['step'])) {
        $stepBasePt['root'] = $style['step'];
    }

    $defaultStep = $startStep ?? 0;
    $stateKey = $component->getLabel()
        ?? 'wizard_' . implode('_', array_map(fn($s) => $s->getName(), $component->getSteps()));
    $wizardId = 'primix-wizard-' . md5($stateKey);
    $visibleSteps = array_values(array_filter($component->getSteps(), fn($s) => !$s->isHidden()));
    $lastIndex = count($visibleSteps) - 1;

    // JS helper: navigate to step and scroll into view (uses $el to find wizard by ID)
    $goToStep = fn(int $targetIndex) =>
        "uiState['{$stateKey}'] = {$targetIndex}; \$nextTick(() => \$el?.querySelector('#{$wizardId}')?.querySelectorAll('[data-step]')[{$targetIndex}]?.scrollIntoView({behavior:'smooth',inline:'nearest',block:'nearest'}))";
@endphp

@if($component->isContained())
<p-card class="primix-wizard-container">
    <template #content>
@endif

<p-stepper
    id="{{ $wizardId }}"
    :value="uiState?.['{{ $stateKey }}'] ?? {{ $defaultStep }}"
    @update:value="uiState['{{ $stateKey }}'] = $event"
    @if($linear) linear @endif
    @if($stepperPt) :pt="{!! \Illuminate\Support\Js::from($stepperPt) !!}" @endif
    class="primix-wizard"
>
    <p-step-list
        :pt="{!! \Illuminate\Support\Js::from($stepListBasePt) !!}"
    >
        @foreach($visibleSteps as $index => $step)
            @php
                $stepHasErrors = isset($errors) && $step->hasChildErrors($errors);
            @endphp
            <p-step
                :value="{{ $index }}"
                data-step="{{ $index }}"
                class="{{ $stepHasErrors ? 'primix-step-has-error' : '' }}"
                :pt="{!! \Illuminate\Support\Js::from($stepBasePt) !!}"
            >
                <div class="flex flex-col items-start gap-0.5 whitespace-nowrap">
                    <span class="inline-flex items-center gap-2 font-medium">
                        @if($step->getIcon())
                            {!! app(\Primix\Support\Icons\IconManager::class)->render($step->getIcon()) !!}
                        @else
                            <p-badge
                                value="{{ $index + 1 }}"
                                @if($step->getBadgeColor()) severity="{{ $step->getBadgeColor() }}" @endif
                            ></p-badge>
                        @endif
                        {{ $step->getLabel() }}
                        @if($stepHasErrors)
                            <span class="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                        @endif
                    </span>
                    @if($step->getDescription())
                        <span class="text-xs text-surface-500 dark:text-surface-400">
                            {{ $step->getDescription() }}
                        </span>
                    @endif
                </div>
            </p-step>
        @endforeach
    </p-step-list>

    <p-step-panels>
        @foreach($visibleSteps as $index => $step)
            <p-step-panel :value="{{ $index }}"
                @if($stepPanelPt) :pt="{!! \Illuminate\Support\Js::from($stepPanelPt) !!}" @endif
            >
                {{ $step }}

                {{-- Navigation buttons --}}
                <div class="primix-wizard-navigation flex justify-between mt-6 pt-4 border-t border-surface-200 dark:border-surface-700"
                    @if($navigationPt) style="{{ is_array($navigationPt) ? collect($navigationPt)->map(fn($v, $k) => is_string($k) ? "$k: $v" : $v)->implode('; ') : $navigationPt }}" @endif
                >
                    <div class="flex gap-2">
                        @if($index > 0)
                            <p-button
                                label="{{ $previousLabel }}"
                                icon="{{ $previousIcon }}"
                                severity="secondary"
                                @click="{{ $goToStep($index - 1) }}"
                            ></p-button>
                        @endif

                        @if($cancelAction)
                            <p-button
                                label="{{ $cancelLabel }}"
                                severity="secondary"
                                text
                                @click="{{ $cancelAction }}()"
                            ></p-button>
                        @endif
                    </div>

                    <div>
                        @if($index < $lastIndex)
                            <p-button
                                label="{{ $nextLabel }}"
                                icon="{{ $nextIcon }}"
                                icon-pos="right"
                                @if($validateOnStepChange)
                                    @click="livue.call('validateWizardStep', {{ $index }}).then(() => { {{ $goToStep($index + 1) }} })"
                                @else
                                    @click="{{ $goToStep($index + 1) }}"
                                @endif
                            ></p-button>
                        @elseif($submitAction)
                            <p-button
                                label="{{ $submitLabel }}"
                                icon="{{ $submitIcon }}"
                                @click="livue.call('{{ $submitAction }}')"
                            ></p-button>
                        @endif
                    </div>
                </div>
            </p-step-panel>
        @endforeach
    </p-step-panels>
</p-stepper>

@if($component->isContained())
    </template>
</p-card>
@endif
