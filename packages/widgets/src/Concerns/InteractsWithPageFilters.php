<?php

namespace Primix\Widgets\Concerns;

use LiVue\Attributes\Reactive;

/**
 * Allows a widget to access the page's table filters.
 *
 * When used on a widget rendered inside a page with HasTable,
 * the $tableFilters property is automatically populated with
 * the current filter values during server-side rendering.
 *
 * The #[Reactive] attribute ensures that when the page re-renders
 * (e.g., after a filter change), the new filter values are synced
 * to the widget and its template is updated automatically.
 */
trait InteractsWithPageFilters
{
    #[Reactive]
    public array $tableFilters = [];
}
