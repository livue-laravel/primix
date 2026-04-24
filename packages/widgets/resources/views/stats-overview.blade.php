@php
    $stats = collect($this->getStats())->map(fn ($stat) => $stat->toArray())->all();
    $gridStyle = $this->getGridStyle();
    $statCardSections = $this->getStatCardSections();
@endphp

@include($this->getWidgetLayoutView('primix-widgets::stats-overview', 'primix-widgets::stats-overview.layouts.classic'))
