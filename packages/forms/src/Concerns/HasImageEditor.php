<?php

namespace Primix\Forms\Concerns;

use Closure;

trait HasImageEditor
{
    protected bool|Closure $hasImageEditor = false;

    // Feature toggles
    protected bool|Closure $imageEditorCanCrop = true;

    protected bool|Closure $imageEditorCanRotate = true;

    protected bool|Closure $imageEditorCanFlip = true;

    protected bool|Closure $imageEditorCanZoom = true;

    protected bool|Closure $imageEditorCanAdjust = true;

    protected bool|Closure $imageEditorCanFilter = true;

    // Crop configuration
    protected array|Closure $imageEditorAspectRatios = [];

    protected string|Closure|null $imageEditorDefaultAspectRatio = null;

    // AI features
    protected array|Closure $imageEditorAiFeatures = [];

    // Output configuration
    protected string|Closure $imageEditorOutputFormat = 'original';

    protected float|Closure $imageEditorOutputQuality = 0.92;

    protected int|Closure|null $imageEditorMaxWidth = null;

    protected int|Closure|null $imageEditorMaxHeight = null;

    // Modal configuration
    protected string|Closure $imageEditorModalWidth = '5xl';

    protected string|Closure|null $imageEditorModalHeading = null;

    public function imageEditor(bool|Closure $condition = true): static
    {
        $this->hasImageEditor = $condition;

        return $this;
    }

    public function imageEditorAspectRatios(array|Closure $ratios): static
    {
        $this->imageEditorAspectRatios = $ratios;

        return $this;
    }

    public function imageEditorDefaultAspectRatio(string|Closure|null $ratio): static
    {
        $this->imageEditorDefaultAspectRatio = $ratio;

        return $this;
    }

    public function imageEditorDisableCrop(bool|Closure $condition = true): static
    {
        $this->imageEditorCanCrop = is_bool($condition) ? ! $condition : fn () => ! $this->evaluate($condition);

        return $this;
    }

    public function imageEditorDisableRotate(bool|Closure $condition = true): static
    {
        $this->imageEditorCanRotate = is_bool($condition) ? ! $condition : fn () => ! $this->evaluate($condition);

        return $this;
    }

    public function imageEditorDisableFlip(bool|Closure $condition = true): static
    {
        $this->imageEditorCanFlip = is_bool($condition) ? ! $condition : fn () => ! $this->evaluate($condition);

        return $this;
    }

    public function imageEditorDisableZoom(bool|Closure $condition = true): static
    {
        $this->imageEditorCanZoom = is_bool($condition) ? ! $condition : fn () => ! $this->evaluate($condition);

        return $this;
    }

    public function imageEditorDisableAdjustments(bool|Closure $condition = true): static
    {
        $this->imageEditorCanAdjust = is_bool($condition) ? ! $condition : fn () => ! $this->evaluate($condition);

        return $this;
    }

    public function imageEditorDisableFilters(bool|Closure $condition = true): static
    {
        $this->imageEditorCanFilter = is_bool($condition) ? ! $condition : fn () => ! $this->evaluate($condition);

        return $this;
    }

    public function imageEditorAiFeatures(array|Closure $features): static
    {
        $this->imageEditorAiFeatures = $features;

        return $this;
    }

    public function imageEditorOutputFormat(string|Closure $format): static
    {
        $this->imageEditorOutputFormat = $format;

        return $this;
    }

    public function imageEditorOutputQuality(float|Closure $quality): static
    {
        $this->imageEditorOutputQuality = $quality;

        return $this;
    }

    public function imageEditorMaxWidth(int|Closure|null $width): static
    {
        $this->imageEditorMaxWidth = $width;

        return $this;
    }

    public function imageEditorMaxHeight(int|Closure|null $height): static
    {
        $this->imageEditorMaxHeight = $height;

        return $this;
    }

    public function imageEditorModalWidth(string|Closure $width): static
    {
        $this->imageEditorModalWidth = $width;

        return $this;
    }

    public function imageEditorModalHeading(string|Closure|null $heading): static
    {
        $this->imageEditorModalHeading = $heading;

        return $this;
    }

    public function hasImageEditor(): bool
    {
        return (bool) $this->evaluate($this->hasImageEditor) && $this->isImage();
    }

    public function getImageEditorConfig(): array
    {
        if (! $this->hasImageEditor()) {
            return [];
        }

        return [
            'enabled' => true,
            'crop' => [
                'enabled' => (bool) $this->evaluate($this->imageEditorCanCrop),
                'aspectRatios' => $this->evaluate($this->imageEditorAspectRatios) ?: null,
                'defaultAspectRatio' => $this->evaluate($this->imageEditorDefaultAspectRatio),
            ],
            'rotate' => ['enabled' => (bool) $this->evaluate($this->imageEditorCanRotate)],
            'flip' => ['enabled' => (bool) $this->evaluate($this->imageEditorCanFlip)],
            'zoom' => ['enabled' => (bool) $this->evaluate($this->imageEditorCanZoom)],
            'adjustments' => [
                'enabled' => (bool) $this->evaluate($this->imageEditorCanAdjust),
            ],
            'filters' => [
                'enabled' => (bool) $this->evaluate($this->imageEditorCanFilter),
            ],
            'ai' => [
                'features' => $this->evaluate($this->imageEditorAiFeatures) ?: [],
            ],
            'output' => [
                'format' => $this->evaluate($this->imageEditorOutputFormat),
                'quality' => $this->evaluate($this->imageEditorOutputQuality),
                'maxWidth' => $this->evaluate($this->imageEditorMaxWidth),
                'maxHeight' => $this->evaluate($this->imageEditorMaxHeight),
            ],
            'modal' => [
                'width' => $this->evaluate($this->imageEditorModalWidth),
                'heading' => $this->evaluate($this->imageEditorModalHeading) ?? 'Modifica immagine',
            ],
        ];
    }
}
