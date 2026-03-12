# Primix

Primix is an admin panel framework for Laravel built on top of LiVue.

## Installation

```bash
composer require primix/primix:^0.1.0
```

Optional multi-tenant package:

```bash
composer require primix/multi-tenant:^0.1.0
```

## Monorepo Publishing Model

- Primary install target: `primix/primix` (root monorepo package).
- Component packages: `primix/actions`, `primix/details`, `primix/forms`, `primix/multi-tenant`, `primix/notifications`, `primix/panels`, `primix/support`, `primix/tables`, `primix/widgets`.

### Release flow

1. Run monorepo release (`vendor/bin/monorepo-builder release ...`) to tag the monorepo.
2. Tag push triggers `.github/workflows/monorepo-split.yml`.
3. Each `packages/*` directory is pushed to its split repository in `livue-laravel/*`.
4. Register split repositories on Packagist so Composer resolves package-by-package installs (Filament-style `vendor/primix/*` layout).

## LiVue Integration Pattern

Primix packages should follow a single pattern for assets + Vue registration.

### 1) Register package assets as on-request

```php
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\AssetVersion;

$assetVersion = AssetVersion::resolve();
$assetsBasePath = '/' . trim(config('livue.assets_path', 'vendor/livue'), '/');

LiVueAsset::register([
    Css::make('primix-forms', "{$assetsBasePath}/primix/forms/primix-forms.css")
        ->onRequest()
        ->version($assetVersion),
    Js::make('primix-forms', "{$assetsBasePath}/primix/forms/primix-forms.js")
        ->module()
        ->onRequest()
        ->version($assetVersion),
], 'primix/forms');
```

### 2) Load only where needed in Blade

```blade
@livueLoadStyle('primix-forms', 'primix/forms')
@livueLoadScript('primix-forms', 'primix/forms', ['type' => 'module'])
```

### 3) Register Vue setup once in package JS

```js
import LiVue from 'livue';
import { ensurePrimeVueTheme } from '@primix/support/primix';

const registerFormsComponents = (app) => {
    ensurePrimeVueTheme(app);
    app.component('PInputText', InputText);
    app.component('PDatePicker', DatePicker);
};

LiVue.setup(registerFormsComponents);
```

## Notes

- Late-loaded package scripts are handled by LiVue runtime (no custom mounted-root replay needed in Primix).
- `ensurePrimeVueTheme(app)` checks plugin installation using `app._context.plugins.has(PrimeVue)` to avoid cross-bundle PrimeVue mismatches.
