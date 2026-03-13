# Primix Actions

`primix/actions` is an official package in the Primix ecosystem.
It is part of the Primix framework and handles interactive panel actions: contextual buttons, grouped actions, and bulk actions.

## What it is for

- Define reusable actions for single records or multiple records.
- Handle confirmations, modals, server-side callbacks, redirects, and notifications.
- Keep a consistent UX across pages, resources, and tables.

## Installation

Recommended for full Primix projects:

```bash
composer require primix/primix
```

Standalone module installation:

```bash
composer require primix/actions
```

## Quick example

```php
use Primix\Actions\Action;

Action::make('publish')
    ->label('Publish')
    ->requiresConfirmation()
    ->action(fn ($record) => $record->update(['status' => 'published']));
```
