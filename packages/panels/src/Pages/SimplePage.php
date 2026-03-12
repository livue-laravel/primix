<?php

namespace Primix\Pages;

use Closure;
use Illuminate\Contracts\Support\Htmlable;
use LiVue\Attributes\Layout;
use Primix\Concerns\UsePanelConfiguration;
use Primix\Support\Enums\Width;

#[Layout('primix::components.layouts.simple')]
abstract class SimplePage extends BasePage
{
    use UsePanelConfiguration;

    protected static ?Width $maxContentWidth = Width::ExtraLarge;

    protected string|Closure|Htmlable|null $subheading = null;

    public function getSubheading(): string|Htmlable|null
    {
        $subheading = $this->subheading;

        if ($subheading instanceof Closure) {
            $subheading = $subheading();
        }

        return $subheading;
    }

    public function getMaxContentWidth(): Width
    {
        if (static::$maxContentWidth !== null) {
            return static::$maxContentWidth;
        }

        return Width::ExtraLarge;
    }

    public function getLayoutData(): array
    {
        $panelConfig = $this->usePanelConfiguration();

        return [
            'title' => $this->getTitle(),
            'subheading' => $this->getSubheading(),
            'maxContentWidth' => $this->getMaxContentWidth(),
            'brandName' => $panelConfig['brandName'],
            'brandLogo' => $panelConfig['brandLogo'],
            'brandLogoDark' => $panelConfig['brandLogoDark'],
            'hasDarkMode' => $panelConfig['hasDarkMode'],
        ];
    }
}
