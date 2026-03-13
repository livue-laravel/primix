# Primix Support

`primix/support` is an official package in the Primix ecosystem.
It is part of the Primix framework and contains shared foundations used by all other packages.

## What it is for

- Provide common utilities, concerns, and base classes.
- Centralize cross-cutting conventions (components, styles, icons, global configuration).
- Reduce duplication and keep all Primix packages consistent.

## Installation

Recommended for full Primix projects:

```bash
composer require primix/primix
```

Standalone module installation:

```bash
composer require primix/support
```

In practice, it is usually resolved automatically as a dependency of other Primix packages.
