<?php

use Primix\Commands\MakeDashboardCommand;
use Symfony\Component\Console\Input\ArrayInput;

function callMakeDashboardProtected(MakeDashboardCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakeDashboardCommand(array $input): MakeDashboardCommand
{
    $command = new MakeDashboardCommand(app('files'));
    $command->setLaravel(app());

    $arrayInput = new ArrayInput($input, $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $property = $reflection->getProperty('input');
    $property->setAccessible(true);
    $property->setValue($command, $arrayInput);

    return $command;
}

it('uses Dashboard as default class name', function () {
    $command = buildMakeDashboardCommand([
        'name' => 'Dashboard',
    ]);

    expect(callMakeDashboardProtected($command, 'getNameInput'))->toBe('Dashboard')
        ->and(callMakeDashboardProtected($command, 'getDashboardTitle'))->toBe('Dashboard');
});

it('appends Dashboard suffix and computes title from class name', function () {
    $command = buildMakeDashboardCommand([
        'name' => 'Sales',
    ]);

    expect(callMakeDashboardProtected($command, 'getNameInput'))->toBe('SalesDashboard')
        ->and(callMakeDashboardProtected($command, 'getDashboardTitle'))->toBe('Sales Dashboard');
});

it('replaces title placeholder in dashboard stub', function () {
    $command = buildMakeDashboardCommand([
        'name' => 'Operations Dashboard',
    ]);

    $stub = callMakeDashboardProtected($command, 'buildClass', ['App\\Primix\\Pages\\OperationsDashboard']);

    expect($stub)->toContain("class OperationsDashboard extends BaseDashboard")
        ->and($stub)->toContain("protected ?string \$title = 'Operations Dashboard';");
});
