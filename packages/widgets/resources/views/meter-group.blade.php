@php
    $meters = collect($this->getMeters())->map(fn ($meter) => $meter->toArray())->all();
@endphp

@include($this->getWidgetLayoutView('primix-widgets::meter-group', 'primix-widgets::meter-group.layouts.classic'))
