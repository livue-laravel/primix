<?php

namespace Primix\Forms\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;
use Primix\Forms\ImageEditor\ImageProcessorRegistry;

class ImageEditorController extends Controller
{
    public function process(Request $request, ImageProcessorRegistry $registry): JsonResponse
    {
        $request->validate([
            'imageUrl' => 'required|string',
            'feature' => 'required|string',
            'options' => 'sometimes|array',
        ]);

        $featureName = $request->input('feature');

        if (! $registry->has($featureName)) {
            return response()->json([
                'error' => "Unknown feature: {$featureName}",
            ], 422);
        }

        $processor = $registry->get($featureName);

        // Resolve the image path from URL
        // The imageUrl could be a temp preview URL or a storage URL
        $imageUrl = $request->input('imageUrl');
        $resolved = $this->resolveImagePath($imageUrl);

        if (! $resolved) {
            return response()->json([
                'error' => 'Could not resolve image path',
            ], 422);
        }

        try {
            $result = $processor->process(
                $resolved['path'],
                $resolved['disk'],
                $request->input('options', [])
            );

            // Generate a preview URL for the processed image
            $previewUrl = $this->generatePreviewUrl($result['path'], $result['disk']);

            return response()->json([
                'previewUrl' => $previewUrl,
                'mimeType' => $result['mimeType'],
                'size' => $result['size'],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    protected function resolveImagePath(string $url): ?array
    {
        // Handle /storage/ URLs (public disk)
        if (str_starts_with($url, '/storage/')) {
            $path = substr($url, 9); // Remove '/storage/'

            return [
                'path' => $path,
                'disk' => 'public',
            ];
        }

        // Handle LiVue temp preview URLs
        if (str_contains($url, '/livue/upload-preview')) {
            // Extract token from URL
            $parsed = parse_url($url);
            parse_str($parsed['query'] ?? '', $query);

            if (isset($query['token'])) {
                try {
                    $data = decrypt($query['token']);

                    return [
                        'path' => $data['path'] ?? null,
                        'disk' => $data['disk'] ?? config('livue.temp_upload_disk', 'local'),
                    ];
                } catch (\Throwable) {
                    return null;
                }
            }
        }

        return null;
    }

    protected function generatePreviewUrl(string $path, string $disk): string
    {
        // Generate a temporary encrypted URL similar to LiVue's preview system
        $token = encrypt([
            'path' => $path,
            'disk' => $disk,
            'expires' => now()->addMinutes(30)->timestamp,
        ]);

        return '/livue/upload-preview?token=' . urlencode($token);
    }
}
