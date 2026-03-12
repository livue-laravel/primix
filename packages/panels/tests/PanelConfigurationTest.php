<?php

use Primix\PanelConfiguration;
use Primix\GlobalSearch\GlobalSearchMode;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    expect(PanelConfiguration::make())->toBeInstanceOf(PanelConfiguration::class);
});

it('has empty entries by default', function () {
    expect(PanelConfiguration::make()->getEntries())->toBe([]);
});

// ============================================================
// Entry Structure
// ============================================================

it('entry has method, args, and exclude keys', function () {
    $entry = PanelConfiguration::make()->brandName('Test')->getEntries()[0];

    expect($entry)->toHaveKeys(['method', 'args', 'exclude']);
});

// ============================================================
// Branding
// ============================================================

it('brandName queues correct entry', function () {
    $entry = PanelConfiguration::make()->brandName('My App')->getEntries()[0];

    expect($entry['method'])->toBe('brandName')
        ->and($entry['args'])->toBe(['My App'])
        ->and($entry['exclude'])->toBe([]);
});

it('brandLogo queues entry with 3 args', function () {
    $entry = PanelConfiguration::make()->brandLogo('/default.png', '/light.png', '/dark.png')->getEntries()[0];

    expect($entry['method'])->toBe('brandLogo')
        ->and($entry['args'])->toBe(['/default.png', '/light.png', '/dark.png']);
});

// ============================================================
// UI Options
// ============================================================

it('darkMode queues entry', function () {
    $entry = PanelConfiguration::make()->darkMode(false)->getEntries()[0];

    expect($entry['method'])->toBe('darkMode')
        ->and($entry['args'])->toBe([false]);
});

it('breadcrumbs queues entry', function () {
    $entry = PanelConfiguration::make()->breadcrumbs(false)->getEntries()[0];

    expect($entry['method'])->toBe('breadcrumbs')
        ->and($entry['args'])->toBe([false]);
});

it('spa queues entry', function () {
    $entry = PanelConfiguration::make()->spa(true)->getEntries()[0];

    expect($entry['method'])->toBe('spa')
        ->and($entry['args'])->toBe([true]);
});

// ============================================================
// Auth Pages
// ============================================================

it('login queues entry', function () {
    $entry = PanelConfiguration::make()->login('App\\Pages\\Login')->getEntries()[0];

    expect($entry['method'])->toBe('login')
        ->and($entry['args'])->toBe(['App\\Pages\\Login']);
});

it('login queues default auth page when called without args', function () {
    $entry = PanelConfiguration::make()->login()->getEntries()[0];

    expect($entry['method'])->toBe('login')
        ->and($entry['args'])->toBe([\Primix\Pages\Auth\Login::class]);
});

it('registration queues default auth page when called without args', function () {
    $entry = PanelConfiguration::make()->registration()->getEntries()[0];

    expect($entry['method'])->toBe('registration')
        ->and($entry['args'])->toBe([\Primix\Pages\Auth\Register::class]);
});

it('emailVerification queues default auth page when called without args', function () {
    $entry = PanelConfiguration::make()->emailVerification()->getEntries()[0];

    expect($entry['method'])->toBe('emailVerification')
        ->and($entry['args'])->toBe([
            true,
            \Primix\Pages\Auth\EmailVerificationPrompt::class,
        ]);
});

it('passwordReset queues default auth pages when called without args', function () {
    $entry = PanelConfiguration::make()->passwordReset()->getEntries()[0];

    expect($entry['method'])->toBe('passwordReset')
        ->and($entry['args'])->toBe([
            true,
            \Primix\Pages\Auth\RequestPasswordReset::class,
            \Primix\Pages\Auth\ResetPassword::class,
        ]);
});

// ============================================================
// Modal
// ============================================================

it('stackBasedModals queues entry', function () {
    $entry = PanelConfiguration::make()->stackBasedModals(true)->getEntries()[0];

    expect($entry['method'])->toBe('stackBasedModals')
        ->and($entry['args'])->toBe([true]);
});

it('disableStackBasedModals queues entry with false', function () {
    $entry = PanelConfiguration::make()->disableStackBasedModals()->getEntries()[0];

    expect($entry['method'])->toBe('stackBasedModals')
        ->and($entry['args'])->toBe([false]);
});

// ============================================================
// Middleware
// ============================================================

it('middleware queues as addMiddleware', function () {
    $entry = PanelConfiguration::make()->middleware(['web', 'auth'])->getEntries()[0];

    expect($entry['method'])->toBe('addMiddleware')
        ->and($entry['args'])->toBe([['web', 'auth']]);
});

it('authMiddleware queues as addAuthMiddleware', function () {
    $entry = PanelConfiguration::make()->authMiddleware(['verified'])->getEntries()[0];

    expect($entry['method'])->toBe('addAuthMiddleware')
        ->and($entry['args'])->toBe([['verified']]);
});

// ============================================================
// Exclude
// ============================================================

it('entry without exclude has empty array', function () {
    $entry = PanelConfiguration::make()->darkMode()->getEntries()[0];

    expect($entry['exclude'])->toBe([]);
});

it('entry with exclude preserves exclusion list', function () {
    $entry = PanelConfiguration::make()->darkMode(true, ['admin'])->getEntries()[0];

    expect($entry['exclude'])->toBe(['admin']);
});

// ============================================================
// Accumulation
// ============================================================

it('multiple calls accumulate entries', function () {
    $entries = PanelConfiguration::make()
        ->brandName('App')
        ->darkMode(false)
        ->spa()
        ->getEntries();

    expect($entries)->toHaveCount(3)
        ->and($entries[0]['method'])->toBe('brandName')
        ->and($entries[1]['method'])->toBe('darkMode')
        ->and($entries[2]['method'])->toBe('spa');
});

it('chaining returns same instance', function () {
    $config = PanelConfiguration::make();
    $result = $config->brandName('Test')->darkMode();

    expect($result)->toBe($config);
});

// ============================================================
// RenderHook
// ============================================================

it('renderHook queues entry with correct structure', function () {
    $callback = fn () => '<div>hook</div>';
    $entry = PanelConfiguration::make()->renderHook('test-hook', $callback, ['scope1'])->getEntries()[0];

    expect($entry['method'])->toBe('renderHook')
        ->and($entry['args'][0])->toBe('test-hook')
        ->and($entry['args'][1])->toBe($callback)
        ->and($entry['args'][2])->toBe(['scope1']);
});

// ============================================================
// Colors
// ============================================================

it('primaryColor queues entry', function () {
    $entry = PanelConfiguration::make()->primaryColor('#3b82f6')->getEntries()[0];

    expect($entry['method'])->toBe('primaryColor')
        ->and($entry['args'])->toBe(['#3b82f6']);
});
