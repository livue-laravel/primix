@php
    $style = $style ?? [];
    $fieldsetPt = [];
    if (!empty($style['fieldset'])) $fieldsetPt['root'] = $style['fieldset'];
    if (!empty($style['legend']))   $fieldsetPt['legend'] = $style['legend'];
    if (!empty($style['content']))  $fieldsetPt['content'] = $style['content'];
@endphp

<p-fieldset
    class="primix-fieldset"
    @if($legend) legend="{{ $legend }}" @endif
    @if($toggleable) toggleable @endif
    @if($collapsed) collapsed @endif
    @if(!empty($fieldsetPt)) :pt="{!! \Illuminate\Support\Js::from($fieldsetPt) !!}" @endif
>
    <div class="primix-grid" style="{{ $component->getGridStyle() }}">
        @foreach($component->getSchema() as $child)
            <div class="primix-grid-item"
                @if(method_exists($child, 'getGridItemStyle') && $child->getGridItemStyle()) style="{{ $child->getGridItemStyle() }}" @endif
                @if(method_exists($child, 'isColumnSpanFull') && $child->isColumnSpanFull()) data-col-span-full @endif
            >
                {{ $child }}
            </div>
        @endforeach
    </div>
</p-fieldset>
