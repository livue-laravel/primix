<?php

use Primix\Commands\MakePanelCommand;
use Symfony\Component\Console\Input\ArrayInput;

function callMakePanelProtected(MakePanelCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakePanelCommand(array $input): MakePanelCommand
{
    $command = new MakePanelCommand(app('files'));
    $command->setLaravel(app());

    $arrayInput = new ArrayInput($input, $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $property = $reflection->getProperty('input');
    $property->setAccessible(true);
    $property->setValue($command, $arrayInput);

    return $command;
}

it('normalizes panel provider class and default id/path', function () {
    $command = buildMakePanelCommand([
        'name' => ['Admin'],
    ]);

    expect(callMakePanelProtected($command, 'getPanelBaseName'))->toBe('Admin')
        ->and(callMakePanelProtected($command, 'getPanelProviderClassName'))->toBe('AdminPanelProvider')
        ->and(callMakePanelProtected($command, 'getPanelId'))->toBe('admin')
        ->and(callMakePanelProtected($command, 'getPanelPath'))->toBe('admin');
});

it('builds tenant-aware panel provider when tenant option is set', function () {
    $command = buildMakePanelCommand([
        'name' => ['Admin'],
        '--tenant' => true,
    ]);

    $stub = callMakePanelProtected($command, 'buildClass', ['App\\Providers\\AdminPanelProvider']);

    expect($stub)->toContain('use Primix\\MultiTenant\\Panel\\TenantPanelProvider;')
        ->and($stub)->toContain('class AdminPanelProvider extends TenantPanelProvider')
        ->and($stub)->toContain("->path('admin')");
});

it('adds explicit getId override when custom id differs from provider-derived id', function () {
    $command = buildMakePanelCommand([
        'name' => ['Back', 'Office'],
        '--id' => 'back-office',
        '--path' => 'office',
    ]);

    $stub = callMakePanelProtected($command, 'buildClass', ['App\\Providers\\BackOfficePanelProvider']);

    expect($stub)->toContain("public function getId(): string")
        ->and($stub)->toContain("return 'back-office';")
        ->and($stub)->toContain("->path('office')");
});
