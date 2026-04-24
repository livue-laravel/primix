<?php

use LiVue\Features\SupportAssets\AssetManager;
use Primix\Panel;
use Primix\Support\Colors\ColorManager;
use Primix\Support\Theme\ThemeManager;

it('registers global font as both body and heading fallback variables', function () {
    $assetManager = new AssetManager();
    $themeManager = new ThemeManager($assetManager, new ColorManager());

    $panel = Panel::make('admin')
        ->font('"Inter", sans-serif');

    $themeManager->apply($panel);

    expect($assetManager->getCssVariables()['primix'])->toMatchArray([
        '--p-font-family' => '"Inter", sans-serif',
        '--px-body-font-family' => '"Inter", sans-serif',
        '--px-heading-font-family' => '"Inter", sans-serif',
    ]);
});

it('lets body and heading fonts override the global font independently', function () {
    $assetManager = new AssetManager();
    $themeManager = new ThemeManager($assetManager, new ColorManager());

    $panel = Panel::make('admin')
        ->font('"Inter", sans-serif')
        ->bodyFont('"Instrument Sans", sans-serif')
        ->headingFont('"Fraunces", serif');

    $themeManager->apply($panel);

    expect($assetManager->getCssVariables()['primix'])->toMatchArray([
        '--p-font-family' => '"Instrument Sans", sans-serif',
        '--px-body-font-family' => '"Instrument Sans", sans-serif',
        '--px-heading-font-family' => '"Fraunces", serif',
    ]);
});

it('uses body font as heading fallback when no global or heading font is configured', function () {
    $assetManager = new AssetManager();
    $themeManager = new ThemeManager($assetManager, new ColorManager());

    $panel = Panel::make('admin')
        ->bodyFont('"Instrument Sans", sans-serif');

    $themeManager->apply($panel);

    expect($assetManager->getCssVariables()['primix'])->toMatchArray([
        '--p-font-family' => '"Instrument Sans", sans-serif',
        '--px-body-font-family' => '"Instrument Sans", sans-serif',
        '--px-heading-font-family' => '"Instrument Sans", sans-serif',
    ]);
});
