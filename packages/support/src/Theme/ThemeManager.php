<?php

namespace Primix\Support\Theme;

use LiVue\Features\SupportAssets\AssetManager as LiVueAssetManager;
use Primix\Support\Colors\ColorManager;
use Primix\Support\Styles\ComponentStyle;

class ThemeManager
{
    protected array $componentStyles = [];

    public function __construct(
        protected LiVueAssetManager $assetManager,
        protected ColorManager $colorManager,
    ) {}

    /**
     * Apply theme configuration from a panel to the frontend.
     *
     * Registers CSS variables and script data via LiVue's AssetManager
     * so they are available when the page renders.
     *
     * @param  \Primix\Panel  $panel
     */
    public function apply(object $panel): void
    {
        $themeConfig = $panel->getThemeConfig();
        $ptConfig = $panel->getPassThroughConfig();

        $this->syncColorManager($themeConfig);
        $this->componentStyles = $themeConfig->getComponentStyles();

        $data = ['primix' => []];

        // Theme config for JS preset builder
        $themeArray = $themeConfig->toArray();
        if (! empty($themeArray)) {
            $data['primix']['theme'] = $themeArray;
        }

        // PassThrough config for PrimeVue PT
        if ($ptConfig !== null) {
            $ptArray = $ptConfig->toArray();
            if (! empty($ptArray)) {
                $data['primix']['pt'] = $ptArray;
            }
        }

        // Only register if there's actual data
        if (! empty($data['primix'])) {
            $this->assetManager->registerScriptData($data, 'primix');
        }

        // Register font CSS variable if configured
        $font = $themeConfig->getFont();
        if ($font !== null) {
            $this->assetManager->registerCssVariables([
                '--p-font-family' => $font,
            ], 'primix');
        }
    }

    /**
     * Get the global style configured for a specific component class.
     */
    public function getComponentStyle(string $componentClass): ComponentStyle|array|null
    {
        return $this->componentStyles[$componentClass] ?? null;
    }

    /**
     * Sync ColorManager defaults with the theme configuration.
     *
     * Updates the ColorManager singleton so server-side color resolution
     * (badges, icons, etc.) matches the frontend theme.
     */
    protected function syncColorManager(ThemeConfig $config): void
    {
        $this->colorManager->register('primary', $config->getPrimaryColor(), 500);

        if ($config->getDangerColor() !== null) {
            $this->colorManager->register('danger', $config->getDangerColor(), 500);
        }

        if ($config->getWarningColor() !== null) {
            $this->colorManager->register('warning', $config->getWarningColor(), 500);
            $this->colorManager->register('warn', $config->getWarningColor(), 500);
        }

        if ($config->getSuccessColor() !== null) {
            $this->colorManager->register('success', $config->getSuccessColor(), 500);
        }

        if ($config->getInfoColor() !== null) {
            $this->colorManager->register('info', $config->getInfoColor(), 500);
        }
    }
}
