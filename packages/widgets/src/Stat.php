<?php

namespace Primix\Widgets;

use Primix\Support\Colors\Color;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColor;
use Primix\Support\Concerns\HasIcon;
use Primix\Support\Concerns\Makeable;

class Stat
{
    use EvaluatesClosures;
    use HasColor;
    use HasIcon;
    use Makeable;

    protected string $label;

    protected mixed $value;

    protected ?string $description = null;

    protected ?string $descriptionIcon = null;

    protected Color|string|null $descriptionColor = null;

    protected ?int $columnSpan = null;

    protected ?array $chart = null;

    protected Color|string|null $chartColor = null;

    public static function make(string $label, mixed $value): static
    {
        $instance = new static();
        $instance->label = $label;
        $instance->value = $value;

        return $instance;
    }

    public function description(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function descriptionIcon(?string $icon, Color|string|null $color = null): static
    {
        $this->descriptionIcon = $icon;
        $this->descriptionColor = $color;

        return $this;
    }

    public function columnSpan(int $span): static
    {
        $this->columnSpan = $span;

        return $this;
    }

    public function chart(?array $data, Color|string|null $color = null): static
    {
        $this->chart = $data;
        $this->chartColor = $color;

        return $this;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getValue(): mixed
    {
        return $this->value;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getDescriptionIcon(): ?string
    {
        return $this->descriptionIcon;
    }

    public function getDescriptionColor(): ?string
    {
        $color = $this->descriptionColor;

        if ($color instanceof Color) {
            return $color->toHex();
        }

        return $color;
    }

    public function getChart(): ?array
    {
        return $this->chart;
    }

    public function getChartColor(): ?string
    {
        $color = $this->chartColor;

        if ($color instanceof Color) {
            return $color->toHex();
        }

        return $color;
    }

    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'value' => $this->value,
            'description' => $this->description,
            'descriptionIcon' => $this->descriptionIcon,
            'descriptionColor' => $this->getDescriptionColor(),
            'icon' => $this->getIcon(),
            'color' => $this->getColor(),
            'chart' => $this->chart,
            'chartColor' => $this->getChartColor(),
            'columnSpan' => $this->columnSpan,
        ];
    }
}
