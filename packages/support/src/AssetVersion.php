<?php

namespace Primix\Support;

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

        if (! is_file($packageJsonPath)) {
            $version = 'dev';

            return $version;
        }

        $packageJson = json_decode((string) file_get_contents($packageJsonPath), true);
        $resolvedVersion = is_array($packageJson) ? ($packageJson['version'] ?? null) : null;

        $version = is_string($resolvedVersion) && $resolvedVersion !== ''
            ? $resolvedVersion
            : 'dev';

        return $version;
    }

    public static function appendToUrl(string $url): string
    {
        $separator = str_contains($url, '?') ? '&' : '?';

        return "{$url}{$separator}v=".self::resolve();
    }
}
