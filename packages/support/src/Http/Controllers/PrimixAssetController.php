<?php

namespace Primix\Support\Http\Controllers;

use Illuminate\Http\Response;

class PrimixAssetController
{
    /**
     * Serve the main Primix script.
     */
    public function script(): Response
    {
        $path = __DIR__ . '/../../../../primix/dist/primix.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix stylesheet (Tailwind CSS with PrimeVue).
     */
    public function style(): Response
    {
        $path = __DIR__ . '/../../../../primix/dist/primix.css';
        if (! file_exists($path)) {
            $path = __DIR__ . '/../../../dist/primix-support.css';
        }

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve chunk files.
     */
    public function chunk(string $filename): Response
    {
        // Sanitize filename to prevent directory traversal
        $filename = basename($filename);
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $contentType = match ($extension) {
            'js' => 'application/javascript',
            'css' => 'text/css',
            default => abort(404, 'Unsupported chunk asset type.'),
        };

        $chunkDirs = [
            __DIR__ . '/../../../dist/chunks',
            __DIR__ . '/../../../../forms/dist/chunks',
            __DIR__ . '/../../../../tables/dist/chunks',
            __DIR__ . '/../../../../actions/dist/chunks',
            __DIR__ . '/../../../../notifications/dist/chunks',
            __DIR__ . '/../../../../widgets/dist/chunks',
            __DIR__ . '/../../../../primix/dist/chunks',
        ];

        foreach ($chunkDirs as $dir) {
            $path = $dir . '/' . $filename;
            if (file_exists($path)) {
                return $this->serveFile($path, $contentType);
            }
        }

        abort(404, "Primix chunk not found: {$filename}");
    }

    /**
     * Serve the Primix support script.
     */
    public function support(): Response
    {
        $path = __DIR__ . '/../../../dist/primix-support.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix support stylesheet.
     */
    public function supportStyle(): Response
    {
        $path = __DIR__ . '/../../../dist/primix-support.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve the Primix forms script.
     */
    public function forms(): Response
    {
        $path = __DIR__ . '/../../../../forms/dist/primix-forms.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix forms stylesheet.
     */
    public function formsStyle(): Response
    {
        $path = __DIR__ . '/../../../../forms/dist/primix-forms.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve the Primix tables script.
     */
    public function tables(): Response
    {
        $path = __DIR__ . '/../../../../tables/dist/primix-tables.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix tables stylesheet.
     */
    public function tablesStyle(): Response
    {
        $path = __DIR__ . '/../../../../tables/dist/primix-tables.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve the Primix actions script.
     */
    public function actions(): Response
    {
        $path = __DIR__ . '/../../../../actions/dist/primix-actions.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix actions stylesheet.
     */
    public function actionsStyle(): Response
    {
        $path = __DIR__ . '/../../../../actions/dist/primix-actions.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve the Primix notifications script.
     */
    public function notifications(): Response
    {
        $path = __DIR__ . '/../../../../notifications/dist/primix-notifications.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix notifications stylesheet.
     */
    public function notificationsStyle(): Response
    {
        $path = __DIR__ . '/../../../../notifications/dist/primix-notifications.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve the Primix widgets script.
     */
    public function widgets(): Response
    {
        $path = __DIR__ . '/../../../../widgets/dist/primix-widgets.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix widgets stylesheet.
     */
    public function widgetsStyle(): Response
    {
        $path = __DIR__ . '/../../../../widgets/dist/primix-widgets.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve the Primix panels script.
     */
    public function panels(): Response
    {
        $path = __DIR__ . '/../../../../primix/dist/primix-panels.js';

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the Primix panels stylesheet.
     */
    public function panelsStyle(): Response
    {
        $path = __DIR__ . '/../../../../primix/dist/primix-panels.css';

        return $this->serveFile($path, 'text/css');
    }

    /**
     * Serve a file with caching headers.
     */
    protected function serveFile(string $path, string $contentType): Response
    {
        if (! file_exists($path)) {
            abort(404, "Primix asset not found. Run 'npm run build' in packages/primix/");
        }

        $content = file_get_contents($path);
        $lastModified = filemtime($path);
        $etag = md5($content);

        return response($content)
            ->header('Content-Type', $contentType)
            ->header('Cache-Control', app()->environment('production') ? 'public, max-age=31536000' : 'no-cache')
            ->header('Last-Modified', gmdate('D, d M Y H:i:s', $lastModified) . ' GMT')
            ->header('ETag', '"' . $etag . '"');
    }
}
