<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Vite Mode
    |--------------------------------------------------------------------------
    |
    | When true, Primix assets are loaded via Vite (imported in app.js).
    | When false, assets are served via PHP routes (standalone mode).
    |
    */
    'vite' => env('PRIMIX_VITE', true),

    /*
    |--------------------------------------------------------------------------
    | Default Panel
    |--------------------------------------------------------------------------
    |
    | The default panel ID to use when no panel is specified.
    |
    */
    'default' => env('PRIMIX_DEFAULT_PANEL', 'admin'),

    /*
    |--------------------------------------------------------------------------
    | Assets Path
    |--------------------------------------------------------------------------
    |
    | The path where Primix assets should be published.
    |
    */
    'assets_path' => 'primix',

    /*
    |--------------------------------------------------------------------------
    | Broadcasting
    |--------------------------------------------------------------------------
    |
    | Enable real-time features using Laravel Echo.
    |
    */
    'broadcasting' => [
        'enabled' => env('PRIMIX_BROADCASTING', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Dark Mode
    |--------------------------------------------------------------------------
    |
    | Enable dark mode support.
    |
    */
    'dark_mode' => env('PRIMIX_DARK_MODE', true),

    /*
    |--------------------------------------------------------------------------
    | Workspace
    |--------------------------------------------------------------------------
    |
    | Enable resource workspaces (tabbed navigation) by default.
    | This can be overridden per panel and per resource.
    |
    */
    'workspace' => [
        'enabled' => env('PRIMIX_WORKSPACE_ENABLED', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Panels
    |--------------------------------------------------------------------------
    |
    | Configuration for panel registration and discovery.
    |
    | autodiscovery: When true, Primix automatically discovers and registers
    | any *PanelProvider.php classes found in app/Providers/, without requiring
    | manual registration in bootstrap/providers.php.
    |
    */
    'panels' => [
        'autodiscovery' => env('PRIMIX_PANELS_AUTODISCOVERY', true),
    ],
];
