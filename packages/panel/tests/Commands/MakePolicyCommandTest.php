<?php

use Primix\Commands\MakePolicyCommand;
use Symfony\Component\Console\Input\ArrayInput;

function callMakePolicyProtected(MakePolicyCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakePolicyCommand(array $input): MakePolicyCommand
{
    $command = new MakePolicyCommand(app('files'));
    $command->setLaravel(app());

    $arrayInput = new ArrayInput($input, $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $property = $reflection->getProperty('input');
    $property->setAccessible(true);
    $property->setValue($command, $arrayInput);

    return $command;
}

it('normalizes policy class name and infers model when model option is missing', function () {
    $command = buildMakePolicyCommand([
        'name' => 'Post',
    ]);

    expect(callMakePolicyProtected($command, 'getNameInput'))->toBe('PostPolicy')
        ->and(callMakePolicyProtected($command, 'resolveModelClass'))->toBe('App\\Models\\Post');
});

it('resolves explicit model option for policy generation', function () {
    $command = buildMakePolicyCommand([
        'name' => 'OrderPolicy',
        '--model' => 'Domain\\Sales\\Order',
    ]);

    expect(callMakePolicyProtected($command, 'resolveModelClass'))->toBe('Domain\\Sales\\Order');
});

it('replaces model and user placeholders in policy stub', function () {
    $command = buildMakePolicyCommand([
        'name' => 'Invoice',
        '--model' => 'Accounting\\Invoice',
    ]);

    $stub = callMakePolicyProtected($command, 'buildClass', ['App\\Policies\\InvoicePolicy']);

    expect($stub)->toContain('use Accounting\\Invoice;')
        ->and($stub)->toContain('use App\\Models\\User;')
        ->and($stub)->toContain('public function update(User $user, Invoice $record): bool');
});
