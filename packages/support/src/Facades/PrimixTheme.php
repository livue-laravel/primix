<?php

namespace Primix\Support\Facades;

use Illuminate\Support\Facades\Facade;
use Primix\Support\Theme\ThemeManager;

/**
 * @method static void apply(object $panel)
 *
 * @see \Primix\Support\Theme\ThemeManager
 */
class PrimixTheme extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ThemeManager::class;
    }
}
