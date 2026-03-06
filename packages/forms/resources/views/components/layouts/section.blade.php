@php
    $style = $style ?? [];
    $panelPt = [];
    if (!empty($style['panel']))   $panelPt['root'] = $style['panel'];
    if (!empty($style['header']))  $panelPt['header'] = $style['header'];
    if (!empty($style['content'])) $panelPt['content'] = $style['content'];
@endphp

@if($component->isContained())
<p-panel
    class="primix-section"
    @if($heading) header="{{ $heading }}" @endif
    @if($collapsible) toggleable @endif
    @if($collapsed) collapsed @endif
    @if(!empty($panelPt)) :pt="{!! \Illuminate\Support\Js::from($panelPt) !!}" @endif
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
</p-panel>
@else
<div class="primix-section">
    @if($heading)
        <div class="mb-4">
            <h3 class="font-semibold">{{ $heading }}</h3>
        </div>
    @endif

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
</div>
@endif
