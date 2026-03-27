<?php

namespace Primix\Resources;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Primix\Details\Details;
use Primix\Forms\Form;
use Primix\PanelRegistry;
use Primix\Tables\Table;

abstract class Resource
{
    use Concerns\HasAuthorization;
    use Concerns\HasGlobalSearch;

    protected static ?string $model = null;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = null;

    protected static ?string $navigationGroup = null;

    protected static ?string $navigationSubGroup = null;

    protected static ?int $navigationSort = null;

    protected static ?string $slug = null;

    protected static ?string $recordTitleAttribute = null;

    protected static ?string $pluralModelLabel = null;

    protected static ?string $modelLabel = null;

    protected static bool $shouldRegisterNavigation = true;

    protected static ?bool $workspace = null;

    protected static ?bool $shouldTranslateLabels = null;

    protected static array $tenantColumnExistsCache = [];

    public static function getModel(): string
    {
        return static::$model ?? throw new \Exception('Model not defined for resource ' . static::class);
    }

    public static function getSlug(): string
    {
        return static::$slug ?? str(class_basename(static::class))
            ->beforeLast('Resource')
            ->plural()
            ->kebab()
            ->toString();
    }

    public static function getNavigationLabel(): string
    {
        $label = static::$navigationLabel ?? str(class_basename(static::class))
            ->beforeLast('Resource')
            ->plural()
            ->headline()
            ->toString();

        return static::shouldTranslateLabels() ? __($label) : $label;
    }

    public static function getModelLabel(): string
    {
        $label = static::$modelLabel ?? str(class_basename(static::getModel()))
            ->headline()
            ->lower()
            ->ucfirst()
            ->toString();

        return static::shouldTranslateLabels() ? __($label) : $label;
    }

    public static function getPluralModelLabel(): string
    {
        // Use the raw (untranslated) singular to build the plural, then translate once.
        $singular = static::$modelLabel ?? str(class_basename(static::getModel()))
            ->headline()
            ->lower()
            ->ucfirst()
            ->toString();

        $label = static::$pluralModelLabel ?? str($singular)->plural()->toString();

        return static::shouldTranslateLabels() ? __($label) : $label;
    }

    public static function shouldTranslateLabels(): bool
    {
        if (static::$shouldTranslateLabels !== null) {
            return static::$shouldTranslateLabels;
        }

        $panel = app(PanelRegistry::class)->getCurrentPanel();

        if ($panel !== null && method_exists($panel, 'shouldTranslateLabels')) {
            return $panel->shouldTranslateLabels();
        }

        return app(PanelRegistry::class)->shouldTranslateLabels();
    }

    public static function getNavigationIcon(): ?string
    {
        return static::$navigationIcon;
    }

    public static function getNavigationGroup(): ?string
    {
        return static::$navigationGroup;
    }

    public static function getNavigationSubGroup(): ?string
    {
        return static::$navigationSubGroup;
    }

    public static function getNavigationSort(): ?int
    {
        return static::$navigationSort;
    }

    public static function shouldRegisterNavigation(): bool
    {
        return static::$shouldRegisterNavigation;
    }

    public static function hasWorkspace(): bool
    {
        $workspace = static::workspace();

        if ($workspace instanceof Closure) {
            return (bool) $workspace();
        }

        if ($workspace !== null) {
            return (bool) $workspace;
        }

        $panel = app(PanelRegistry::class)->getCurrentPanel();

        if ($panel !== null && method_exists($panel, 'hasWorkspaceSetting') && $panel->hasWorkspaceSetting()) {
            return $panel->hasWorkspace();
        }

        if (! app()->bound('config')) {
            return false;
        }

        return (bool) config('primix.workspace.enabled', false);
    }

    public static function workspace(): bool|Closure|null
    {
        return static::$workspace;
    }

    public static function getRecordTitleAttribute(): ?string
    {
        return static::$recordTitleAttribute;
    }

    public static function getRecordTitle(?Model $record): ?string
    {
        $attribute = static::getRecordTitleAttribute();

        if ($attribute === null) {
            return null;
        }

        return $record?->getAttribute($attribute);
    }

    public static function getEloquentQuery(): Builder
    {
        $query = static::getModel()::query();

        if (static::shouldScopeToTenant() && static::hasTenantColumn()) {
            $column = config('multi-tenant.tenant_column', 'tenant_id');

            $query->where(
                $query->getModel()->qualifyColumn($column),
                \Primix\MultiTenant\Facades\Tenancy::tenant()->getTenantKey(),
            );
        }

        return $query;
    }

    public static function shouldScopeToTenant(): bool
    {
        return class_exists(\Primix\MultiTenant\Facades\Tenancy::class)
            && \Primix\MultiTenant\Facades\Tenancy::initialized()
            && config('multi-tenant.database.strategy') === 'single';
    }

    public static function hasTenantColumn(): bool
    {
        $column = config('multi-tenant.tenant_column', 'tenant_id');
        $model = static::getModel();
        /** @var Model $instance */
        $instance = new $model();
        $table = $instance->getTable();
        $connection = $instance->getConnectionName() ?? config('database.default');
        $cacheKey = implode('|', [$model, $connection, $table, $column]);

        if (array_key_exists($cacheKey, static::$tenantColumnExistsCache)) {
            return static::$tenantColumnExistsCache[$cacheKey];
        }

        try {
            $exists = Schema::connection($instance->getConnectionName())->hasColumn($table, $column);
        } catch (\Throwable) {
            $exists = false;
        }

        static::$tenantColumnExistsCache[$cacheKey] = $exists;

        return $exists;
    }

    public static function form(Form $form): Form
    {
        return $form;
    }

    public static function table(Table $table): Table
    {
        return $table;
    }

    public static function details(Details $details): Details
    {
        return $details;
    }

    public static function getWidgets(): array
    {
        return [];
    }

    public static function getRelationManagers(): array
    {
        return [];
    }

    abstract public static function getPages(): array;

    public static function hasPage(string $name): bool
    {
        return array_key_exists($name, static::getPages());
    }

    public static function getUrl(string $name = 'index', array $parameters = []): string
    {
        $prefix = app(PanelRegistry::class)->getRoutePrefix();

        return route($prefix . static::getSlug() . ".{$name}", $parameters);
    }

    public static function getTenantUrl(string $name = 'index', string|int|null $tenantKey = null, array $parameters = []): string
    {
        if ($tenantKey === null && class_exists(\Primix\MultiTenant\Facades\Tenancy::class)) {
            $tenantKey = \Primix\MultiTenant\Facades\Tenancy::tenant()?->getTenantKey();
        }

        $routeParameter = config('multi-tenant.panel.route_parameter', 'tenant');
        $parameters[$routeParameter] = $tenantKey;

        return static::getUrl($name, $parameters);
    }
}
