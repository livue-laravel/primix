@php
    $isTree = $component->isTree();
    $isCascading = $component->isCascading();
    $isListbox = $component->isListbox();
    $isAutoComplete = $component->isAutocomplete();
    $asyncSearch = $component->isAsyncSearch();
    $searchDebounce = $component->getSearchDebounce();
    $minSearchLength = $component->getMinSearchLength();
    $fieldName = $component->getName();
    $hasCreateOption = $component->hasCreateOptionForm();
    $hasEditOption = $component->hasEditOptionForm();
    $createMissingOption = $component->hasCreateMissingOption();
    $hasActions = $hasCreateOption || $hasEditOption;

    // Get form name for the search method call
    $formName = $component->getContainer()?->getName() ?? 'form';

    // Key for async options storage
    $optionKey = "{$formName}.{$fieldName}";

    // Initial options
    $initialOptions = $component->getOptionsForVue();

    // Style PassThrough
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $selectPt = [];
    if (!empty($style['select']))  $selectPt['root'] = $style['select'];
    if (!empty($style['overlay'])) $selectPt['overlay'] = $style['overlay'];
    if (!empty($style['option']))  $selectPt['option'] = $style['option'];
    if (!empty($style['filter']))  $selectPt['filterInput'] = $style['filter'];
    if (!empty($style['chip']))    $selectPt['chip'] = $style['chip'];
@endphp

@if($isTree)
    {{-- Tree Select mode --}}
    <p-float-label
        @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
    >
        <p-tree-select
            id="{{ $id }}"
            v-model="{{ $statePath }}"
            :options="{!! \Illuminate\Support\Js::from($initialOptions) !!}"
            option-disabled="disabled"
            @if($disabled) disabled @endif
            @if($searchable) filter @endif
            @if($multiple) selection-mode="checkbox" @else selection-mode="single" @endif
            @error($component->getStatePath()) invalid @enderror
            @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
            fluid
            {!! $component->getExtraAttributes() !!}
        ></p-tree-select>
        <label for="{{ $id }}">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    </p-float-label>
@elseif($isCascading)
    {{-- Cascade Select mode --}}
    <p-float-label
        @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
    >
        <p-cascade-select
            id="{{ $id }}"
            v-model="{{ $statePath }}"
            :options="{!! \Illuminate\Support\Js::from($initialOptions) !!}"
            option-label="label"
            option-value="value"
            option-group-label="label"
            option-group-children="children"
            option-disabled="disabled"
            @if($disabled) disabled @endif
            @error($component->getStatePath()) invalid @enderror
            @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
            fluid
            {!! $component->getExtraAttributes() !!}
        ></p-cascade-select>
        <label for="{{ $id }}">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    </p-float-label>
@elseif($isListbox)
    {{-- Listbox mode --}}
    <div>
        @if($label)
            <label for="{{ $id }}" class="block mb-2 font-medium text-surface-700 dark:text-surface-200">
                {{ $label }}
                @if($required)
                    <span class="text-red-500">*</span>
                @endif
            </label>
        @endif
        <p-listbox
            id="{{ $id }}"
            v-model="{{ $statePath }}"
            :options="{!! \Illuminate\Support\Js::from($initialOptions) !!}"
            option-label="label"
            option-value="value"
            option-disabled="disabled"
            @if($disabled) disabled @endif
            @if($multiple) multiple @endif
            @if($searchable) filter @endif
            @error($component->getStatePath()) invalid @enderror
            @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
            {!! $component->getExtraAttributes() !!}
        ></p-listbox>
    </div>
@elseif($isAutoComplete)
    {{-- AutoComplete mode --}}
    <p-float-label
        @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
    >
        <p-auto-complete
            id="{{ $id }}"
            v-model="{{ $statePath }}"
            option-disabled="disabled"
            @if($asyncSearch)
                :suggestions="asyncSelectOptions['{{ $optionKey }}'] || []"
                @complete="(e) => {
                    var query = e.query || '';
                    if (query.length < {{ $minSearchLength }}) return;
                    searchSelectOptions(['{{ $formName }}', '{{ $fieldName }}', query], { debounce: {{ $searchDebounce }} })
                        .then(function(opts) {
                            if (opts) asyncSelectOptions['{{ $optionKey }}'] = opts;
                        });
                }"
                option-label="label"
            @else
                :suggestions="{!! \Illuminate\Support\Js::from($initialOptions) !!}"
                option-label="label"
            @endif
            @if($disabled) disabled @endif
            @if($multiple) multiple @endif
            @error($component->getStatePath()) invalid @enderror
            @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
            fluid
            {!! $component->getExtraAttributes() !!}
        ></p-auto-complete>
        <label for="{{ $id }}">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    </p-float-label>
@else
<div class="{{ $hasActions ? 'flex items-end gap-2' : '' }}">
    <div class="{{ $hasActions ? 'flex-1 min-w-0' : '' }}">
        <p-float-label
            @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
        >
            @if($multiple)
                <p-multi-select
                    key="{{ uniqid('ms-') }}"
                    id="{{ $id }}"
                    v-model="{{ $statePath }}"
                    option-disabled="disabled"
                    @if($asyncSearch)
                        :options="asyncSelectOptions['{{ $optionKey }}'] || {!! \Illuminate\Support\Js::from($initialOptions) !!}"
                        :loading="asyncSelectLoading['{{ $optionKey }}'] || false"
                        @filter="(e) => {
                            var query = e.value || '';
                            @if($createMissingOption) asyncSelectSearchQuery['{{ $optionKey }}'] = query; @endif
                            if (query.length < {{ $minSearchLength }}) {
                                asyncSelectOptions['{{ $optionKey }}'] = {!! \Illuminate\Support\Js::from($initialOptions) !!};
                                return;
                            }
                            asyncSelectLoading['{{ $optionKey }}'] = true;
                            searchSelectOptions(['{{ $formName }}', '{{ $fieldName }}', query], { debounce: {{ $searchDebounce }} })
                                .then(function(opts) {
                                    if (opts) {
                                        @if($createMissingOption)
                                        var q = asyncSelectSearchQuery['{{ $optionKey }}'] || '';
                                        if (q && !opts.some(function(o) { return o.label.toLowerCase() === q.toLowerCase(); })) {
                                            opts = opts.concat([{ label: '{{ __("Create") }} \u0022' + q + '\u0022', value: '__quick_create__' }]);
                                        }
                                        @endif
                                        asyncSelectOptions['{{ $optionKey }}'] = opts;
                                    }
                                    asyncSelectLoading['{{ $optionKey }}'] = false;
                                })
                                .catch(function() { asyncSelectLoading['{{ $optionKey }}'] = false; });
                        }"
                    @else
                        :options="{!! \Illuminate\Support\Js::from($initialOptions) !!}"
                    @endif
                    option-label="label"
                    option-value="value"
                    @if($disabled) disabled @endif
                    @if($searchable) filter @endif
                    @error($component->getStatePath()) invalid @enderror
                    display="chip"
                    @if($createMissingOption)
                        @change="(e) => {
                            var val = e.value;
                            if (Array.isArray(val) && val.indexOf('__quick_create__') !== -1) {
                                {{ $statePath }} = val.filter(function(v) { return v !== '__quick_create__'; });
                                createMissingSelectOption('{{ $formName }}', '{{ $fieldName }}', asyncSelectSearchQuery['{{ $optionKey }}']);
                            }
                        }"
                    @endif
                    @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
                    fluid
                    {!! $component->getExtraAttributes() !!}
                >
                    @if($createMissingOption)
                        <template #option="slotProps">
                            <div v-if="slotProps.option.value === '__quick_create__'" class="flex items-center gap-2 text-primary-500 font-medium">
                                <i class="pi pi-plus text-sm"></i>
                                <span v-text="slotProps.option.label"></span>
                            </div>
                            <span v-else v-text="slotProps.option.label"></span>
                        </template>
                    @endif
                </p-multi-select>
            @else
                <p-select
                    key="{{ uniqid('s-') }}"
                    id="{{ $id }}"
                    v-model="{{ $statePath }}"
                    option-disabled="disabled"
                    @if($asyncSearch)
                        :options="asyncSelectOptions['{{ $optionKey }}'] || {!! \Illuminate\Support\Js::from($initialOptions) !!}"
                        :loading="asyncSelectLoading['{{ $optionKey }}'] || false"
                        @filter="(e) => {
                            var query = e.value || '';
                            @if($createMissingOption) asyncSelectSearchQuery['{{ $optionKey }}'] = query; @endif
                            if (query.length < {{ $minSearchLength }}) {
                                asyncSelectOptions['{{ $optionKey }}'] = {!! \Illuminate\Support\Js::from($initialOptions) !!};
                                return;
                            }
                            asyncSelectLoading['{{ $optionKey }}'] = true;
                            searchSelectOptions(['{{ $formName }}', '{{ $fieldName }}', query], { debounce: {{ $searchDebounce }} })
                                .then(function(opts) {
                                    if (opts) {
                                        @if($createMissingOption)
                                        var q = asyncSelectSearchQuery['{{ $optionKey }}'] || '';
                                        if (q && !opts.some(function(o) { return o.label.toLowerCase() === q.toLowerCase(); })) {
                                            opts = opts.concat([{ label: '{{ __("Create") }} \u0022' + q + '\u0022', value: '__quick_create__' }]);
                                        }
                                        @endif
                                        asyncSelectOptions['{{ $optionKey }}'] = opts;
                                    }
                                    asyncSelectLoading['{{ $optionKey }}'] = false;
                                })
                                .catch(function() { asyncSelectLoading['{{ $optionKey }}'] = false; });
                        }"
                    @else
                        :options="{!! \Illuminate\Support\Js::from($initialOptions) !!}"
                    @endif
                    option-label="label"
                    option-value="value"
                    @if($disabled) disabled @endif
                    @if($searchable) filter @endif
                    @error($component->getStatePath()) invalid @enderror
                    show-clear
                    @if($createMissingOption)
                        @change="(e) => {
                            if (e.value === '__quick_create__') {
                                {{ $statePath }} = null;
                                createMissingSelectOption('{{ $formName }}', '{{ $fieldName }}', asyncSelectSearchQuery['{{ $optionKey }}']);
                            }
                        }"
                    @endif
                    @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
                    fluid
                    {!! $component->getExtraAttributes() !!}
                >
                    @if($createMissingOption)
                        <template #option="slotProps">
                            <div v-if="slotProps.option.value === '__quick_create__'" class="flex items-center gap-2 text-primary-500 font-medium">
                                <i class="pi pi-plus text-sm"></i>
                                <span v-text="slotProps.option.label"></span>
                            </div>
                            <span v-else v-text="slotProps.option.label"></span>
                        </template>
                    @endif
                </p-select>
            @endif
            <label for="{{ $id }}">
                {{ $label }}
                @if($required)
                    <span class="text-red-500">*</span>
                @endif
            </label>
        </p-float-label>
    </div>

    @if($hasActions)
        <div class="flex gap-1 shrink-0">
            @if($hasEditOption)
                @php
                    $editVisibleExpr = $multiple
                        ? "{$statePath} && {$statePath}.length > 0"
                        : $statePath;
                @endphp
                <p-button
                    v-if="{{ $editVisibleExpr }}"
                    icon="pi pi-pencil"
                    severity="secondary"
                    outlined
                    @click="openFormFieldAction('{{ $formName }}', '{{ $fieldName }}', 'edit')"
                    :style="{ height: '2.5rem', width: '2.5rem' }"
                    @if($disabled) disabled @endif
                ></p-button>
            @endif
            @if($hasCreateOption)
                <p-button
                    icon="pi pi-plus"
                    severity="secondary"
                    outlined
                    @click="openFormFieldAction('{{ $formName }}', '{{ $fieldName }}', 'create')"
                    :style="{ height: '2.5rem', width: '2.5rem' }"
                    @if($disabled) disabled @endif
                ></p-button>
            @endif
        </div>
    @endif
</div>
@endif
