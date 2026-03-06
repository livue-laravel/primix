<?php

namespace Primix\Forms\ImageEditor\Processors;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Primix\Forms\ImageEditor\ImageProcessor;

class AutoEnhanceProcessor implements ImageProcessor
{
    public function process(string $path, string $disk, array $options = []): array
    {
        $storage = Storage::disk($disk);
        $imageContents = $storage->get($path);

        // Create GD image from contents
        $image = imagecreatefromstring($imageContents);

        if (! $image) {
            throw new \RuntimeException('Failed to create image from file');
        }

        $width = imagesx($image);
        $height = imagesy($image);

        // Auto levels: analyze histogram and stretch contrast
        $this->autoLevels($image, $width, $height);

        // Slight sharpening
        $matrix = [
            [0, -0.5, 0],
            [-0.5, 3, -0.5],
            [0, -0.5, 0],
        ];
        imageconvolution($image, $matrix, 1, 0);

        // Save result
        $outputPath = 'livue-tmp/' . Str::random(40) . '.png';
        $outputDisk = config('livue.temp_upload_disk', 'local');

        ob_start();
        imagepng($image, null, 6);
        $outputContents = ob_get_clean();
        imagedestroy($image);

        Storage::disk($outputDisk)->put($outputPath, $outputContents);

        return [
            'path' => $outputPath,
            'disk' => $outputDisk,
            'mimeType' => 'image/png',
            'size' => strlen($outputContents),
        ];
    }

    protected function autoLevels($image, int $width, int $height): void
    {
        // Build histogram
        $histogram = array_fill(0, 256, 0);

        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $rgb = imagecolorat($image, $x, $y);
                $r = ($rgb >> 16) & 0xFF;
                $g = ($rgb >> 8) & 0xFF;
                $b = $rgb & 0xFF;
                $luminance = (int) (0.299 * $r + 0.587 * $g + 0.114 * $b);
                $histogram[$luminance]++;
            }
        }

        // Find 1% and 99% percentiles
        $totalPixels = $width * $height;
        $lowThreshold = $totalPixels * 0.01;
        $highThreshold = $totalPixels * 0.99;

        $low = 0;
        $high = 255;
        $count = 0;

        for ($i = 0; $i < 256; $i++) {
            $count += $histogram[$i];
            if ($count >= $lowThreshold) {
                $low = $i;
                break;
            }
        }

        $count = 0;
        for ($i = 255; $i >= 0; $i--) {
            $count += $histogram[$i];
            if ($count >= ($totalPixels - $highThreshold)) {
                $high = $i;
                break;
            }
        }

        if ($high <= $low) {
            return; // No adjustment needed
        }

        // Apply levels stretch
        $scale = 255.0 / ($high - $low);

        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $rgb = imagecolorat($image, $x, $y);
                $a = ($rgb >> 24) & 0x7F;
                $r = min(255, max(0, (int) ((($rgb >> 16 & 0xFF) - $low) * $scale)));
                $g = min(255, max(0, (int) ((($rgb >> 8 & 0xFF) - $low) * $scale)));
                $b = min(255, max(0, (int) ((($rgb & 0xFF) - $low) * $scale)));

                $color = imagecolorallocatealpha($image, $r, $g, $b, $a);
                imagesetpixel($image, $x, $y, $color);
            }
        }
    }
}
