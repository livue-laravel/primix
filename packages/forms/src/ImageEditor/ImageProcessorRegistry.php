<?php

namespace Primix\Forms\ImageEditor;

class ImageProcessorRegistry
{
    protected array $processors = [];

    public function register(string $name, ImageProcessor $processor): void
    {
        $this->processors[$name] = $processor;
    }

    public function get(string $name): ?ImageProcessor
    {
        return $this->processors[$name] ?? null;
    }

    public function has(string $name): bool
    {
        return isset($this->processors[$name]);
    }

    public function registered(): array
    {
        return array_keys($this->processors);
    }
}
