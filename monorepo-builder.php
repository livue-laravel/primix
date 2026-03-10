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
use Symplify\MonorepoBuilder\Release\ReleaseWorker\UpdateReplaceReleaseWorker;

return static function (MBConfig $mbConfig): void {
    // Dove cercare i package
    $mbConfig->packageDirectories([
        __DIR__ . '/packages',
    ]);

    // Sezioni da unire nei composer.json dei package
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

    // Dipendenze da rimuovere dal merge (sono gestite singolarmente)
    $mbConfig->dataToRemove([
        'require-dev' => [
            'symplify/monorepo-builder' => '*',
        ],
    ]);

    // Worker per il processo di release
    $mbConfig->workers([
        // Prima aggiorna le versioni delle dipendenze interne
        SetCurrentMutualDependenciesReleaseWorker::class,
        // Aggiorna il replace nel root composer.json
        UpdateReplaceReleaseWorker::class,
        // Crea il tag
        TagVersionReleaseWorker::class,
        // Push del tag
        PushTagReleaseWorker::class,
        // Imposta le versioni dev per il prossimo sviluppo
        SetNextMutualDependenciesReleaseWorker::class,
        // Aggiorna il branch alias
        UpdateBranchAliasReleaseWorker::class,
        // Push delle modifiche dev
        PushNextDevReleaseWorker::class,
    ]);
};
