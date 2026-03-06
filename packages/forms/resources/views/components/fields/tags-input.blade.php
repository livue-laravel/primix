@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $tagsStylePt = \Illuminate\Support\Arr::only($style, ['input', 'chip']);
@endphp

<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <primix-tags-input
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($disabled) :disabled="true" @endif
        @error($component->getStatePath()) :invalid="true" @enderror
        @if(!empty($suggestions)) :suggestions='@json($suggestions)' @endif
        @if($separator) separator="{{ $separator }}" @endif
        @if($maxItems) :max-items="{{ $maxItems }}" @endif
        @if($allowDuplicates) :allow-duplicates="true" @endif
        @if($addOnBlur) :add-on-blur="true" @endif
        @if($placeholder) placeholder="{{ $placeholder }}" @endif
        @if(!empty($tagsStylePt)) :style-pt="{!! \Illuminate\Support\Js::from($tagsStylePt) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    ></primix-tags-input>
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</p-float-label>
