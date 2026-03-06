<?php

use Primix\MultiTenant\Models\Domain;
use Primix\MultiTenant\Models\Tenant;

it('creates a tenant with name', function () {
    $this->artisan('make:tenant', ['name' => 'Acme Corp'])
        ->expectsQuestion('Domain for this tenant (leave empty to skip)', null)
        ->assertExitCode(0);

    expect(Tenant::count())->toBe(1);
});

it('creates a tenant with domain', function () {
    $this->artisan('make:tenant', ['name' => 'Acme Corp', '--domain' => 'acme.test'])
        ->assertExitCode(0);

    expect(Tenant::count())->toBe(1);
    expect(Domain::count())->toBe(1);
    expect(Domain::first()->domain)->toBe('acme.test');
});
