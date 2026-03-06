<?php

use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Tests\Fixtures\Post;

it('scopes queries to current tenant', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Post::withoutGlobalScopes()->create(['title' => 'Post 1', 'tenant_id' => $tenant1->id]);
    Post::withoutGlobalScopes()->create(['title' => 'Post 2', 'tenant_id' => $tenant1->id]);
    Post::withoutGlobalScopes()->create(['title' => 'Post 3', 'tenant_id' => $tenant2->id]);

    Tenancy::initialize($tenant1);

    expect(Post::count())->toBe(2);
    expect(Post::pluck('title')->toArray())->toBe(['Post 1', 'Post 2']);

    Tenancy::end();
});

it('returns all records when tenancy not initialized', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Post::withoutGlobalScopes()->create(['title' => 'Post 1', 'tenant_id' => $tenant1->id]);
    Post::withoutGlobalScopes()->create(['title' => 'Post 2', 'tenant_id' => $tenant2->id]);

    expect(Post::count())->toBe(2);
});

it('can bypass scope with withoutTenancy', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Post::withoutGlobalScopes()->create(['title' => 'Post 1', 'tenant_id' => $tenant1->id]);
    Post::withoutGlobalScopes()->create(['title' => 'Post 2', 'tenant_id' => $tenant2->id]);

    Tenancy::initialize($tenant1);

    expect(Post::withoutTenancy()->count())->toBe(2);

    Tenancy::end();
});

it('auto-fills tenant_id on creating', function () {
    $tenant = Tenant::create();

    Tenancy::initialize($tenant);

    $post = Post::create(['title' => 'Auto-filled Post']);

    expect($post->tenant_id)->toBe($tenant->id);

    Tenancy::end();
});

it('does not override manually set tenant_id', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Tenancy::initialize($tenant1);

    $post = Post::create(['title' => 'Manual Post', 'tenant_id' => $tenant2->id]);

    expect($post->tenant_id)->toBe($tenant2->id);

    Tenancy::end();
});

it('switches scope when tenant changes', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Post::withoutGlobalScopes()->create(['title' => 'T1 Post', 'tenant_id' => $tenant1->id]);
    Post::withoutGlobalScopes()->create(['title' => 'T2 Post', 'tenant_id' => $tenant2->id]);

    Tenancy::initialize($tenant1);
    expect(Post::count())->toBe(1);
    expect(Post::first()->title)->toBe('T1 Post');

    Tenancy::initialize($tenant2);
    expect(Post::count())->toBe(1);
    expect(Post::first()->title)->toBe('T2 Post');

    Tenancy::end();
});
