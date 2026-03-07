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
