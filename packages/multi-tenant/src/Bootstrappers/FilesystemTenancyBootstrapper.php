<?php

namespace Primix\MultiTenant\Bootstrappers;

use Primix\MultiTenant\Contracts\TenantBootstrapper;
use Primix\MultiTenant\Contracts\TenantContract;

class FilesystemTenancyBootstrapper implements TenantBootstrapper
{
    protected ?string $originalStorageRoot = null;

    protected array $originalDiskConfigs = [];

    public function bootstrap(TenantContract $tenant): void
    {
        $tenantKey = $tenant->getTenantKey();

        $this->originalStorageRoot = config('filesystems.disks.local.root');
        $this->originalDiskConfigs = [
            'local' => config('filesystems.disks.local'),
            'public' => config('filesystems.disks.public'),
        ];

        $suffix = DIRECTORY_SEPARATOR . 'tenant' . DIRECTORY_SEPARATOR . $tenantKey;

        config([
            'filesystems.disks.local.root' => storage_path('app') . $suffix,
            'filesystems.disks.public.root' => storage_path('app/public') . $suffix,
            'filesystems.disks.public.url' => config('filesystems.disks.public.url') . '/tenant/' . $tenantKey,
        ]);
    }

    public function revert(): void
    {
        if (! empty($this->originalDiskConfigs)) {
            foreach ($this->originalDiskConfigs as $disk => $config) {
                config(["filesystems.disks.{$disk}" => $config]);
            }
        }

        $this->originalStorageRoot = null;
        $this->originalDiskConfigs = [];
    }
}
