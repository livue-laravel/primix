@php
    $style = $style ?? [];
    $tabsPt = !empty($style['tabs']) ? ['root' => $style['tabs']] : null;
    $tabListPt = !empty($style['tabList']) ? ['root' => $style['tabList']] : null;
    $tabPt = !empty($style['tab']) ? ['root' => $style['tab']] : null;
    $tabPanelPt = !empty($style['tabPanel']) ? ['root' => $style['tabPanel']] : null;

    $defaultTab = $activeTab ?? $component->getTabs()[0]?->getName();
    $tabStateKey = $component->getLabel()
        ?? implode('_', array_map(fn($t) => $t->getName(), $component->getTabs()));
@endphp

@if($component->isAccordion())
    {{-- Accordion mode --}}
    @php
        $multipleExpand = $component->isMultipleExpand();
        $defaultValues = $defaultTab ? [$defaultTab] : [$component->getTabs()[0]?->getName()];
        $accordionValue = $multipleExpand ? $defaultValues : $defaultTab;
    @endphp
    @if($component->isContained())
    <p-card class="primix-tabs-container">
        <template #content>
    @endif
    <p-accordion
        :value="{{ \Illuminate\Support\Js::from($accordionValue) }}"
        @if($multipleExpand) multiple @endif
        class="primix-accordion"
    >
        @foreach($component->getTabs() as $tab)
            @if(!$tab->isHidden())
                <p-accordion-panel value="{{ $tab->getName() }}">
                    <p-accordion-header>
                        @if($tab->getIcon())
                            {!! app(\Primix\Support\Icons\IconManager::class)->render($tab->getIcon(), 'mr-2') !!}
                        @endif
                        {{ $tab->getLabel() }}
                        @if($tab->getBadge())
                            <p-badge value="{{ $tab->getBadge() }}" class="ml-2"></p-badge>
                        @endif
                    </p-accordion-header>
                    <p-accordion-content>
                        {{ $tab }}
                    </p-accordion-content>
                </p-accordion-panel>
            @endif
        @endforeach
    </p-accordion>
    @if($component->isContained())
        </template>
    </p-card>
    @endif
@else
@if($component->isContained())
<p-card class="primix-tabs-container">
    <template #content>
@endif
<p-tabs
    :value="uiState?.['{{ $tabStateKey }}'] ?? '{{ $defaultTab }}'"
    @update:value="uiState['{{ $tabStateKey }}'] = $event"
    class="primix-tabs @if($component->isVertical()) primix-tabs-vertical @endif"
    @if($tabsPt) :pt="{!! \Illuminate\Support\Js::from($tabsPt) !!}" @endif
>
    <p-tab-list
        @if($tabListPt) :pt="{!! \Illuminate\Support\Js::from($tabListPt) !!}" @endif
    >
        @foreach($component->getTabs() as $tab)
            @if(!$tab->isHidden())
                @php
                    $tabHasErrors = isset($errors) && $tab->hasChildErrors($errors);
                @endphp
                <p-tab value="{{ $tab->getName() }}"
                    class="{{ $tabHasErrors ? 'primix-tab-has-error' : '' }}"
                    @if($tabPt) :pt="{!! \Illuminate\Support\Js::from($tabPt) !!}" @endif
                >
                    @if($tab->getIcon())
                        {!! app(\Primix\Support\Icons\IconManager::class)->render($tab->getIcon(), 'mr-2') !!}
                    @endif
                    {{ $tab->getLabel() }}
                    @if($tabHasErrors)
                        <span class="primix-tab-error-dot"></span>
                    @endif
                    @if($tab->getBadge())
                        <p-badge value="{{ $tab->getBadge() }}" class="ml-2"></p-badge>
                    @endif
                </p-tab>
            @endif
        @endforeach
    </p-tab-list>
    <p-tab-panels>
        @foreach($component->getTabs() as $tab)
            @if(!$tab->isHidden())
                <p-tab-panel value="{{ $tab->getName() }}"
                    @if($tabPanelPt) :pt="{!! \Illuminate\Support\Js::from($tabPanelPt) !!}" @endif
                >
                    {{ $tab }}
                </p-tab-panel>
            @endif
        @endforeach
    </p-tab-panels>
</p-tabs>
@if($component->isContained())
    </template>
</p-card>
@endif
@endif
