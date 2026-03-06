<?php

namespace Primix\Support\Concerns;

use Closure;
use Primix\Support\Styles\ComponentStyle;
use Primix\Support\Theme\ThemeManager;

trait HasStyle
{
    protected ComponentStyle|array|Closure|null $componentStyle = null;

    /**
     * Set the component style.
     *
     * Accepts:
     * - ComponentStyle: typed class (e.g. TextInputStyle::make()->input('font-bold'))
     * - array: raw sections (['input' => 'font-bold', 'group' => ['class' => '...']])
     * - Closure: evaluated with DI, must return ComponentStyle or array
     */
    public function style(ComponentStyle|array|Closure $style): static
    {
        $this->componentStyle = $style;

        return $this;
    }

    /**
     * Resolve the style into a normalized array of PT sections.
     *
     * Merges global (ThemeConfig::configure) and per-instance styles.
     * Instance sections override global sections (shallow per-section merge).
     */
    public function getStylePassThrough(): array
    {
        $globalStyle = app(ThemeManager::class)->getComponentStyle(static::class);

        if ($globalStyle === null && $this->componentStyle === null) {
            return [];
        }

        $resolved = [];

        if ($globalStyle !== null) {
            $resolved = $this->resolveStyleValue($globalStyle);
        }

        if ($this->componentStyle !== null) {
            $instanceResolved = $this->resolveStyleValue($this->componentStyle);
            $resolved = array_merge($resolved, $instanceResolved);
        }

        return $resolved;
    }

    /**
     * Resolve a style value (ComponentStyle, array, or Closure) into a normalized array.
     */
    protected function resolveStyleValue(ComponentStyle|array|Closure $style): array
    {
        $resolved = $this->evaluate($style);

        if ($resolved instanceof ComponentStyle) {
            return $resolved->resolve($this);
        }

        if (is_array($resolved)) {
            return collect($resolved)->map(function ($value) {
                $evaluated = $this->evaluate($value);

                return is_string($evaluated)
                    ? ['class' => $evaluated]
                    : ($evaluated ?? []);
            })->all();
        }

        return [];
    }
}
