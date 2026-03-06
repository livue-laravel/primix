<?php

use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Tests\Fixtures\Post;

it('has tenant relationship', function () {
    $tenant = Tenant::create();

    Tenancy::initialize($tenant);
    $post = Post::create(['title' => 'Test']);
    Tenancy::end();

    expect($post->tenant)->toBeInstanceOf(Tenant::class);
    expect($post->tenant->id)->toBe($tenant->id);
});
