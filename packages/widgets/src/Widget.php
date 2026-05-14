<?php

namespace Primix\Widgets;

use InvalidArgumentException;
use LiVue\Component;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColumnSpan;

abstract class Widget extends Component
{
    use EvaluatesClosures;
    use HasColumnSpan;

    public string $variant = 'boxed';

    protected ?int $sort = null;

    public function mount(?string $variant = null): void
    {
        if ($variant !== null) {
            $this->variant($variant);
        }
    }

    public static function make(): WidgetConfiguration
    {
        return WidgetConfiguration::make(static::class);
    }

    public static function canView(): bool
    {
        return true;
    }

    public static function shouldBeVisible(): bool
    {
        return true;
    }

    public function variant(string $variant): static
    {
        $variant = strtolower(trim($variant));

        if (! $this->supportsVariant($variant)) {
            $supportedVariants = implode(', ', $this->getSupportedVariants());

            throw new InvalidArgumentException("Unsupported widget variant [{$variant}]. Supported variants are [{$supportedVariants}].");
        }

        $this->variant = $variant;

        return $this;
    }

    public function boxed(bool $condition = true): static
    {
        return $this->variant($condition ? 'boxed' : 'unboxed');
    }

    public function unboxed(bool $condition = true): static
    {
        return $this->variant($condition ? 'unboxed' : 'boxed');
    }

    public function getColumnSpan(): int|string|array|null
    {
        return $this->columnSpan ?? 'full';
    }

    public function getVariant(): string
    {
        return $this->variant;
    }

    public function isBoxed(): bool
    {
        return $this->getVariant() === 'boxed';
    }

    public function isUnboxed(): bool
    {
        return $this->getVariant() === 'unboxed';
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    protected function getSupportedVariants(): array
    {
        return ['boxed', 'unboxed'];
    }

    protected function supportsVariant(string $variant): bool
    {
        return in_array($variant, $this->getSupportedVariants(), true);
    }
}
