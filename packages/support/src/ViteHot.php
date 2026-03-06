<?php

namespace Primix\Support;

use Illuminate\Foundation\Vite;

class ViteHot
{
    protected static ?bool $isRunning = null;

    /**
     * Prepare Vite mode for the current request.
     *
     * If a stale public/hot file exists but the dev server is unreachable,
     * force Vite to use a non-existing hot file path so Laravel falls back
     * to manifest-based build assets.
     */
    public static function prepare(): bool
    {
        if (self::$isRunning !== null) {
            return self::$isRunning;
        }

        $hotFile = public_path('hot');

        if (! is_file($hotFile)) {
            return self::$isRunning = false;
        }

        $hotUrl = trim((string) @file_get_contents($hotFile));

        if ($hotUrl === '' || ! self::isViteServerResponsive($hotUrl)) {
            app(Vite::class)->useHotFile(storage_path('framework/primix.vite.hot.disabled'));

            return self::$isRunning = false;
        }

        return self::$isRunning = true;
    }

    public static function isRunning(): bool
    {
        return self::prepare();
    }

    protected static function isViteServerResponsive(string $hotUrl): bool
    {
        $clientUrl = rtrim($hotUrl, '/') . '/@vite/client';

        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => 0.35,
                'ignore_errors' => true,
                'header' => "Accept: text/javascript\r\nConnection: close\r\n",
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ],
        ]);

        $stream = @fopen($clientUrl, 'r', false, $context);

        if (! is_resource($stream)) {
            return false;
        }

        $meta = stream_get_meta_data($stream);
        $headers = $meta['wrapper_data'] ?? [];
        $statusLine = is_array($headers) && isset($headers[0]) ? (string) $headers[0] : '';

        stream_set_timeout($stream, 0, 350000);
        $chunk = fread($stream, 1);
        $meta = stream_get_meta_data($stream);
        fclose($stream);

        if (($meta['timed_out'] ?? false) === true) {
            return false;
        }

        if (! preg_match('/^HTTP\/\d+\.\d+\s+(200|304)\b/', $statusLine)) {
            return false;
        }

        return $chunk !== false && $chunk !== '';
    }
}
