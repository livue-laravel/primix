<?php

use Illuminate\Filesystem\Filesystem;
use Primix\Commands\MakeResourceCommand;
use Symfony\Component\Console\Input\ArrayInput;

function callProtectedMethod(object $object, string $method, array $arguments = []): mixed
{
    $reflection = new ReflectionClass($object);
    $methodRef = $reflection->getMethod($method);
    $methodRef->setAccessible(true);

    return $methodRef->invokeArgs($object, $arguments);
}

function setProtectedProperty(object $object, string $property, mixed $value): void
{
    $reflection = new ReflectionClass($object);
    $propertyRef = $reflection->getProperty($property);
    $propertyRef->setAccessible(true);
    $propertyRef->setValue($object, $value);
}

it('converts a generated laravel model to primix base model', function () {
    $filesystem = app(Filesystem::class);
    $command = new MakeResourceCommand($filesystem);
    $command->setLaravel(app());

    $tmpRoot = sys_get_temp_dir() . '/primix-model-test-' . uniqid();
    $modelsDir = $tmpRoot . '/Models';
    $modelPath = $modelsDir . '/Post.php';

    $filesystem->ensureDirectoryExists($modelsDir);

    $filesystem->put($modelPath, <<<'PHP'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
}
PHP
    );

    setProtectedProperty($command, 'input', new ArrayInput([
        'name' => ['Post'],
    ], $command->getDefinition()));

    app()->useAppPath($tmpRoot);

    try {
        callProtectedMethod($command, 'convertGeneratedModelToPrimixBase');
    } finally {
        app()->useAppPath(base_path('app'));
    }

    $updated = $filesystem->get($modelPath);

    expect($updated)->toContain('use Primix\\Support\\Models\\Model as PrimixModel;')
        ->and($updated)->toContain('class Post extends PrimixModel')
        ->and($updated)->not->toContain('use Illuminate\\Database\\Eloquent\\Model;');

    $filesystem->deleteDirectory($tmpRoot);
});

it('does not modify models that are already customized', function () {
    $filesystem = app(Filesystem::class);
    $command = new MakeResourceCommand($filesystem);
    $command->setLaravel(app());

    $tmpRoot = sys_get_temp_dir() . '/primix-model-test-' . uniqid();
    $modelsDir = $tmpRoot . '/Models';
    $modelPath = $modelsDir . '/Post.php';

    $filesystem->ensureDirectoryExists($modelsDir);

    $original = <<<'PHP'
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Some\Custom\BaseModel;

class Post extends BaseModel
{
    use HasFactory;
}
PHP;

    $filesystem->put($modelPath, $original);

    setProtectedProperty($command, 'input', new ArrayInput([
        'name' => ['Post'],
    ], $command->getDefinition()));

    app()->useAppPath($tmpRoot);

    try {
        callProtectedMethod($command, 'convertGeneratedModelToPrimixBase');
    } finally {
        app()->useAppPath(base_path('app'));
    }

    expect($filesystem->get($modelPath))->toBe($original);

    $filesystem->deleteDirectory($tmpRoot);
});

