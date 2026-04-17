<div class="flex flex-col gap-4">
    @foreach($this->getChildWidgets() as $child)
        @php($childClass = $child instanceof \Primix\Widgets\WidgetConfiguration ? $child->getWidget() : $child)
        @livue($childClass)
    @endforeach
</div>
