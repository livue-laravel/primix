# Primix Forms

`primix/forms` is an official package in the Primix ecosystem.
It is part of the Primix framework and lets you build composable forms with fields and layouts, keeping panel UI and behavior consistent.

## What it is for

- Define declarative forms for create, edit, and settings flows.
- Combine fields and layouts into reusable schemas.
- Integrate naturally with Primix panel validation and rendering.

## Installation

Recommended for full Primix projects:

```bash
composer require primix/primix
```

Standalone module installation:

```bash
composer require primix/forms
```

## Quick example

```php
use Primix\Forms\Form;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Fields\Select;

$form = Form::make()
    ->schema([
        TextInput::make('name')->label('Name')->required(),
        Select::make('status')->options([
            'draft' => 'Draft',
            'published' => 'Published',
        ]),
    ]);
```
