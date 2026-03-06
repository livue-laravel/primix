<?php

namespace Primix\Support\Facades;

use Illuminate\Support\Facades\Facade;
use Primix\Support\Icons\IconManager;

/**
 * @method static string render(string $icon, ?string $class = null, ?string $size = null)
 * @method static \Primix\Support\Icons\IconSet|null resolveSet(string $icon)
 * @method static static registerSet(\Primix\Support\Icons\IconSet $set)
 *
 * @see \Primix\Support\Icons\IconManager
 */
class PrimixIcon extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return IconManager::class;
    }
}
