<?php

require_once dirname(__DIR__, 2) . '/src/Commands/MakeUiSidebarCommand.php';

use Illuminate\Container\Container;
use Primix\Commands\MakeUiSidebarCommand;
use Symfony\Component\Console\Input\ArrayInput;

class FakeSidebarConsoleApplication extends Container
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

function callMakeUiSidebarProtected(MakeUiSidebarCommand $command, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($command);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($command, $arguments);
}

function buildMakeUiSidebarCommand(array $input): MakeUiSidebarCommand
{
    $command = new MakeUiSidebarCommand(new \Illuminate\Filesystem\Filesystem());
    $app = new FakeSidebarConsoleApplication();
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

it('normalizes sidebar class name and derives view metadata', function () {
    $command = buildMakeUiSidebarCommand([
        'name' => 'Shop Nav',
    ]);

    expect(callMakeUiSidebarProtected($command, 'getNameInput'))->toBe('ShopNavSidebar')
        ->and(callMakeUiSidebarProtected($command, 'getSidebarViewSlug'))->toBe('shop-nav-sidebar')
        ->and(callMakeUiSidebarProtected($command, 'getSidebarViewName'))->toBe('primix.ui.shop-nav-sidebar')
        ->and(callMakeUiSidebarProtected($command, 'getSidebarTitle'))->toBe('Shop Nav');
});

it('replaces sidebar view placeholder in class stub', function () {
    $command = buildMakeUiSidebarCommand([
        'name' => 'CustomSidebar',
    ]);

    $stub = callMakeUiSidebarProtected($command, 'buildClass', ['App\\Primix\\UI\\CustomSidebar']);

    expect($stub)->toContain('class CustomSidebar extends Sidebar')
        ->and($stub)->toContain("\$this->view('primix.ui.custom-sidebar');");
});

it('builds sidebar blade path inside app resources', function () {
    $command = buildMakeUiSidebarCommand([
        'name' => 'Frontend',
    ]);

    $viewPath = callMakeUiSidebarProtected($command, 'getSidebarViewPath');

    expect($viewPath)->toBe('/tmp/resources/views/primix/ui/frontend-sidebar.blade.php');
});
