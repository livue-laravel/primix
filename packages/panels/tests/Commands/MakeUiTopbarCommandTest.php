<?php

require_once dirname(__DIR__, 2) . '/src/Commands/MakeUiTopbarCommand.php';

use Illuminate\Container\Container;
use Primix\Commands\MakeUiTopbarCommand;
use Symfony\Component\Console\Input\ArrayInput;

class FakeConsoleApplication extends Container
{
    public function getNamespace(): string
    {
        return 'App\\';
    }

    public function resourcePath($path = ''): string
    {
        $base = '/tmp/resources';

        return $path ? $base . '/' . $path : $base;
    }
}

function callMakeUiTopbarProtected(MakeUiTopbarCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakeUiTopbarCommand(array $input): MakeUiTopbarCommand
{
    $command = new MakeUiTopbarCommand(new \Illuminate\Filesystem\Filesystem());
    $app = new FakeConsoleApplication();
    $app->instance('config', new \Illuminate\Config\Repository([
        'auth' => [
            'defaults' => ['guard' => 'web'],
            'guards' => ['web' => ['provider' => 'users']],
            'providers' => ['users' => ['model' => 'App\\Models\\User']],
        ],
    ]));

    Container::setInstance($app);
    $command->setLaravel($app);

    $arrayInput = new ArrayInput($input, $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $property = $reflection->getProperty('input');
    $property->setAccessible(true);
    $property->setValue($command, $arrayInput);

    return $command;
}

it('normalizes topbar class name and derives view metadata', function () {
    $command = buildMakeUiTopbarCommand([
        'name' => 'Shop Header',
    ]);

    expect(callMakeUiTopbarProtected($command, 'getNameInput'))->toBe('ShopHeaderTopbar')
        ->and(callMakeUiTopbarProtected($command, 'getTopbarViewSlug'))->toBe('shop-header-topbar')
        ->and(callMakeUiTopbarProtected($command, 'getTopbarViewName'))->toBe('primix.ui.shop-header-topbar')
        ->and(callMakeUiTopbarProtected($command, 'getTopbarTitle'))->toBe('Shop Header');
});

it('replaces topbar view placeholder in class stub', function () {
    $command = buildMakeUiTopbarCommand([
        'name' => 'CustomTopbar',
    ]);

    $stub = callMakeUiTopbarProtected($command, 'buildClass', ['App\\Primix\\UI\\CustomTopbar']);

    expect($stub)->toContain('class CustomTopbar extends Topbar')
        ->and($stub)->toContain("\$this->view('primix.ui.custom-topbar');");
});

it('builds topbar blade path inside app resources', function () {
    $command = buildMakeUiTopbarCommand([
        'name' => 'Frontend',
    ]);

    $viewPath = callMakeUiTopbarProtected($command, 'getTopbarViewPath');

    expect($viewPath)->toBe('/tmp/resources/views/primix/ui/frontend-topbar.blade.php');
});
