<?php

namespace Primix\Facades;

use Illuminate\Support\Facades\Facade;
use Primix\PanelRegistry;

/**
 * @method static void register(\Primix\Panel $panel)
 * @method static \Primix\Panel|null get(string $id)
 * @method static array all()
 * @method static void setCurrentPanel(string $id)
 * @method static \Primix\Panel|null getCurrentPanel()
 * @method static string|null getCurrentPanelId()
 * @method static \Primix\Panel|null getDefault()
 * @method static string getRoutePrefix(?string $panelId = null)
 * @method static void configurePanelUsing(\Closure $callback)
 * @method static void enableCrossPanelSearch(bool|\Closure $condition = true)
 * @method static bool isCrossPanelSearchEnabled()
 * @method static void globalSearchMode(\Primix\GlobalSearch\GlobalSearchMode|\Closure $mode)
 * @method static \Primix\GlobalSearch\GlobalSearchMode getGlobalSearchMode()
 *
 * @see \Primix\PanelRegistry
 */
class Primix extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return PanelRegistry::class;
    }
}
