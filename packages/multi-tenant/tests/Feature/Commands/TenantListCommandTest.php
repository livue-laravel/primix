<?php

use Primix\MultiTenant\Models\Domain;
use Primix\MultiTenant\Models\Tenant;

it('lists all tenants', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();
    Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant1->id]);

    $this->artisan('tenant:list')
        ->expectsTable(
            ['ID', 'Created At', 'Domains'],
            [
                [$tenant1->id, $tenant1->created_at->toDateTimeString(), 'acme.test'],
                [$tenant2->id, $tenant2->created_at->toDateTimeString(), ''],
            ]
        )
        ->assertExitCode(0);
});

it('shows message when no tenants exist', function () {
    $this->artisan('tenant:list')
        ->assertExitCode(0);
});

it('outputs json when flag is set', function () {
    Tenant::create();

    $this->artisan('tenant:list', ['--json' => true])
        ->assertExitCode(0);
});
