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
    $initialOptionsJs = \Illuminate\Support\Js::from($initialOptions);

    // Style PassThrough
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $selectPt = [];
    if (!empty($style['select']))  $selectPt['root'] = $style['select'];
    if (!empty($style['overlay'])) $selectPt['overlay'] = $style['overlay'];
    if (!empty($style['option']))  $selectPt['option'] = $style['option'];
    if (!empty($style['filter']))  $selectPt['filterInput'] = $style['filter'];
    if (!empty($style['chip']))    $selectPt['chip'] = $style['chip'];

    // Async filter handler — shared between p-select and p-multi-select
    $filterHandlerJs = null;
    $changeHandlerJs = null;

    if ($asyncSearch) {
        $filterHandlerJs = "(e) => {\n"
            . "    var query = e.value || '';\n"
            . "    if (query.length < " . $minSearchLength . ") {\n"
            . "        var baseOpts = " . $initialOptionsJs . ";\n"
            . "        var selected = " . $statePath . ";\n"
            . "        var curOpts = asyncSelectOptions['" . $optionKey . "'] || [];\n"
            . "        if (selected && curOpts.length) {\n"
            . "            var selArr = Array.isArray(selected) ? selected : [selected];\n"
            . "            var baseValues = baseOpts.map(function(o) { return o.value; });\n"
            . "            curOpts.forEach(function(o) {\n"
            . "                if (selArr.indexOf(o.value) !== -1 && baseValues.indexOf(o.value) === -1) baseOpts.push(o);\n"
            . "            });\n"
            . "        }\n"
            . "        asyncSelectOptions['" . $optionKey . "'] = baseOpts;\n"
            . "        return;\n"
            . "    }\n"
            . "    asyncSelectLoading['" . $optionKey . "'] = true;\n"
            . "    searchSelectOptions(['" . $formName . "', '" . $fieldName . "', query], { debounce: " . $searchDebounce . " })\n"
            . "        .then(function(opts) {\n"
            . "            if (opts) {\n"
            . ($createMissingOption
                ? "                if (query && !opts.some(function(o) { return o.label.toLowerCase() === query.toLowerCase(); })) {\n"
                . "                    opts = opts.concat([{ label: '" . addslashes(__('Create')) . " \\u0022' + query + '\\u0022', value: '__quick_create__:' + query }]);\n"
                . "                }\n"
                : "")
            . "                asyncSelectOptions['" . $optionKey . "'] = opts;\n"
            . "            }\n"
            . "            asyncSelectLoading['" . $optionKey . "'] = false;\n"
            . "        })\n"
            . "        .catch(function() { asyncSelectLoading['" . $optionKey . "'] = false; });\n"
            . "}";
    }

    if ($createMissingOption) {
        if ($multiple) {
            $changeHandlerJs = "(e) => {\n"
                . "    var val = e.value;\n"
                . "    if (Array.isArray(val)) {\n"
                . "        var createItem = val.find(function(v) { return typeof v === 'string' && v.startsWith('__quick_create__:'); });\n"
                . "        if (createItem) {\n"
                . "            var q = createItem.slice('__quick_create__:'.length);\n"
                . "            " . $statePath . " = val.filter(function(v) { return typeof v !== 'string' || !v.startsWith('__quick_create__:'); });\n"
                . "            if (q) createMissingSelectOption('" . $formName . "', '" . $fieldName . "', q);\n"
                . "        }\n"
                . "    }\n"
                . "}";
        } else {
            $changeHandlerJs = "(e) => {\n"
                . "    if (typeof e.value === 'string' && e.value.startsWith('__quick_create__:')) {\n"
                . "        var q = e.value.slice('__quick_create__:'.length);\n"
                . "        " . $statePath . " = null;\n"
                . "        if (q) createMissingSelectOption('" . $formName . "', '" . $fieldName . "', q);\n"
                . "    }\n"
                . "}";
        }
    }
@endphp

@if($isTree)
    {{-- Tree Select mode --}}
    <p-float-label
        @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
    >
        <p-tree-select
            id="{{ $id }}"
            v-model="{{ $statePath }}"
            :options="{!! $initialOptionsJs !!}"
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
            :options="{!! $initialOptionsJs !!}"
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
            :options="{!! $initialOptionsJs !!}"
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
                :suggestions="{!! $initialOptionsJs !!}"
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
                        :options="asyncSelectOptions['{{ $optionKey }}'] || {!! $initialOptionsJs !!}"
                        :loading="asyncSelectLoading['{{ $optionKey }}'] || false"
                        @filter="{!! $filterHandlerJs !!}"
                    @else
                        :options="{!! $initialOptionsJs !!}"
                    @endif
                    option-label="label"
                    option-value="value"
                    @if($disabled) disabled @endif
                    @if($searchable) filter @endif
                    @error($component->getStatePath()) invalid @enderror
                    display="chip"
                    @if($changeHandlerJs)
                        @change="{!! $changeHandlerJs !!}"
                    @endif
                    @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
                    fluid
                    {!! $component->getExtraAttributes() !!}
                >
                    @if($createMissingOption)
                        @include('primix-forms::components.fields.partials._select-quick-create-option')
                    @endif
                </p-multi-select>
            @else
                <p-select
                    key="{{ uniqid('s-') }}"
                    id="{{ $id }}"
                    v-model="{{ $statePath }}"
                    option-disabled="disabled"
                    @if($asyncSearch)
                        :options="asyncSelectOptions['{{ $optionKey }}'] || {!! $initialOptionsJs !!}"
                        :loading="asyncSelectLoading['{{ $optionKey }}'] || false"
                        @filter="{!! $filterHandlerJs !!}"
                    @else
                        :options="{!! $initialOptionsJs !!}"
                    @endif
                    option-label="label"
                    option-value="value"
                    @if($disabled) disabled @endif
                    @if($searchable) filter @endif
                    @error($component->getStatePath()) invalid @enderror
                    show-clear
                    @if($changeHandlerJs)
                        @change="{!! $changeHandlerJs !!}"
                    @endif
                    @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
                    fluid
                    {!! $component->getExtraAttributes() !!}
                >
                    @if($createMissingOption)
                        @include('primix-forms::components.fields.partials._select-quick-create-option')
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
