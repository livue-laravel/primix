<?php

namespace Primix\Widgets;

use InvalidArgumentException;
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

    protected Color|string|null $iconBackgroundColor = null;

    protected string $iconBoxShape = 'soft-square';

    protected ?string $trend = null;

    protected ?string $trendIcon = null;

    protected Color|string|null $trendColor = null;

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

    public function iconBackground(Color|string|null $color): static
    {
        $this->iconBackgroundColor = $color;

        return $this;
    }

    public function iconBoxShape(string $shape): static
    {
        $this->iconBoxShape = $shape;

        return $this;
    }

    public function trend(mixed $trend, ?string $icon = null, Color|string|null $color = null): static
    {
        $this->trend = $trend !== null ? (string) $trend : null;
        $this->trendIcon = $icon;
        $this->trendColor = $color;

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
        return $this->resolveOutputColor($this->descriptionColor);
    }

    public function getChart(): ?array
    {
        return $this->chart;
    }

    public function getChartColor(): ?string
    {
        return $this->resolveOutputColor($this->chartColor);
    }

    public function getTrend(): ?string
    {
        return $this->trend;
    }

    public function getIconBackgroundColor(): ?string
    {
        return $this->resolveOutputColor($this->iconBackgroundColor);
    }

    public function getResolvedColor(): ?string
    {
        return $this->resolveOutputColor($this->evaluate($this->color));
    }

    public function getIconBoxShape(): string
    {
        return match ($this->iconBoxShape) {
            'square' => 'square',
            'circle', 'rounded', 'round' => 'circle',
            'soft-square', 'softSquare', 'soft_square' => 'soft-square',
            default => 'soft-square',
        };
    }

    public function getTrendIcon(): ?string
    {
        if ($this->trendIcon !== null) {
            return $this->trendIcon;
        }

        return match ($this->getTrendDirection()) {
            'up' => 'primix-trend-up',
            'down' => 'primix-trend-down',
            default => null,
        };
    }

    public function getTrendColor(): ?string
    {
        if ($this->trendColor !== null) {
            return $this->resolveOutputColor($this->trendColor);
        }

        return match ($this->getTrendDirection()) {
            'up' => $this->resolveOutputColor('success'),
            'down' => $this->resolveOutputColor('danger'),
            default => null,
        };
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
            'color' => $this->getResolvedColor(),
            'iconBackgroundColor' => $this->getIconBackgroundColor(),
            'iconBoxShape' => $this->getIconBoxShape(),
            'chart' => $this->chart,
            'chartColor' => $this->getChartColor(),
            'trend' => $this->trend,
            'trendIcon' => $this->getTrendIcon(),
            'trendColor' => $this->getTrendColor(),
            'columnSpan' => $this->columnSpan,
        ];
    }

    protected function getTrendDirection(): ?string
    {
        if ($this->trend === null) {
            return null;
        }

        $value = trim($this->trend);

        if ($value === '') {
            return null;
        }

        if (preg_match('/^-/', $value) === 1) {
            return 'down';
        }

        if (preg_match('/^\+/', $value) === 1) {
            return 'up';
        }

        if (! is_numeric($value)) {
            return null;
        }

        $numeric = (float) $value;

        return match (true) {
            $numeric > 0 => 'up',
            $numeric < 0 => 'down',
            default => null,
        };
    }

    protected function resolveOutputColor(Color|string|null $color): ?string
    {
        if ($color === null) {
            return null;
        }

        if ($color instanceof Color) {
            return $color->toHex();
        }

        $trimmed = trim($color);

        if ($trimmed === '') {
            return null;
        }

        if (
            str_starts_with($trimmed, '#') ||
            str_starts_with($trimmed, 'rgb(') ||
            str_starts_with($trimmed, 'rgba(') ||
            str_starts_with($trimmed, 'hsl(') ||
            str_starts_with($trimmed, 'hsla(') ||
            str_starts_with($trimmed, 'var(')
        ) {
            return $trimmed;
        }

        try {
            return app(\Primix\Support\Colors\ColorManager::class)->toHex($trimmed);
        } catch (InvalidArgumentException) {
            return $trimmed;
        }
    }
}
