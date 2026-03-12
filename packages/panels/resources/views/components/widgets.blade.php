@props(['widgets', 'columns'])

@if(count($widgets) > 0)
    @php($widgetData = property_exists($this, 'tableFilters') ? ['tableFilters' => $this->tableFilters] : [])
    <div class="primix-grid mt-6" style="{{ $this->getWidgetsGridStyle($columns) }}">
        @foreach($widgets as $widget)
            @php($widgetClass = $widget instanceof \Primix\Widgets\WidgetConfiguration ? $widget->getWidget() : $widget)
            <div class="primix-grid-item"
                @if($this->isWidgetColumnSpanFull($widget)) data-col-span-full @endif
                @if($style = $this->getWidgetGridItemStyle($widget)) style="{{ $style }}" @endif
            >
                @livue($widgetClass, $widgetData)
            </div>
        @endforeach
    </div>
@endif
