# Primix Multi-Tenant

`primix/multi-tenant` is an official package in the Primix ecosystem.
It is part of the Primix framework and adds multi-tenant support for SaaS applications or environments with per-customer isolation.

## What it is for

- Identify the current tenant and initialize tenant context.
- Support different data isolation strategies: `single`, `multi`, `schema`.
- Provide tools and conventions for models, panels, and routing in multi-tenant setups.

## Installation

Recommended for full Primix projects:

```bash
composer require primix/primix
```

Standalone module installation:

```bash
composer require primix/multi-tenant
```

Use it when you need tenant-level data/context isolation; it is not required for single-tenant applications.
