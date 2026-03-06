<?php

namespace Primix\MultiTenant\Bootstrappers;

use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Support\Facades\Event;
use Primix\MultiTenant\Contracts\TenantBootstrapper;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Facades\Tenancy;

class QueueTenancyBootstrapper implements TenantBootstrapper
{
    protected bool $listenerRegistered = false;

    public function bootstrap(TenantContract $tenant): void
    {
        $this->registerQueueListener();
    }

    public function revert(): void
    {
        // The listener stays registered but won't act without tenant context in the payload
    }

    protected function registerQueueListener(): void
    {
        if ($this->listenerRegistered) {
            return;
        }

        Event::listen(JobProcessing::class, function (JobProcessing $event) {
            $payload = $event->job->payload();

            if (isset($payload['tenant_id'])) {
                $tenantModel = config('multi-tenant.tenant_model');
                $tenant = $tenantModel::find($payload['tenant_id']);

                if ($tenant) {
                    Tenancy::initialize($tenant);
                }
            }
        });

        $this->listenerRegistered = true;
    }
}
