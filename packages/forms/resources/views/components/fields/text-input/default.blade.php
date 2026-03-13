@php
    $vueActions = [];
    if ($type === 'password' && $revealable) {
        $vueActions[] = ['type' => 'reveal-password'];
    }
@endphp

<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    <primix-text-input
        id="{{ $id }}"
        type="{{ $type }}"
        v-model="{{ $statePath }}"
        @if($disabled) :disabled="true" @endif
        @if($readonly) :readonly="true" @endif
        @error($component->getStatePath()) :invalid="true" @enderror
        @if($placeholder) placeholder="{{ $placeholder }}" @endif
        @if($maxLength) :max-length="{{ $maxLength }}" @endif
        @if($mask) mask="{{ $mask }}" @endif
        @if($autocomplete) autocomplete="{{ $autocomplete }}" @endif
        @if(!empty($vueActions)) :actions='@json($vueActions)' @endif
        @if(!empty($textInputStylePt)) :style-pt="{!! \Illuminate\Support\Js::from($textInputStylePt) !!}" @endif
        {!! $component->getExtraAttributes() !!}
    >
        @if($prefix || $prefixIcon || !empty($prefixActions))
            <template #prefix>
                @if($prefix)
                    <p-input-group-addon @if($prefixAddonPt) :pt="{!! \Illuminate\Support\Js::from($prefixAddonPt) !!}" @endif>{{ $prefix }}</p-input-group-addon>
                @endif
                @if($prefixIcon)
                    <p-input-group-addon @if($prefixAddonPt) :pt="{!! \Illuminate\Support\Js::from($prefixAddonPt) !!}" @endif>
                        {!! app(\Primix\Support\Icons\IconManager::class)->render($prefixIcon) !!}
                    </p-input-group-addon>
                @endif
                @foreach($prefixActions as $action)
                    <p-input-group-addon class="p-0" @if($prefixAddonPt) :pt="{!! \Illuminate\Support\Js::from($prefixAddonPt) !!}" @endif>
                        {{ $action }}
                    </p-input-group-addon>
                @endforeach
            </template>
        @endif

        @if($suffix || $suffixIcon || !empty($suffixActions))
            <template #suffix>
                @foreach($suffixActions as $action)
                    <p-input-group-addon class="p-0" @if($suffixAddonPt) :pt="{!! \Illuminate\Support\Js::from($suffixAddonPt) !!}" @endif>
                        {{ $action }}
                    </p-input-group-addon>
                @endforeach
                @if($suffixIcon)
                    <p-input-group-addon @if($suffixAddonPt) :pt="{!! \Illuminate\Support\Js::from($suffixAddonPt) !!}" @endif>
                        {!! app(\Primix\Support\Icons\IconManager::class)->render($suffixIcon) !!}
                    </p-input-group-addon>
                @endif
                @if($suffix)
                    <p-input-group-addon @if($suffixAddonPt) :pt="{!! \Illuminate\Support\Js::from($suffixAddonPt) !!}" @endif>{{ $suffix }}</p-input-group-addon>
                @endif
            </template>
        @endif
    </primix-text-input>

    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>
</p-float-label>
