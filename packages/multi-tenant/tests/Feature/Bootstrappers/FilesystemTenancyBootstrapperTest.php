<?php

use Primix\MultiTenant\Bootstrappers\FilesystemTenancyBootstrapper;
use Primix\MultiTenant\Models\Tenant;

it('changes local disk root to tenant path on bootstrap', function () {
    $tenant = Tenant::create();

    $bootstrapper = new FilesystemTenancyBootstrapper();
    $bootstrapper->bootstrap($tenant);

    $expected = storage_path('app') . DIRECTORY_SEPARATOR . 'tenant' . DIRECTORY_SEPARATOR . $tenant->getTenantKey();
    expect(config('filesystems.disks.local.root'))->toBe($expected);

    $bootstrapper->revert();
});

it('restores original disk config on revert', function () {
    $originalRoot = config('filesystems.disks.local.root');
    $tenant = Tenant::create();

    $bootstrapper = new FilesystemTenancyBootstrapper();
    $bootstrapper->bootstrap($tenant);
    $bootstrapper->revert();

    expect(config('filesystems.disks.local.root'))->toBe($originalRoot);
});
