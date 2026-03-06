@php
    $style = $style ?? [];
@endphp

<div class="primix-rich-editor-wrapper">
    @if($label && !$component->isLabelHidden())
        <label for="{{ $id }}" class="block mb-1 font-medium text-surface-700 dark:text-surface-300">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    @endif
    <primix-rich-editor
        id="{{ $id }}"
        v-model="{{ $statePath }}"
        :toolbar-buttons="{!! \Illuminate\Support\Js::from($toolbarButtons) !!}"
        :disabled-toolbar-buttons="{!! \Illuminate\Support\Js::from($disabledToolbarButtons) !!}"
        @if($disabled) :disabled="true" @endif
        @error($component->getStatePath()) :invalid="true" @enderror
        @if($maxLength) :max-length="{{ $maxLength }}" @endif
        @if($editorHeight) editor-height="{{ $editorHeight }}" @endif
        @if(!empty($style)) :style-pt="{!! \Illuminate\Support\Js::from($style) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    ></primix-rich-editor>
</div>
