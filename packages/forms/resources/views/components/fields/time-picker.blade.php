@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    $timePickerPt = [
        // PrimeVue hardcodes inputmode="none" on the DatePicker input, which
        // suppresses the virtual keyboard on touch devices and forces the
        // overlay picker. Re-enable typing.
        'pcInputText' => ['root' => ['inputmode' => 'text']],
    ];
    if (!empty($style['picker'])) $timePickerPt['root'] = $style['picker'];
@endphp

<p-float-label
    @if($floatLabelPt) :pt="{!! \Illuminate\Support\Js::from($floatLabelPt) !!}" @endif
>
    {{--
        Select-all on focus lets the user overwrite the time by typing.
        The mouseup guard is needed because the browser collapses a selection
        made during the focusing click when that click's mouseup lands.
    --}}
    <p-date-picker
        input-id="{{ $id }}"
        @focus="$event.target.select(); $event.target._pxJustFocused = true"
        @mouseup="if ($event.target._pxJustFocused) { $event.preventDefault(); $event.target._pxJustFocused = false; }"
        :model-value="(function(v) {
            if (!v) return null;
            if (v instanceof Date) return v;
            var parts = String(v).split(':');
            var d = new Date();
            d.setHours(parseInt(parts[0]) || 0, parseInt(parts[1]) || 0, parseInt(parts[2]) || 0, 0);
            return d;
        })({{ $statePath }})"
        @update:model-value="(function(d) {
            if (!d || !(d instanceof Date)) { {{ $statePath }} = null; return; }
            var h = String(d.getHours()).padStart(2, '0');
            var m = String(d.getMinutes()).padStart(2, '0');
            @if($withSeconds)
            var s = String(d.getSeconds()).padStart(2, '0');
            {{ $statePath }} = h + ':' + m + ':' + s;
            @else
            {{ $statePath }} = h + ':' + m;
            @endif
        })($event)"
        time-only
        @if(!$is24Hour) hour-format="12" @endif
        @if($withSeconds) show-seconds @endif
        @if($hourStep !== 1) :step-hour="{{ $hourStep }}" @endif
        @if($minuteStep !== 1) :step-minute="{{ $minuteStep }}" @endif
        @if($secondStep !== 1) :step-second="{{ $secondStep }}" @endif
        @if($disabled) disabled @endif
        @error($component->getStatePath()) invalid @enderror
        @if(!empty($timePickerPt)) :pt="{!! \Illuminate\Support\Js::from($timePickerPt) !!}" @endif
        show-icon
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
