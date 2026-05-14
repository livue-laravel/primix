@props(['widgets', 'columns'])

@if(count($widgets) > 0)
    @php($widgetData = property_exists($this, 'tableFilters') ? ['tableFilters' => $this->tableFilters] : [])
    <div class="primix-grid mt-8 lg:mt-10" style="{{ $this->getWidgetsGridStyle($columns) }}">
        @foreach($widgets as $widget)
            @php($widgetClass = $widget instanceof \Primix\Widgets\WidgetConfiguration ? $widget->getWidget() : $widget)
            @php($configuredWidgetData = $widgetData)
            @if(($widget instanceof \Primix\Widgets\WidgetConfiguration) && filled($widget->getVariant()))
                @php($configuredWidgetData['variant'] = $widget->getVariant())
            @endif
            <div class="primix-grid-item"
                @if($this->isWidgetColumnSpanFull($widget)) data-col-span-full @endif
                @if($style = $this->getWidgetGridItemStyle($widget, $columns)) style="{{ $style }}" @endif
            >
                @livue($widgetClass, $configuredWidgetData)
            </div>
        @endforeach
    </div>
@endif
