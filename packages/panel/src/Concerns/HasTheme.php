<?php

namespace Primix\Concerns;

use Closure;
use Primix\Support\Theme\PassThroughConfig;
use Primix\Support\Theme\Theme;
use Primix\Support\Theme\ThemeConfig;

trait HasTheme
{
    protected array $colors = [];

    protected ?ThemeConfig $themeConfig = null;

    protected ?PassThroughConfig $passThroughConfig = null;

    public function colors(array $colors): static
    {
        $this->colors = $colors;

        return $this;
    }

    public function getColors(): array
    {
        return $this->colors;
    }

    public function getPrimaryColor(): ?string
    {
        return $this->colors['primary'] ?? null;
    }

    public function theme(Closure|string|Theme $theme): static
    {
        $config = $this->getThemeConfig();

        if ($theme instanceof Closure) {
            $theme($config);
        } else {
            $instance = is_string($theme) ? new $theme() : $theme;
            $instance->configure($config);

            if ($this->passThroughConfig === null) {
                $this->passThroughConfig = PassThroughConfig::make();
            }
            $instance->passThrough($this->passThroughConfig);
        }

        return $this;
    }

    public function primaryColor(string $color): static
    {
        $this->getThemeConfig()->primaryColor($color);

        return $this;
    }

    public function surfaceColor(string $color): static
    {
        $this->getThemeConfig()->surfaceColor($color);

        return $this;
    }

    public function dangerColor(string $color): static
    {
        $this->getThemeConfig()->dangerColor($color);

        return $this;
    }

    public function warningColor(string $color): static
    {
        $this->getThemeConfig()->warningColor($color);

        return $this;
    }

    public function successColor(string $color): static
    {
        $this->getThemeConfig()->successColor($color);

        return $this;
    }

    public function infoColor(string $color): static
    {
        $this->getThemeConfig()->infoColor($color);

        return $this;
    }

    public function borderRadius(string $radius): static
    {
        $this->getThemeConfig()->borderRadius($radius);

        return $this;
    }

    public function font(string $font): static
    {
        $this->getThemeConfig()->font($font);

        return $this;
    }

    public function getThemeConfig(): ThemeConfig
    {
        if ($this->themeConfig === null) {
            $this->themeConfig = ThemeConfig::make();
        }

        return $this->themeConfig;
    }

    public function passThrough(Closure $callback): static
    {
        $config = $this->getPassThroughConfig();

        if ($config === null) {
            $config = PassThroughConfig::make();
            $this->passThroughConfig = $config;
        }

        $callback($config);

        return $this;
    }

    public function getPassThroughConfig(): ?PassThroughConfig
    {
        return $this->passThroughConfig;
    }
}
