@php
    $style = $style ?? [];
    $floatLabelPt = !empty($style['label']) ? ['root' => $style['label']] : null;

    // In 24h mode typing goes through a digit mask (auto ':'), so the mobile
    // numeric keypad is enough; the mask placeholder shows the expected shape.
    // PrimeVue hardcodes inputmode="none" on the DatePicker input, which
    // suppresses the virtual keyboard on touch devices — override it.
    $masked = $is24Hour;
    $maskDigits = $withSeconds ? 6 : 4;

    $timePickerPt = [
        'pcInputText' => ['root' => array_merge(
            ['inputmode' => $masked ? 'numeric' : 'text'],
            $masked ? ['placeholder' => $withSeconds ? '__:__:__' : '__:__'] : [],
        )],
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
        @if($masked)
        {{--
            Digit mask: strip anything that isn't a digit, pad a leading hour
            digit > 2 (9 → 09), insert ':' between pairs. Rewriting the value
            re-dispatches a synthetic input event so PrimeVue parses the masked
            text; the isTrusted guard keeps that from recursing.
        --}}
        {{--
            Only whitelisted globals exist in Vue template scope: no
            HTMLInputElement/Event constructors here (tagName check and
            e.constructor take their place).
        --}}
        @input="(function(e) {
            var t = e.target;
            if (!t || t.tagName !== 'INPUT' || !e.isTrusted) return;
            var digits = t.value.replace(/\D/g, '').slice(0, {{ $maskDigits }});
            if (digits.length >= 1 && digits[0] > '2') digits = ('0' + digits).slice(0, {{ $maskDigits }});
            var masked = (digits.match(/.{1,2}/g) || []).join(':');
            if (/[:.]$/.test(t.value) && digits.length >= 2 && digits.length < {{ $maskDigits }} && digits.length % 2 === 0) masked += ':';
            if (masked !== t.value) {
                t.value = masked;
                t.setSelectionRange(masked.length, masked.length);
                t.dispatchEvent(new e.constructor('input', { bubbles: true }));
            }
        })($event)"
        @endif
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
