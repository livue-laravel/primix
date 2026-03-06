<?php

use Primix\Actions\Commands\MakeActionCommand;
use Illuminate\Config\Repository;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Input\ArrayInput;

function callMakeActionProtected(MakeActionCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakeActionCommand(array $input): MakeActionCommand
{
    $command = new MakeActionCommand(new Filesystem());

    $app = app();

    if (! $app->bound('config')) {
        $app->instance('config', new Repository([
            'auth' => [
                'defaults' => ['guard' => 'web'],
                'guards' => ['web' => ['provider' => 'users']],
                'providers' => ['users' => ['model' => 'App\\Models\\User']],
            ],
        ]));
    }

    $command->setLaravel($app);

    $arrayInput = new ArrayInput($input, $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $property = $reflection->getProperty('input');
    $property->setAccessible(true);
    $property->setValue($command, $arrayInput);

    return $command;
}

it('normalizes action class and default name', function () {
    $command = buildMakeActionCommand([
        'name' => 'archive post',
    ]);

    expect(callMakeActionProtected($command, 'getNameInput'))->toBe('ArchivePostAction')
        ->and(callMakeActionProtected($command, 'getDefaultActionName'))->toBe('archivePost')
        ->and(callMakeActionProtected($command, 'getActionLabel'))->toBe('Archive Post');
});

it('builds standard action stub', function () {
    $command = buildMakeActionCommand([
        'name' => 'Export',
    ]);

    $stub = callMakeActionProtected($command, 'buildClass', ['App\\Primix\\Actions\\ExportAction']);

    expect($stub)->toContain('class ExportAction extends Action')
        ->and($stub)->toContain("return 'export';")
        ->and($stub)->toContain("\$this->label('Export');");
});

it('builds bulk action stub when bulk option is set', function () {
    $command = buildMakeActionCommand([
        'name' => 'Delete selected',
        '--bulk' => true,
    ]);

    $stub = callMakeActionProtected($command, 'buildClass', ['App\\Primix\\Actions\\DeleteSelectedAction']);

    expect($stub)->toContain('class DeleteSelectedAction extends BulkAction')
        ->and($stub)->toContain('$records = $this->getRecords();');
});
