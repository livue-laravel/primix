<?php

namespace Primix\Support\Theme;

abstract class Theme
{
    abstract public function configure(ThemeConfig $config): void;

    /**
     * Override to configure raw PrimeVue PassThrough options.
     */
    public function passThrough(PassThroughConfig $pt): void
    {
        //
    }
}
