<?php

namespace Primix\Widgets;

use Illuminate\Support\Facades\View;
use InvalidArgumentException;
use LiVue\Component;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColumnSpan;

abstract class Widget extends Component
{
    use EvaluatesClosures;
    use HasColumnSpan;

    protected string $widgetLayout = 'professional';

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

    public function widgetLayout(string $layout): static
    {
        if (! $this->supportsWidgetLayout($layout)) {
            $supportedLayouts = implode(', ', $this->getSupportedWidgetLayouts());

            throw new InvalidArgumentException("Unsupported widget layout [{$layout}]. Supported layouts are [{$supportedLayouts}].");
        }

        $this->widgetLayout = $layout;

        return $this;
    }

    public function getColumnSpan(): int|string|array|null
    {
        return $this->columnSpan ?? 'full';
    }

    public function getWidgetLayout(): string
    {
        return $this->widgetLayout;
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function getWidgetLayoutView(string $baseView, ?string $fallbackView = null): string
    {
        $layoutView = "{$baseView}.layouts.{$this->getWidgetLayout()}";

        if (View::exists($layoutView)) {
            return $layoutView;
        }

        $classicView = "{$baseView}.layouts.classic";

        if (View::exists($classicView)) {
            return $classicView;
        }

        return $fallbackView ?? $baseView;
    }

    protected function getSupportedWidgetLayouts(): array
    {
        return ['professional', 'classic'];
    }

    protected function supportsWidgetLayout(string $layout): bool
    {
        return in_array($layout, $this->getSupportedWidgetLayouts(), true);
    }
}
