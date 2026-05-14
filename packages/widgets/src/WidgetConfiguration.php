<?php

namespace Primix\Widgets;

use InvalidArgumentException;
use Primix\Support\Concerns\CanBeHidden;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColumnSpan;

class WidgetConfiguration
{
    use CanBeHidden;
    use EvaluatesClosures;
    use HasColumnSpan;

    protected ?string $variant = null;

    protected ?int $sort = null;

    public function __construct(protected string $widget) {}

    public static function make(string $widget): static
    {
        return new static($widget);
    }

    public function getWidget(): string
    {
        return $this->widget;
    }

    public function sort(?int $sort): static
    {
        $this->sort = $sort;

        return $this;
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

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function getVariant(): ?string
    {
        return $this->variant;
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
