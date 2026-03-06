<?php

use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Tests\Fixtures\User;

it('has tenants many-to-many relationship', function () {
    $user = User::create(['name' => 'John', 'email' => 'john@test.com']);
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    $user->tenants()->attach([$tenant1->id, $tenant2->id]);

    expect($user->tenants)->toHaveCount(2);
    expect($user->tenants->pluck('id')->toArray())->toBe([$tenant1->id, $tenant2->id]);
});
