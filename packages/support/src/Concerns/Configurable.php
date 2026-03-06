<?php

namespace Primix\Support\Concerns;

use Closure;
use Primix\Support\ComponentRegistry;

trait Configurable
{
    public function configure(): static
    {
        app(ComponentRegistry::class)->configure(
            $this,
            $this->setUp(...)
        );

        if (property_exists($this, 'hasExplicitVisibility')) {
            $this->hasExplicitVisibility = false;
        }

        return $this;
    }

    public static function configureUsing(Closure $modifyUsing, ?Closure $during = null, bool $isImportant = false): mixed
    {
        return app(ComponentRegistry::class)->configureUsing(
            static::class,
            $modifyUsing,
            $during,
            $isImportant
        );
    }

    protected function setUp(): void
    {
        //
    }
}
