<?php

namespace Primix\MultiTenant\Concerns;

trait UsesCentralConnection
{
    public function getConnectionName()
    {
        return config('multi-tenant.database.central_connection');
    }
}
