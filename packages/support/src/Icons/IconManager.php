<?php

namespace Primix\Support\Icons;

use Primix\Support\Icons\Sets\HeroiconSet;
use Primix\Support\Icons\Sets\PrimeIconSet;

class IconManager
{
    /** @var array<string, IconSet> */
    protected array $sets = [];

    public function __construct()
    {
        $this->registerSet(new PrimeIconSet());
        $this->registerSet(new HeroiconSet());
    }

    public function registerSet(IconSet $set): static
    {
        $this->sets[$set->getName()] = $set;

        return $this;
    }

    public function getSet(string $name): ?IconSet
    {
        return $this->sets[$name] ?? null;
    }

    /**
     * @return array<string, IconSet>
     */
    public function getSets(): array
    {
        return $this->sets;
    }

    /**
     * Resolve which icon set can render the given icon.
     */
    public function resolveSet(string $icon): ?IconSet
    {
        foreach ($this->sets as $set) {
            if ($set->canRender($icon)) {
                return $set;
            }
        }

        return null;
    }

    /**
     * Render an icon string as HTML.
     */
    public function render(string $icon, ?string $class = null, ?string $size = null, ?string $style = null): string
    {
        $set = $this->resolveSet($icon);

        if ($set !== null) {
            return $set->render($icon, $class, $size, $style);
        }

        // Fallback: render as <i> tag with the icon string as class
        $classes = trim($icon . ($class ? ' ' . $class : ''));
        $styleAttr = $style ? ' style="' . e($style) . '"' : '';

        return '<i class="' . e($classes) . '"' . $styleAttr . '></i>';
    }
}
