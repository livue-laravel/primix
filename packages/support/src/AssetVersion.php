<?php

namespace Primix\Support;

use Composer\InstalledVersions;

final class AssetVersion
{
    public static function resolve(): string
    {
        static $version = null;

        if (is_string($version) && $version !== '') {
            return $version;
        }

        $forcedVersion = env('PRIMIX_ASSET_VERSION');

        if (is_string($forcedVersion) && $forcedVersion !== '') {
            $version = $forcedVersion;

            return $version;
        }

        $packageJsonPath = base_path('packages/primix/package.json');

        if (is_file($packageJsonPath)) {
            $packageJson = json_decode((string) file_get_contents($packageJsonPath), true);
            $resolvedVersion = is_array($packageJson) ? ($packageJson['version'] ?? null) : null;

            if (is_string($resolvedVersion) && $resolvedVersion !== '') {
                $version = $resolvedVersion;

                return $version;
            }
        }

        foreach (['primix/support', 'primix/primix'] as $package) {
            try {
                $composerVersion = InstalledVersions::getPrettyVersion($package);
            } catch (\OutOfBoundsException) {
                continue;
            }

            if (is_string($composerVersion) && $composerVersion !== '') {
                $version = ltrim($composerVersion, 'v');

                return $version;
            }
        }

        $version = 'dev';

        return $version;
    }

    public static function appendToUrl(string $url): string
    {
        $separator = str_contains($url, '?') ? '&' : '?';

        return "{$url}{$separator}v=".self::resolve();
    }
}
