<?php

namespace Primix\Widgets;

use Primix\Support\Concerns\CanBeHidden;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColumnSpan;

class WidgetConfiguration
{
    use CanBeHidden;
    use EvaluatesClosures;
    use HasColumnSpan;

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

    public function getSort(): ?int
    {
        return $this->sort;
    }
}
