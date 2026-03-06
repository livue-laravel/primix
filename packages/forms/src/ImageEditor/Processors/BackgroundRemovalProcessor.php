<?php

namespace Primix\Forms\ImageEditor\Processors;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Primix\Forms\ImageEditor\ImageProcessor;

class BackgroundRemovalProcessor implements ImageProcessor
{
    public function __construct(
        protected string $driver = 'remove-bg',
        protected ?string $apiKey = null,
    ) {}

    public function process(string $path, string $disk, array $options = []): array
    {
        return match ($this->driver) {
            'remove-bg' => $this->processWithRemoveBg($path, $disk),
            default => throw new \InvalidArgumentException("Unknown background removal driver: {$this->driver}"),
        };
    }

    protected function processWithRemoveBg(string $path, string $disk): array
    {
        if (! $this->apiKey) {
            throw new \RuntimeException('Remove.bg API key is not configured');
        }

        $storage = Storage::disk($disk);
        $imageContents = $storage->get($path);

        $response = Http::withHeaders([
            'X-Api-Key' => $this->apiKey,
        ])->attach(
            'image_file', $imageContents, basename($path)
        )->post('https://api.remove.bg/v1.0/removebg', [
            'size' => 'auto',
        ]);

        if (! $response->successful()) {
            throw new \RuntimeException('Background removal failed: ' . $response->body());
        }

        // Save result as new temp file
        $outputPath = 'livue-tmp/' . Str::random(40) . '.png';
        $outputDisk = config('livue.temp_upload_disk', 'local');

        Storage::disk($outputDisk)->put($outputPath, $response->body());

        return [
            'path' => $outputPath,
            'disk' => $outputDisk,
            'mimeType' => 'image/png',
            'size' => strlen($response->body()),
        ];
    }
}
