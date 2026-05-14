<div class="primix-grid" style="{{ $this->getColumnsStyle() }}">
    @foreach($this->getChildWidgets() as $child)
        @php($childClass = $child instanceof \Primix\Widgets\WidgetConfiguration ? $child->getWidget() : $child)
        <div class="primix-grid-item"
            @if($this->isChildColumnSpanFull($child)) data-col-span-full @endif
            @if($style = $this->getChildGridItemStyle($child)) style="{{ $style }}" @endif
        >
            @livue($childClass)
        </div>
    @endforeach
</div>
