@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;
    $textareaPt = !empty($style['textarea']) ? ['root' => $style['textarea']] : null;
@endphp

<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <p-textarea
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        @if($disabled) disabled @endif
        @if($readonly) readonly @endif
        @error($component->getStatePath()) invalid @enderror
        @if($rows) rows="{{ $rows }}" @endif
        @if($maxLength) maxlength="{{ $maxLength }}" @endif
        @if($textareaPt) :pt="{!! \Illuminate\Support\Js::from($textareaPt) !!}" @endif
        auto-resize
        fluid
        {!! $component->getExtraAttributes() !!}
    ></p-textarea>
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</p-float-label>
