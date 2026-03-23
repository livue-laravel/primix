<?php

use Primix\Panel;
use Primix\Support\Enums\Width;
use Primix\GlobalSearch\GlobalSearchMode;
use Primix\Enums\DatabaseNotificationsDisplayMode;
use Illuminate\Support\HtmlString;

// ============================================================
// Static Factory
// ============================================================

it('can be created with make', function () {
    $panel = Panel::make('admin');

    expect($panel)->toBeInstanceOf(Panel::class)
        ->and($panel->getId())->toBe('admin');
});

it('supports fluent chaining', function () {
    $panel = Panel::make('admin')
        ->path('dashboard')
        ->darkMode(false)
        ->spa();

    expect($panel->getPath())->toBe('dashboard')
        ->and($panel->hasDarkMode())->toBeFalse()
        ->and($panel->hasSpa())->toBeTrue();
});

// ============================================================
// Core Properties — id
// ============================================================

it('can change id after creation', function () {
    $panel = Panel::make('original')->id('changed');

    expect($panel->getId())->toBe('changed');
});

// ============================================================
// Core Properties — default
// ============================================================

it('is not default by default', function () {
    expect(Panel::make('test')->isDefault())->toBeFalse();
});

it('can be set as default', function () {
    expect(Panel::make('test')->default()->isDefault())->toBeTrue();
});

it('can unset default', function () {
    expect(Panel::make('test')->default()->default(false)->isDefault())->toBeFalse();
});

// ============================================================
// Core Properties — path
// ============================================================

it('throws when path is not configured', function () {
    expect(fn () => Panel::make('test')->getPath())
        ->toThrow(\RuntimeException::class, 'path is not configured');
});

it('can set custom path', function () {
    expect(Panel::make('test')->path('dashboard')->getPath())->toBe('dashboard');
});

// ============================================================
// Core Properties — domain
// ============================================================

it('has null domain by default', function () {
    expect(Panel::make('test')->getDomain())->toBeNull();
});

it('can set domain', function () {
    expect(Panel::make('test')->domain('admin.example.com')->getDomain())->toBe('admin.example.com');
});

// ============================================================
// Core Properties — resources, pages, widgets
// ============================================================

it('has empty resources by default', function () {
    expect(Panel::make('test')->getResources())->toBe([]);
});

it('can set resources', function () {
    $panel = Panel::make('test')->resources(['ResourceA', 'ResourceB']);

    expect($panel->getResources())->toContain('ResourceA', 'ResourceB');
});

it('has empty pages by default', function () {
    expect(Panel::make('test')->getPages())->toBe([]);
});

it('can set pages', function () {
    $panel = Panel::make('test')->pages(['PageA']);

    expect($panel->getPages())->toContain('PageA');
});

it('has empty widgets by default', function () {
    expect(Panel::make('test')->getWidgets())->toBe([]);
});

it('can set widgets', function () {
    $panel = Panel::make('test')->widgets(['WidgetA']);

    expect($panel->getWidgets())->toContain('WidgetA');
});

// ============================================================
// Core Properties — middleware
// ============================================================

it('has web middleware by default', function () {
    expect(Panel::make('test')->getMiddleware())->toBe(['web']);
});

it('can set middleware', function () {
    expect(Panel::make('test')->middleware(['api'])->getMiddleware())->toBe(['api']);
});

it('can set authMiddleware explicitly', function () {
    expect(Panel::make('test')->authMiddleware(['auth:sanctum'])->getAuthMiddleware())
        ->toBe(['auth:sanctum']);
});

// ============================================================
// Core Properties — navigation
// ============================================================

it('has null navigation by default', function () {
    expect(Panel::make('test')->getNavigation())->toBeNull();
});

it('can set navigation closure', function () {
    $closure = function () {};

    expect(Panel::make('test')->navigation($closure)->getNavigation())->toBe($closure);
});

// ============================================================
// Core Properties — topBarNavigation
// ============================================================

it('has no top bar navigation by default', function () {
    expect(Panel::make('test')->hasTopBarNavigation())->toBeFalse();
});

it('can enable top bar navigation', function () {
    expect(Panel::make('test')->topBarNavigation()->hasTopBarNavigation())->toBeTrue();
});

it('supports closure for topBarNavigation', function () {
    expect(Panel::make('test')->topBarNavigation(fn () => true)->hasTopBarNavigation())->toBeTrue();
});

// ============================================================
// Core Properties — spa
// ============================================================

it('has spa disabled by default', function () {
    expect(Panel::make('test')->hasSpa())->toBeFalse();
});

it('can enable spa', function () {
    expect(Panel::make('test')->spa()->hasSpa())->toBeTrue();
});

it('supports closure for spa', function () {
    expect(Panel::make('test')->spa(fn () => true)->hasSpa())->toBeTrue();
});

it('closure returning false keeps spa disabled', function () {
    expect(Panel::make('test')->spa(fn () => false)->hasSpa())->toBeFalse();
});

// ============================================================
// Core Properties — workspace
// ============================================================

it('uses global workspace configuration when panel setting is not defined', function () {
    app()->instance('config', new \Illuminate\Config\Repository([
        'primix.workspace.enabled' => true,
    ]));

    expect(Panel::make('test')->hasWorkspace())->toBeTrue()
        ->and(Panel::make('test')->hasWorkspaceSetting())->toBeFalse();
});

it('can enable workspace on panel', function () {
    $panel = Panel::make('test')->workspace();

    expect($panel->hasWorkspace())->toBeTrue()
        ->and($panel->hasWorkspaceSetting())->toBeTrue();
});

it('supports closure for workspace', function () {
    expect(Panel::make('test')->workspace(fn () => false)->hasWorkspace())->toBeFalse();
});

// ============================================================
// Core Properties — darkMode
// ============================================================

it('has dark mode enabled by default', function () {
    expect(Panel::make('test')->hasDarkMode())->toBeTrue();
});

it('can disable dark mode', function () {
    expect(Panel::make('test')->darkMode(false)->hasDarkMode())->toBeFalse();
});

// ============================================================
// Core Properties — fixedTopbar
// ============================================================

it('has fixed topbar by default', function () {
    expect(Panel::make('test')->hasFixedTopbar())->toBeTrue();
});

it('can disable fixed topbar', function () {
    expect(Panel::make('test')->fixedTopbar(false)->hasFixedTopbar())->toBeFalse();
});

// ============================================================
// Core Properties — breadcrumbs
// ============================================================

it('has breadcrumbs enabled by default', function () {
    expect(Panel::make('test')->hasBreadcrumbs())->toBeTrue();
});

it('can disable breadcrumbs', function () {
    expect(Panel::make('test')->breadcrumbs(false)->hasBreadcrumbs())->toBeFalse();
});

it('supports closure for breadcrumbs', function () {
    expect(Panel::make('test')->breadcrumbs(fn () => false)->hasBreadcrumbs())->toBeFalse();
});

// ============================================================
// Core Properties — maxContentWidth
// ============================================================

it('has null maxContentWidth by default', function () {
    expect(Panel::make('test')->getMaxContentWidth())->toBeNull();
});

it('can set maxContentWidth', function () {
    expect(Panel::make('test')->maxContentWidth(Width::SevenExtraLarge)->getMaxContentWidth())
        ->toBe(Width::SevenExtraLarge);
});

// ============================================================
// Core Properties — favicon
// ============================================================

it('has null favicon by default', function () {
    expect(Panel::make('test')->getFavicon())->toBeNull();
});

it('can set favicon with string', function () {
    expect(Panel::make('test')->favicon('/favicon.ico')->getFavicon())->toBe('/favicon.ico');
});

it('resolves favicon from closure', function () {
    expect(Panel::make('test')->favicon(fn () => '/dynamic.ico')->getFavicon())->toBe('/dynamic.ico');
});

it('resolves favicon from Htmlable', function () {
    $html = new HtmlString('<link rel="icon">');

    expect(Panel::make('test')->favicon($html)->getFavicon())->toBe('<link rel="icon">');
});

// ============================================================
// Core Properties — routesRegistered
// ============================================================

it('has routes not registered by default', function () {
    expect(Panel::make('test')->hasRoutesRegistered())->toBeFalse();
});

it('can mark routes as registered', function () {
    $panel = Panel::make('test');
    $panel->markRoutesRegistered();

    expect($panel->hasRoutesRegistered())->toBeTrue();
});

// ============================================================
// Additive Methods
// ============================================================

it('can add resources to existing', function () {
    $panel = Panel::make('test')->resources(['A'])->addResources(['B']);

    expect($panel->getResources())->toContain('A', 'B');
});

it('can add pages to existing', function () {
    $panel = Panel::make('test')->pages(['A'])->addPages(['B']);

    expect($panel->getPages())->toContain('A', 'B');
});

it('can add widgets to existing', function () {
    $panel = Panel::make('test')->widgets(['A'])->addWidgets(['B']);

    expect($panel->getWidgets())->toContain('A', 'B');
});

it('can add middleware to existing', function () {
    expect(Panel::make('test')->addMiddleware(['auth'])->getMiddleware())->toBe(['web', 'auth']);
});

it('can add authMiddleware to existing', function () {
    expect(Panel::make('test')->authMiddleware(['auth'])->addAuthMiddleware(['verified'])->getAuthMiddleware())
        ->toBe(['auth', 'verified']);
});

it('can add authMiddleware when not previously set', function () {
    expect(Panel::make('test')->addAuthMiddleware(['auth'])->getAuthMiddleware())
        ->toBe(['auth']);
});

// ============================================================
// HasAuthentication — login
// ============================================================

it('has no login by default', function () {
    expect(Panel::make('test')->hasLogin())->toBeFalse()
        ->and(Panel::make('test')->getLoginPage())->toBeNull();
});

it('can enable login with default page', function () {
    $panel = Panel::make('test')->login();

    expect($panel->hasLogin())->toBeTrue()
        ->and($panel->getLoginPage())->toBe(\Primix\Pages\Auth\Login::class);
});

it('can set custom login page', function () {
    $panel = Panel::make('test')->login('App\\Pages\\CustomLogin');

    expect($panel->getLoginPage())->toBe('App\\Pages\\CustomLogin');
});

// ============================================================
// HasAuthentication — registration
// ============================================================

it('has no registration by default', function () {
    expect(Panel::make('test')->hasRegistration())->toBeFalse();
});

it('can enable registration with default page', function () {
    $panel = Panel::make('test')->registration();

    expect($panel->hasRegistration())->toBeTrue()
        ->and($panel->getRegistrationPage())->toBe(\Primix\Pages\Auth\Register::class);
});

// ============================================================
// HasAuthentication — emailVerification
// ============================================================

it('has no email verification by default', function () {
    expect(Panel::make('test')->hasEmailVerification())->toBeFalse()
        ->and(Panel::make('test')->getEmailVerificationPage())->toBeNull();
});

it('can enable email verification', function () {
    $panel = Panel::make('test')->emailVerification();

    expect($panel->hasEmailVerification())->toBeTrue()
        ->and($panel->getEmailVerificationPage())->toBe(\Primix\Pages\Auth\EmailVerificationPrompt::class);
});

it('can set custom email verification page', function () {
    $panel = Panel::make('test')->emailVerification(true, 'App\\Pages\\CustomVerify');

    expect($panel->getEmailVerificationPage())->toBe('App\\Pages\\CustomVerify');
});

// ============================================================
// HasAuthentication — passwordReset
// ============================================================

it('has no password reset by default', function () {
    expect(Panel::make('test')->hasPasswordReset())->toBeFalse()
        ->and(Panel::make('test')->getRequestPasswordResetPage())->toBeNull()
        ->and(Panel::make('test')->getResetPasswordPage())->toBeNull();
});

it('can enable password reset with default pages', function () {
    $panel = Panel::make('test')->passwordReset();

    expect($panel->hasPasswordReset())->toBeTrue()
        ->and($panel->getRequestPasswordResetPage())->toBe(\Primix\Pages\Auth\RequestPasswordReset::class)
        ->and($panel->getResetPasswordPage())->toBe(\Primix\Pages\Auth\ResetPassword::class);
});

it('can set custom password reset pages', function () {
    $panel = Panel::make('test')->passwordReset(true, 'App\\Pages\\Request', 'App\\Pages\\Reset');

    expect($panel->getRequestPasswordResetPage())->toBe('App\\Pages\\Request')
        ->and($panel->getResetPasswordPage())->toBe('App\\Pages\\Reset');
});

// ============================================================
// HasAuthentication — profile & authGuard
// ============================================================

it('has null profile page by default', function () {
    expect(Panel::make('test')->getProfilePage())->toBeNull();
});

it('can set profile page', function () {
    expect(Panel::make('test')->profile('App\\Pages\\Profile')->getProfilePage())
        ->toBe('App\\Pages\\Profile');
});

it('has null authGuard by default', function () {
    expect(Panel::make('test')->getAuthGuard())->toBeNull();
});

it('can set authGuard', function () {
    expect(Panel::make('test')->authGuard('admin')->getAuthGuard())->toBe('admin');
});

// ============================================================
// HasBranding
// ============================================================

it('has null brandName by default', function () {
    expect(Panel::make('test')->getBrandName())->toBeNull();
});

it('can set brandName with string', function () {
    expect(Panel::make('test')->brandName('My Admin')->getBrandName())->toBe('My Admin');
});

it('resolves brandName from closure', function () {
    expect(Panel::make('test')->brandName(fn () => 'Dynamic')->getBrandName())->toBe('Dynamic');
});

it('has null brandLogo by default', function () {
    expect(Panel::make('test')->getBrandLogo())->toBeNull()
        ->and(Panel::make('test')->getBrandLogoDark())->toBeNull();
});

it('can set brandLogo', function () {
    $panel = Panel::make('test')->brandName('Test')->brandLogo('/logo.png');

    expect($panel->getBrandLogo())->toContain('/logo.png');
});

it('returns null brandLogoDark when same as light', function () {
    $panel = Panel::make('test')->brandLogo('/same.png');

    expect($panel->getBrandLogoDark())->toBeNull();
});

it('returns brandLogoDark when different from light', function () {
    $panel = Panel::make('test')->brandLogo(null, '/light.png', '/dark.png');

    expect($panel->getBrandLogoDark())->toContain('/dark.png');
});

it('has null brandLogoHeight by default', function () {
    expect(Panel::make('test')->getBrandLogoHeight())->toBeNull();
});

it('can set brandLogoHeight', function () {
    expect(Panel::make('test')->brandLogoHeight('40px')->getBrandLogoHeight())->toBe('40px');
});

// ============================================================
// HasGlobalSearch
// ============================================================

it('has global search enabled by default', function () {
    expect(Panel::make('test')->hasGlobalSearch())->toBeTrue();
});

it('can disable global search', function () {
    expect(Panel::make('test')->globalSearch(false)->hasGlobalSearch())->toBeFalse();
});

it('supports closure for globalSearch', function () {
    expect(Panel::make('test')->globalSearch(fn () => false)->hasGlobalSearch())->toBeFalse();
});

it('has Spotlight as default search mode', function () {
    expect(Panel::make('test')->getGlobalSearchMode())->toBe(GlobalSearchMode::Spotlight);
});

it('can set search mode to Dropdown', function () {
    expect(Panel::make('test')->globalSearchMode(GlobalSearchMode::Dropdown)->getGlobalSearchMode())
        ->toBe(GlobalSearchMode::Dropdown);
});

it('supports closure for globalSearchMode', function () {
    expect(Panel::make('test')->globalSearchMode(fn () => GlobalSearchMode::Dropdown)->getGlobalSearchMode())
        ->toBe(GlobalSearchMode::Dropdown);
});

it('has cross panel search disabled by default', function () {
    expect(Panel::make('test')->hasCrossPanelSearch())->toBeFalse()
        ->and(Panel::make('test')->getCrossPanelSearchExclude())->toBe([]);
});

it('can enable cross panel search with exclusions', function () {
    $panel = Panel::make('test')->crossPanelSearch(true, ['other-panel']);

    expect($panel->hasCrossPanelSearch())->toBeTrue()
        ->and($panel->getCrossPanelSearchExclude())->toBe(['other-panel']);
});

// ============================================================
// HasDatabaseNotifications
// ============================================================

it('has database notifications disabled by default', function () {
    expect(Panel::make('test')->hasDatabaseNotifications())->toBeFalse();
});

it('can enable database notifications', function () {
    expect(Panel::make('test')->databaseNotifications()->hasDatabaseNotifications())->toBeTrue();
});

it('can disable database notifications', function () {
    expect(Panel::make('test')->databaseNotifications(false)->hasDatabaseNotifications())->toBeFalse();
});

it('supports closure for databaseNotifications', function () {
    expect(Panel::make('test')->databaseNotifications(fn () => true)->hasDatabaseNotifications())->toBeTrue();
});

it('has Popup as default database notifications mode', function () {
    expect(Panel::make('test')->getDatabaseNotificationsMode())->toBe(DatabaseNotificationsDisplayMode::Popup);
});

it('can set database notifications mode to Drawer', function () {
    expect(Panel::make('test')->databaseNotificationsMode(DatabaseNotificationsDisplayMode::Drawer)->getDatabaseNotificationsMode())
        ->toBe(DatabaseNotificationsDisplayMode::Drawer);
});

it('supports closure for databaseNotificationsMode', function () {
    expect(Panel::make('test')->databaseNotificationsMode(fn () => DatabaseNotificationsDisplayMode::Drawer)->getDatabaseNotificationsMode())
        ->toBe(DatabaseNotificationsDisplayMode::Drawer);
});

it('has 30 seconds as default polling interval', function () {
    expect(Panel::make('test')->getDatabaseNotificationsPollingInterval())->toBe(30);
});

it('can set custom polling interval', function () {
    expect(Panel::make('test')->databaseNotificationsPollingInterval(60)->getDatabaseNotificationsPollingInterval())
        ->toBe(60);
});

it('supports closure for databaseNotificationsPollingInterval', function () {
    expect(Panel::make('test')->databaseNotificationsPollingInterval(fn () => 15)->getDatabaseNotificationsPollingInterval())
        ->toBe(15);
});

// ============================================================
// HasModalConfiguration
// ============================================================

it('has stack based modals enabled by default', function () {
    expect(Panel::make('test')->hasStackBasedModals())->toBeTrue();
});

it('can disable stack based modals', function () {
    expect(Panel::make('test')->disableStackBasedModals()->hasStackBasedModals())->toBeFalse();
});

it('supports closure for stackBasedModals', function () {
    expect(Panel::make('test')->stackBasedModals(fn () => false)->hasStackBasedModals())->toBeFalse();
});

// ============================================================
// HasPlugins
// ============================================================

it('can register and retrieve a plugin', function () {
    $plugin = new class implements \Primix\Contracts\Plugin {
        public bool $registered = false;
        public bool $booted = false;
        public function getId(): string { return 'test-plugin'; }
        public static function make(): static { return new static(); }
        public function register(\Primix\Panel $panel): void { $this->registered = true; }
        public function boot(\Primix\Panel $panel): void { $this->booted = true; }
    };

    $panel = Panel::make('test')->plugin($plugin);

    expect($plugin->registered)->toBeTrue()
        ->and($panel->hasPlugin('test-plugin'))->toBeTrue()
        ->and($panel->getPlugin('test-plugin'))->toBe($plugin);
});

it('can register multiple plugins', function () {
    $pluginA = new class implements \Primix\Contracts\Plugin {
        public function getId(): string { return 'plugin-a'; }
        public static function make(): static { return new static(); }
        public function register(\Primix\Panel $panel): void {}
        public function boot(\Primix\Panel $panel): void {}
    };

    $pluginB = new class implements \Primix\Contracts\Plugin {
        public function getId(): string { return 'plugin-b'; }
        public static function make(): static { return new static(); }
        public function register(\Primix\Panel $panel): void {}
        public function boot(\Primix\Panel $panel): void {}
    };

    $panel = Panel::make('test')->plugins([$pluginA, $pluginB]);

    expect($panel->getPlugins())->toHaveCount(2);
});

it('throws when getting unregistered plugin', function () {
    Panel::make('test')->getPlugin('missing');
})->throws(\InvalidArgumentException::class);

it('boots all registered plugins', function () {
    $plugin = new class implements \Primix\Contracts\Plugin {
        public bool $booted = false;
        public function getId(): string { return 'test'; }
        public static function make(): static { return new static(); }
        public function register(\Primix\Panel $panel): void {}
        public function boot(\Primix\Panel $panel): void { $this->booted = true; }
    };

    $panel = Panel::make('test')->plugin($plugin);
    $panel->bootPlugins();

    expect($plugin->booted)->toBeTrue();
});

// ============================================================
// HasTenancy
// ============================================================

it('has no tenancy by default', function () {
    expect(Panel::make('test')->hasTenancy())->toBeFalse()
        ->and(Panel::make('test')->getTenantModel())->toBeNull();
});

it('can enable tenancy', function () {
    $panel = Panel::make('test')->tenant('App\\Models\\Team');

    expect($panel->hasTenancy())->toBeTrue()
        ->and($panel->getTenantModel())->toBe('App\\Models\\Team');
});

it('has null tenantSlugAttribute by default', function () {
    expect(Panel::make('test')->getTenantSlugAttribute())->toBeNull();
});

it('can set tenantSlugAttribute', function () {
    expect(Panel::make('test')->tenantSlugAttribute('slug')->getTenantSlugAttribute())->toBe('slug');
});

it('has null tenantIdentification by default', function () {
    expect(Panel::make('test')->getTenantIdentification())->toBeNull();
});

it('can set tenantIdentification', function () {
    expect(Panel::make('test')->tenantIdentification('subdomain')->getTenantIdentification())
        ->toBe('subdomain');
});

it('has no tenant creation by default', function () {
    expect(Panel::make('test')->hasTenantCreation())->toBeFalse()
        ->and(Panel::make('test')->getTenantCreationPage())->toBeNull();
});

it('can enable tenant creation', function () {
    $panel = Panel::make('test')->tenantCreation();

    expect($panel->hasTenantCreation())->toBeTrue();
});

it('can set custom tenant creation page', function () {
    $panel = Panel::make('test')->tenantCreation(true, 'App\\Pages\\CreateTeam');

    expect($panel->getTenantCreationPage())->toBe('App\\Pages\\CreateTeam');
});

// ============================================================
// HasTheme
// ============================================================

it('has empty colors by default', function () {
    expect(Panel::make('test')->getColors())->toBe([]);
});

it('can set colors array', function () {
    $panel = Panel::make('test')->colors(['primary' => '#3b82f6']);

    expect($panel->getColors())->toBe(['primary' => '#3b82f6'])
        ->and($panel->getPrimaryColor())->toBe('#3b82f6');
});

it('has null primary color by default', function () {
    expect(Panel::make('test')->getPrimaryColor())->toBeNull();
});

it('lazy-creates ThemeConfig', function () {
    expect(Panel::make('test')->getThemeConfig())
        ->toBeInstanceOf(\Primix\Support\Theme\ThemeConfig::class);
});

// ============================================================
// HasUserMenu
// ============================================================

it('has empty userMenuItems by default', function () {
    expect(Panel::make('test')->getUserMenuItems())->toBe([]);
});

it('can set userMenuItems', function () {
    $items = [\Primix\Navigation\UserMenuItem::make()->label('Profile')];

    expect(Panel::make('test')->userMenuItems($items)->getUserMenuItems())->toBe($items);
});

// ============================================================
// HasTenantMenu
// ============================================================

it('hasTenantMenu returns false without tenancy', function () {
    expect(Panel::make('test')->hasTenantMenu())->toBeFalse();
});

it('hasTenantMenu returns true with tenancy enabled', function () {
    expect(Panel::make('test')->tenant('App\\Models\\Team')->hasTenantMenu())->toBeTrue();
});

it('can disable tenantMenu even with tenancy', function () {
    $panel = Panel::make('test')->tenant('App\\Models\\Team')->tenantMenu(false);

    expect($panel->hasTenantMenu())->toBeFalse();
});

it('has name as default tenantNameAttribute', function () {
    expect(Panel::make('test')->getTenantNameAttribute())->toBe('name');
});

it('can set tenantNameAttribute', function () {
    expect(Panel::make('test')->tenantNameAttribute('title')->getTenantNameAttribute())->toBe('title');
});

it('has empty tenantMenuItems by default', function () {
    expect(Panel::make('test')->getTenantMenuItems())->toBe([]);
});

it('can set tenantMenuItems', function () {
    $items = [\Primix\Navigation\TenantMenuItem::make()->label('Settings')];

    expect(Panel::make('test')->tenantMenuItems($items)->getTenantMenuItems())->toBe($items);
});

// ============================================================
// RenderHook
// ============================================================

it('can register render hook and returns static', function () {
    $panel = Panel::make('test');
    $result = $panel->renderHook('test-hook', fn () => '<div>hook</div>');

    expect($result)->toBe($panel);
});
