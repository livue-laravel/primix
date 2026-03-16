<?php

namespace Primix\View;

use Illuminate\Contracts\Support\Htmlable;
use Primix\Navigation\NavigationBuilder;
use Primix\Panel;

class PanelSidebarDataResolver
{
    /**
     * Build a primix-sidebar compatible payload from the current panel context.
     */
    public function resolve(Panel $panel): array
    {
        $panelId = $panel->getId();
        $navigation = (new NavigationBuilder($panel))->build();
        $brandName = $panel->getBrandName();
        $resolvedBrandName = $brandName instanceof Htmlable
            ? $brandName->toHtml()
            : ($brandName === null ? null : e($brandName));

        return [
            'navigation' => $navigation,
            'brandName' => $resolvedBrandName,
            'brandLogo' => $panel->getBrandLogo(),
            'brandLogoDark' => $panel->getBrandLogoDark(),
            'spa' => $panel->hasSpa(),
            'panelId' => $panelId,
        ];
    }
}

