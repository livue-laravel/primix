<?php

use Primix\Commands\MakeResourceCommand;
use Symfony\Component\Console\Input\ArrayInput;

function invokeCommandMethod(MakeResourceCommand $command, string $methodName): mixed
{
    $reflection = new ReflectionClass($command);
    $method = $reflection->getMethod($methodName);
    $method->setAccessible(true);

    return $method->invoke($command);
}

function buildCommandWithNameArgument(string|array $name): MakeResourceCommand
{
    $command = new MakeResourceCommand(app('files'));
    $command->setLaravel(app());

    $input = new ArrayInput(['name' => $name], $command->getDefinition());

    $reflection = new ReflectionClass($command);
    $inputProperty = $reflection->getProperty('input');
    $inputProperty->setAccessible(true);
    $inputProperty->setValue($command, $input);

    return $command;
}

it('normalizes resource names with laravel studly conventions', function (string|array $input, string $expectedBase) {
    $command = buildCommandWithNameArgument($input);

    $baseName = invokeCommandMethod($command, 'getEntityBaseName');
    $resourceName = invokeCommandMethod($command, 'getResourceClassName');
    $modelName = invokeCommandMethod($command, 'getModelName');

    expect($baseName)->toBe($expectedBase)
        ->and($resourceName)->toBe($expectedBase . 'Resource')
        ->and($modelName)->toBe($expectedBase);
})->with([
    'Studly resource' => ['PostResource', 'Post'],
    'Studly compound resource' => ['PostCommentResource', 'PostComment'],
    'kebab case resource' => ['post-resource', 'Post'],
    'kebab compound resource' => ['product-variant-resource', 'ProductVariant'],
    'snake case resource' => ['post_comment_resource', 'PostComment'],
    'plain word' => ['post', 'Post'],
    'multiple words as separate args' => [['product', 'variant'], 'ProductVariant'],
    'multiple words including resource suffix' => [['product', 'variant', 'resource'], 'ProductVariant'],
]);

it('keeps deprecated --generate option available for backward compatibility', function () {
    $command = new MakeResourceCommand(app('files'));

    expect($command->getDefinition()->hasOption('generate'))->toBeTrue();
});
