<?php

declare(strict_types=1);

use Symplify\MonorepoBuilder\Config\MBConfig;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\AddTagToChangelogReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\PushNextDevReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\PushTagReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\SetCurrentMutualDependenciesReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\SetNextMutualDependenciesReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\TagVersionReleaseWorker;
use Symplify\MonorepoBuilder\Release\ReleaseWorker\UpdateBranchAliasReleaseWorker;

return static function (MBConfig $mbConfig): void {
    // Directories to discover packages from
    $mbConfig->packageDirectories([
        __DIR__ . '/packages',
    ]);

    // Sections to merge into package composer.json files
    $mbConfig->dataToAppend([
        'authors' => [
            [
                'name' => 'cCast',
                'email' => 'software@ccast.it',
            ],
        ],
        'require' => [
            'php' => '^8.2',
            'livue/livue' => '^1.5.0'
        ],
    ]);

    // Dependencies to remove from merge (managed individually per package)
    $mbConfig->dataToRemove([
        'require-dev' => [
            'symplify/monorepo-builder' => '*',
        ],
    ]);

    // Workers for the release process
    $mbConfig->workers([
        // First, update internal dependency versions
        SetCurrentMutualDependenciesReleaseWorker::class,
        // Create the tag
        TagVersionReleaseWorker::class,
        // Push the tag
        PushTagReleaseWorker::class,
        // Set dev versions for next development cycle
        SetNextMutualDependenciesReleaseWorker::class,
        // Update the branch alias
        UpdateBranchAliasReleaseWorker::class,
        // Push dev changes
        PushNextDevReleaseWorker::class,
    ]);
};
