<?php

namespace Primix\Support\Facades;

use Illuminate\Support\Facades\Facade;
use Primix\Support\RenderHook\RenderHookManager;

/**
 * @method static void register(string|\BackedEnum $name, \Closure|string $callback, array $scopes = [])
 * @method static string render(string|\BackedEnum $name, array $scopes = [])
 *
 * @see \Primix\Support\RenderHook\RenderHookManager
 */
class PrimixRenderHook extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return RenderHookManager::class;
    }
}
