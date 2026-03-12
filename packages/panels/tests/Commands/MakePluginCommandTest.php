<?php

use Primix\Commands\MakePluginCommand;
use Symfony\Component\Console\Input\ArrayInput;

function callMakePluginProtected(MakePluginCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakePluginCommand(array $input): MakePluginCommand
{
    $command = new MakePluginCommand(app('files'));
    $command->setLaravel(app());

    $arrayInput = new ArrayInput($input, $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $property = $reflection->getProperty('input');
    $property->setAccessible(true);
    $property->setValue($command, $arrayInput);

    return $command;
}

it('normalizes plugin class name and id', function () {
    $command = buildMakePluginCommand([
        'name' => 'System Info',
    ]);

    expect(callMakePluginProtected($command, 'getNameInput'))->toBe('SystemInfoPlugin')
        ->and(callMakePluginProtected($command, 'getPluginId'))->toBe('system-info');
});

it('builds plugin class stub with plugin id placeholder replaced', function () {
    $command = buildMakePluginCommand([
        'name' => 'Audit Trail',
    ]);

    $stub = callMakePluginProtected($command, 'buildClass', ['App\\Primix\\Plugins\\AuditTrailPlugin']);

    expect($stub)->toContain('class AuditTrailPlugin implements Plugin')
        ->and($stub)->toContain("return 'audit-trail';");
});
