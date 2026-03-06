<?php

namespace Primix\Concerns;

use Illuminate\Contracts\Support\Htmlable;
use LiVue\Attributes\Composable;
use Primix\Panel;
use Primix\PanelRegistry;

trait UsePanelConfiguration
{
    #[Composable(as: 'panelConfig')]
    public function usePanelConfiguration(): array
    {
        $panel = $this->resolvePanelForConfiguration();
        $brandName = $panel?->getBrandName();

        return [
            'id' => $panel?->getId(),
            'brandName' => $brandName instanceof Htmlable ? $brandName->toHtml() : ($brandName === null ? null : e($brandName)),
            'brandLogo' => $panel?->getBrandLogo(),
            'brandLogoDark' => $panel?->getBrandLogoDark(),
            'hasDarkMode' => $panel?->hasDarkMode() ?? true,
        ];
    }

    protected function resolvePanelForConfiguration(): ?Panel
    {
        $registry = app(PanelRegistry::class);

        $panelId = property_exists($this, 'panelId')
            && is_string($this->panelId)
            && $this->panelId !== ''
            ? $this->panelId
            : null;

        if ($panelId !== null) {
            $panel = $registry->get($panelId);

            if ($panel !== null) {
                $registry->setCurrentPanel($panelId);

                return $panel;
            }
        }

        return $registry->getCurrentPanel();
    }
}
