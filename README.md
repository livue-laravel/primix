# Primix

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/livue-laravel/primix/ci.yml?branch=main)](https://github.com/livue-laravel/primix/actions)
[![Packagist Version](https://img.shields.io/packagist/v/primix/primix)](https://packagist.org/packages/primix/primix)
[![PHP Version](https://img.shields.io/packagist/php-v/primix/primix)](https://packagist.org/packages/primix/primix)
[![License](https://img.shields.io/github/license/livue-laravel/primix)](https://github.com/livue-laravel/primix/blob/main/LICENSE)

**Primix** is an admin panel framework for Laravel, built on top of [LiVue](https://github.com/livue-laravel/livue) (Vue.js 3 + Laravel). Inspired by FilamentPHP, it replaces Livewire with a Vue-based reactivity layer for richer, component-driven admin UIs.

## Features

- **CRUD Resources** with automatic route binding and page generation
- **Fluent PHP API** — `->required()`, `->sortable()`, `->searchable()`, and more
- **Reactive Vue 3 components** via LiVue — no full page reloads
- **15 form field types** — TextInput, Select, FileUpload, RichEditor, DatePicker, ColorPicker, Repeater, and more
- **10 table column types** — Text, Badge, Image, Toggle, Color, and more
- **Table features** — Filters, grouping, reorderable rows, CSV export/import
- **Dashboard widgets** — StatsOverview, Chart, ProgressBar, MeterGroup
- **Global Search** — Spotlight mode (Cmd+K) or inline Dropdown
- **Nested modal stack** — create-and-select flows within form fields
- **Render hook system** — 14 hook points for extending the UI
- **Multi-tenant support** — subdomain or path-based tenancy
- **Artisan generators** — scaffold resources, pages, widgets, exporters, and importers

## Requirements

| Requirement | Version |
|-------------|---------|
| PHP | 8.2+ |
| Laravel | 12.x |
| LiVue | ^1.5 |
| Node.js | 18+ |
| Tailwind CSS | v4 |

## Installation

```bash
composer require primix/primix
```

Publish the configuration and assets:

```bash
php artisan vendor:publish --tag=primix-config
php artisan vendor:publish --tag=primix-assets
```

## Quick Start

### 1. Configure a Panel

Register a panel in your `AppServiceProvider` (or a dedicated `PanelServiceProvider`):

```php
use Primix\Facades\Primix;
use Primix\Panel;

Primix::registerPanel(
    Panel::make('admin')
        ->path('admin')
        ->brandName('My App')
        ->resources([
            App\Primix\Resources\PostResource::class,
        ])
        ->pages([
            App\Primix\Pages\Dashboard::class,
        ])
);
```

### 2. Create a Resource

```php
use Primix\Resources\Resource;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Fields\Select;
use Primix\Tables\Columns\TextColumn;
use Primix\Tables\Columns\BadgeColumn;
use Primix\Forms\Form;
use Primix\Tables\Table;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')->required(),
            Select::make('status')->options([
                'draft'     => 'Draft',
                'published' => 'Published',
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable()->sortable(),
            BadgeColumn::make('status'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit'   => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
```

### 3. Create the panel user

```bash
php artisan make:primix-user
```

Visit `/admin` and log in.

## Package Structure

Primix is a monorepo. Each sub-package can be installed independently:

| Package | Description |
|---------|-------------|
| `primix/support` | Shared utilities, base component classes, traits, contracts |
| `primix/forms` | Form builder: fields (15 types) and layout components |
| `primix/tables` | Table builder: columns, filters, pagination, CSV export/import |
| `primix/actions` | Action, BulkAction, ActionGroup, ViewAction |
| `primix/notifications` | Flash notification system |
| `primix/widgets` | Dashboard widgets: StatsOverview, Chart, ProgressBar, MeterGroup |
| `primix/panels` | Panel config, navigation, pages, resources, Artisan generators |
| `primix/multi-tenant` | Multi-tenancy support (subdomain/path based) |
| `primix/details` | Detail/view-only record components |

## Artisan Commands

```bash
# Scaffold a CRUD resource with optional page generation
php artisan make:primix-resource {Name} {--model=} {--generate} {--simple}

# Create a custom panel page
php artisan make:primix-page {Name}

# Create a panel admin user (interactive if no options given)
php artisan make:primix-user {--name=} {--email=} {--password=}

# Generate a dashboard widget
php artisan make:primix-widget {Name} {--stats} {--chart} {--table}

# Generate a CSV exporter class
php artisan make:primix-exporter {Name} {--model=}

# Generate a CSV importer class
php artisan make:primix-importer {Name} {--model=}
```

## Testing

Run tests for an individual package from the monorepo root:

```bash
vendor/bin/pest packages/panels/tests
vendor/bin/pest packages/forms/tests
vendor/bin/pest packages/tables/tests
```

## Security

If you discover a security vulnerability, please email [software@ccast.it](mailto:software@ccast.it) instead of opening a public issue. All security reports will be addressed promptly.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

## Credits

- [Claudio Castorina](https://github.com/ccastit)
- [All Contributors](https://github.com/livue-laravel/primix/graphs/contributors)

## License

Primix is open-source software licensed under the [MIT license](LICENSE).
