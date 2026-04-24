<?php

namespace Primix\Widgets;

use LiVue\Component;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColumnSpan;

abstract class Widget extends Component
{
    use EvaluatesClosures;
    use HasColumnSpan;

    protected ?int $sort = null;

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

    public function getColumnSpan(): int|string|array|null
    {
        return $this->columnSpan ?? 'full';
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }


}
