@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $datePickerPt = [];
    if (!empty($style['picker']))    $datePickerPt['root'] = $style['picker'];
    if (!empty($style['icon']))      $datePickerPt['inputIcon'] = $style['icon'];
    if (!empty($style['buttonBar'])) $datePickerPt['buttonbar'] = $style['buttonBar'];

    $isInline = $component->isInline();
@endphp

@if($isInline)
    <div>
        <label for="{{ $id }}" class="block mb-2 font-light text-xs ml-3 text-surface-700 dark:text-surface-200">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
        <p-date-picker
            id="{{ $id }}"
            :model-value="(function(v) {
                if (!v) return null;
                if (Array.isArray(v)) return v.map(function(d) { return d && !(d instanceof Date) ? new Date(String(d).replace(' ', 'T')) : d; });
                return v instanceof Date ? v : new Date(String(v).replace(' ', 'T'));
            })({{ $statePath }})"
            @update:model-value="(function(d) {
                function fmt(dt) {
                    if (!dt || !(dt instanceof Date) || isNaN(dt.getTime())) return null;
                    var s = dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0') + '-' + String(dt.getDate()).padStart(2,'0');
                    @if($component->showsTime()) s += ' ' + String(dt.getHours()).padStart(2,'0') + ':' + String(dt.getMinutes()).padStart(2,'0'); @endif
                    return s;
                }
                if (!d) { {{ $statePath }} = null; return; }
                if (Array.isArray(d)) { {{ $statePath }} = d.map(fmt); return; }
                {{ $statePath }} = fmt(d);
            })($event)"
            @if($disabled) disabled @endif
            @error($component->getStatePath()) invalid @enderror
            @if($format) date-format="{{ $format }}" @endif
            @if($component->getDateView()) view="{{ $component->getDateView() }}" @endif
            @if($component->isRange()) selection-mode="range" @endif
            @if($component->showsTime()) show-time @endif
            @if($component->showsTime() && $component->getHourFormat() === '12') hour-format="12" @endif
            inline
            @if(!empty($datePickerPt)) :pt="{!! \Illuminate\Support\Js::from($datePickerPt) !!}" @endif
            fluid
            {!! $component->getExtraAttributes() !!}
        ></p-date-picker>
    </div>
@else
    <p-float-label
        @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
    >
        <p-date-picker
            id="{{ $id }}"
            :model-value="(function(v) {
                if (!v) return null;
                if (Array.isArray(v)) return v.map(function(d) { return d && !(d instanceof Date) ? new Date(String(d).replace(' ', 'T')) : d; });
                return v instanceof Date ? v : new Date(String(v).replace(' ', 'T'));
            })({{ $statePath }})"
            @update:model-value="(function(d) {
                function fmt(dt) {
                    if (!dt || !(dt instanceof Date) || isNaN(dt.getTime())) return null;
                    var s = dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0') + '-' + String(dt.getDate()).padStart(2,'0');
                    @if($component->showsTime()) s += ' ' + String(dt.getHours()).padStart(2,'0') + ':' + String(dt.getMinutes()).padStart(2,'0'); @endif
                    return s;
                }
                if (!d) { {{ $statePath }} = null; return; }
                if (Array.isArray(d)) { {{ $statePath }} = d.map(fmt); return; }
                {{ $statePath }} = fmt(d);
            })($event)"
            @if($disabled) disabled @endif
            @error($component->getStatePath()) invalid @enderror
            @if($format) date-format="{{ $format }}" @endif
            @if($component->getDateView()) view="{{ $component->getDateView() }}" @endif
            @if($component->isRange()) selection-mode="range" @endif
            @if($component->showsTime()) show-time @endif
            @if($component->showsTime() && $component->getHourFormat() === '12') hour-format="12" @endif
            @if(!empty($datePickerPt)) :pt="{!! \Illuminate\Support\Js::from($datePickerPt) !!}" @endif
            show-icon
            show-button-bar
            fluid
            {!! $component->getExtraAttributes() !!}
        ></p-date-picker>
        <label for="{{ $id }}">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    </p-float-label>
@endif
