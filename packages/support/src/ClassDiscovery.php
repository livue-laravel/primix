<?php

namespace Primix\Support;

use Symfony\Component\Finder\Finder;

class ClassDiscovery
{
    /**
     * Discover classes in a directory that extend a given base class.
     *
     * @param  string  $directory  Absolute path to scan
     * @param  string  $namespace  PSR-4 namespace prefix for the directory
     * @param  string  $baseClass  FQCN that discovered classes must extend
     * @param  array<class-string>  $excludeClasses  Classes to exclude from results
     * @return array<class-string>
     */
    public static function discover(string $directory, string $namespace, string $baseClass, array $excludeClasses = []): array
    {
        if (! is_dir($directory)) {
            return [];
        }

        $namespace = str($namespace)->finish('\\')->toString();

        $classes = [];

        $files = (new Finder())
            ->files()
            ->name('*.php')
            ->in($directory);

        foreach ($files as $file) {
            $relativePath = str($file->getRelativePathname())
                ->replace('/', '\\')
                ->replaceLast('.php', '')
                ->toString();

            $class = $namespace . $relativePath;

            if (! class_exists($class)) {
                continue;
            }

            $reflection = new \ReflectionClass($class);

            if ($reflection->isAbstract()) {
                continue;
            }

            if (! $reflection->isSubclassOf($baseClass)) {
                continue;
            }

            if (in_array($class, $excludeClasses, true)) {
                continue;
            }

            $classes[] = $class;
        }

        return $classes;
    }
}
