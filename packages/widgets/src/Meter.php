<?php

namespace Primix\Widgets;

use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColor;
use Primix\Support\Concerns\HasIcon;
use Primix\Support\Concerns\Makeable;

class Meter
{
    use EvaluatesClosures;
    use HasColor;
    use HasIcon;
    use Makeable;

    protected string $label;

    protected float $value;

    public static function make(string $label, float $value): static
    {
        $instance = new static();
        $instance->label = $label;
        $instance->value = $value;

        return $instance;
    }

    public function value(float $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getValue(): float
    {
        return $this->value;
    }

    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'value' => $this->value,
            'color' => $this->getColor(),
            'icon' => $this->getIcon(),
        ];
    }
}
