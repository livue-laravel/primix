<?php

namespace Primix\Forms\ImageEditor;

interface ImageProcessor
{
    /**
     * Process an image and return the result.
     *
     * @param  string  $path  Path to the source image on disk
     * @param  string  $disk  Storage disk name
     * @param  array  $options  Processor-specific options
     * @return array{path: string, disk: string, mimeType: string, size: int}
     */
    public function process(string $path, string $disk, array $options = []): array;
}
