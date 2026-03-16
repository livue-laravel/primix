# Contributing to Primix

Thank you for considering contributing to Primix! Every contribution — bug reports, feature proposals, documentation improvements, or pull requests — is appreciated and helps make the project better for everyone.

## Code of Conduct

This project expects all participants to treat each other with respect. Please be welcoming, inclusive, and constructive in all interactions.

---

## Found a Bug?

Before opening a new issue, check the [existing issues](https://github.com/livue-laravel/primix/issues) to avoid duplicates.

When reporting a bug, please include:

- A clear title and description
- Minimal steps to reproduce the issue
- Expected vs. actual behavior
- Your PHP, Laravel, and Primix versions

---

## Proposing a Feature

Before writing code for a new feature, open a [GitHub Discussion](https://github.com/livue-laravel/primix/discussions) or an issue to align on the approach. This avoids wasted effort and ensures the feature fits the project's direction.

---

## Development Setup

### 1. Fork and clone

```bash
git clone https://github.com/your-username/primix.git
cd primix
```

### 2. Install PHP dependencies

From the monorepo root (`packages/primix/`):

```bash
composer install
```

### 3. Install and build frontend assets

```bash
npm install
npm run build
```

### 4. Configure the demo app

In the project root (the Laravel demo app):

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Start the environment

The project uses Laravel Sail:

```bash
./vendor/bin/sail up -d
```

---

## Running Tests

Run tests for a specific package from the monorepo root:

```bash
vendor/bin/pest packages/panels/tests
vendor/bin/pest packages/forms/tests
vendor/bin/pest packages/tables/tests
vendor/bin/pest packages/tables/tests
```

Run all packages at once:

```bash
vendor/bin/pest packages/
```

---

## Code Style

- Follow **PSR-12** for PHP code.
- Respect the existing Primix conventions: fluent API, `static::make()` factory methods, `configure()` hooks.
- Write **Pest tests** for every new feature or bug fix.
- Do not introduce workarounds — fix root causes.

---

## Monorepo Commands

This project uses [symplify/monorepo-builder](https://github.com/symplify/monorepo-builder):

```bash
# Sync shared dependencies across all packages
composer monorepo:propagate

# Verify that all packages share consistent versions
composer monorepo:validate
```

Run these after adding or changing dependencies in any sub-package.

---

## Submitting a Pull Request

1. **Branch from `main`** — e.g. `git checkout -b fix/table-filter-reset`
2. **Keep PRs focused** — one bug fix or feature per PR
3. **Add or update tests** for any behavior changes
4. **Run the full test suite** before submitting
5. **Open your PR against `main`** with a clear description of what changed and why

---

## Security Vulnerabilities

**Do not open public GitHub issues for security vulnerabilities.**

Please report them privately by emailing [software@ccast.it](mailto:software@ccast.it). All reports will be addressed promptly and responsibly.

---

Thank you for contributing to Primix!
