<?php

namespace Primix\Forms\ImageEditor\Processors;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Primix\Forms\ImageEditor\ImageProcessor;

class UpscaleProcessor implements ImageProcessor
{
    public function __construct(
        protected string $driver = 'replicate',
        protected ?string $apiToken = null,
    ) {}

    public function process(string $path, string $disk, array $options = []): array
    {
        return match ($this->driver) {
            'replicate' => $this->processWithReplicate($path, $disk, $options),
            default => throw new \InvalidArgumentException("Unknown upscale driver: {$this->driver}"),
        };
    }

    protected function processWithReplicate(string $path, string $disk, array $options): array
    {
        if (! $this->apiToken) {
            throw new \RuntimeException('Replicate API token is not configured');
        }

        $storage = Storage::disk($disk);
        $imageContents = $storage->get($path);
        $base64 = 'data:image/png;base64,' . base64_encode($imageContents);

        $scale = $options['scale'] ?? 2;

        // Create prediction
        $response = Http::withToken($this->apiToken)
            ->post('https://api.replicate.com/v1/predictions', [
                'version' => 'f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa',
                'input' => [
                    'image' => $base64,
                    'scale' => $scale,
                    'face_enhance' => false,
                ],
            ]);

        if (! $response->successful()) {
            throw new \RuntimeException('Upscale prediction creation failed: ' . $response->body());
        }

        $prediction = $response->json();
        $getUrl = $prediction['urls']['get'];

        // Poll for completion (max 60 seconds)
        $maxAttempts = 30;
        for ($i = 0; $i < $maxAttempts; $i++) {
            sleep(2);

            $statusResponse = Http::withToken($this->apiToken)->get($getUrl);
            $status = $statusResponse->json();

            if ($status['status'] === 'succeeded') {
                $outputUrl = $status['output'];

                // Download the result
                $resultResponse = Http::get($outputUrl);
                $outputContents = $resultResponse->body();

                $outputPath = 'livue-tmp/' . Str::random(40) . '.png';
                $outputDisk = config('livue.temp_upload_disk', 'local');

                Storage::disk($outputDisk)->put($outputPath, $outputContents);

                return [
                    'path' => $outputPath,
                    'disk' => $outputDisk,
                    'mimeType' => 'image/png',
                    'size' => strlen($outputContents),
                ];
            }

            if ($status['status'] === 'failed') {
                throw new \RuntimeException('Upscale failed: ' . ($status['error'] ?? 'Unknown error'));
            }
        }

        throw new \RuntimeException('Upscale timed out after 60 seconds');
    }
}
