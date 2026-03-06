<?php

use Illuminate\Http\Request;
use Primix\MultiTenant\Middleware\PreventAccessFromCentralDomains;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

it('blocks central domain access', function () {
    config(['multi-tenant.central_domains' => ['localhost']]);

    $middleware = new PreventAccessFromCentralDomains();
    $request = Request::create('http://localhost/tenant-route');

    $middleware->handle($request, fn () => null);
})->throws(NotFoundHttpException::class);

it('allows non-central domain access', function () {
    config(['multi-tenant.central_domains' => ['localhost']]);

    $middleware = new PreventAccessFromCentralDomains();
    $request = Request::create('http://acme.test/tenant-route');

    $called = false;
    $middleware->handle($request, function () use (&$called) {
        $called = true;
        return new \Illuminate\Http\Response();
    });

    expect($called)->toBeTrue();
});
