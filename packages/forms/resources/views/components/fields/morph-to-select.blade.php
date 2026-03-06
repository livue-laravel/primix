@php
    $morphTypeColumn = $component->getMorphTypeColumn();
    $morphIdColumn = $component->getMorphIdColumn();

    // The statePath is like "data.commentable", but we need "data.commentable_type" and "data.commentable_id"
    // Get the container state path prefix (e.g., "data")
    $containerStatePath = $component->getContainer()?->getStatePath();

    // Build the actual paths for type and id columns
    $typeStatePath = $containerStatePath ? "{$containerStatePath}.{$morphTypeColumn}" : $morphTypeColumn;
    $idStatePath = $containerStatePath ? "{$containerStatePath}.{$morphIdColumn}" : $morphIdColumn;

    $typeOptions = $component->getTypeOptionsForVue();
    $allOptions = $component->getOptionsForVue();
    $searchable = $component->isSearchable();
    $asyncSearch = $component->isAsyncSearch();
    $searchDebounce = $component->getSearchDebounce();
    $minSearchLength = $component->getMinSearchLength();
    $fieldName = $component->getName();

    // Get form name for async search
    $formName = $component->getContainer()?->getName() ?? 'form';

    // Key prefix for async options storage
    $optionKeyPrefix = "{$formName}.{$fieldName}";

    // Style PassThrough
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $selectPt = [];
    if (!empty($style['select']))  $selectPt['root'] = $style['select'];
    if (!empty($style['overlay'])) $selectPt['overlay'] = $style['overlay'];
    if (!empty($style['option']))  $selectPt['option'] = $style['option'];
    if (!empty($style['filter']))  $selectPt['filterInput'] = $style['filter'];
@endphp

<div class="primix-morph-to-select">
    <div class="flex gap-4">
        {{-- Type Selector --}}
        <div class="w-1/3">
            <p-float-label
                @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
            >
                <p-select
                    key="{{ uniqid('mt-') }}"
                    id="{{ $id }}_type"
                    v-model="{{ $typeStatePath }}"
                    :options="{!! \Illuminate\Support\Js::from($typeOptions) !!}"
                    option-label="label"
                    option-value="value"
                    @if($disabled) disabled @endif
                    @error($typeStatePath) invalid @enderror
                    show-clear
                    @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
                    fluid
                    @update:model-value="{{ $idStatePath }} = null"
                ></p-select>
                <label for="{{ $id }}_type">
                    Type
                </label>
            </p-float-label>
        </div>

        {{-- Record Selector --}}
        <div class="flex-1">
            <p-float-label
                @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
            >
                <p-select
                    key="{{ uniqid('mr-') }}"
                    id="{{ $id }}_id"
                    v-model="{{ $idStatePath }}"
                    @if($asyncSearch)
                        :options="(function() {
                            var t = {{ $typeStatePath }};
                            if (!t) return [];
                            var key = '{{ $optionKeyPrefix }}.' + t;
                            var asyncOpts = asyncSelectOptions[key];
                            if (asyncOpts) return asyncOpts;
                            var initial = {!! \Illuminate\Support\Js::from($allOptions) !!};
                            return initial[t] || [];
                        })()"
                        :loading="(function() {
                            var t = {{ $typeStatePath }};
                            if (!t) return false;
                            return asyncSelectLoading['{{ $optionKeyPrefix }}.' + t] || false;
                        })()"
                        @filter="(e) => {
                            var query = e.value || '';
                            var t = {{ $typeStatePath }};
                            if (!t) return;
                            var key = '{{ $optionKeyPrefix }}.' + t;
                            if (query.length < {{ $minSearchLength }}) {
                                var initial = {!! \Illuminate\Support\Js::from($allOptions) !!};
                                asyncSelectOptions[key] = initial[t] || [];
                                return;
                            }
                            asyncSelectLoading[key] = true;
                            searchMorphToSelectOptions(['{{ $formName }}', '{{ $fieldName }}', t, query], { debounce: {{ $searchDebounce }} })
                                .then(function(opts) {
                                    if (opts) asyncSelectOptions[key] = opts;
                                    asyncSelectLoading[key] = false;
                                })
                                .catch(function() { asyncSelectLoading[key] = false; });
                        }"
                    @else
                        :options="(function() {
                            var opts = {!! \Illuminate\Support\Js::from($allOptions) !!};
                            var t = {{ $typeStatePath }};
                            return t && opts[t] ? opts[t] : [];
                        })()"
                    @endif
                    option-label="label"
                    option-value="value"
                    @if($disabled) disabled @endif
                    @if($searchable) filter @endif
                    @error($idStatePath) invalid @enderror
                    :disabled="!{{ $typeStatePath }}"
                    show-clear
                    @if(!empty($selectPt)) :pt="{!! \Illuminate\Support\Js::from($selectPt) !!}" @endif
                    fluid
                    {!! $component->getExtraAttributes() !!}
                ></p-select>

                <label for="{{ $id }}_id">
                    {{ $label }}
                    @if($required)
                        <span class="text-red-500">*</span>
                    @endif
                </label>
            </p-float-label>
        </div>
    </div>

    @error($typeStatePath)
        <small class="text-red-500">{{ $message }}</small>
    @enderror

    @error($idStatePath)
        <small class="text-red-500">{{ $message }}</small>
    @enderror
</div>
