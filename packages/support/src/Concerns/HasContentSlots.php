<?php

namespace Primix\Support\Concerns;

use Closure;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\HtmlString;
use Primix\Support\Components\ViewComponent;

trait HasContentSlots
{
    protected string|Htmlable|Closure|array|null $aboveLabel = null;

    protected string|Htmlable|Closure|array|null $belowLabel = null;

    protected string|Htmlable|Closure|array|null $aboveField = null;

    protected string|Htmlable|Closure|array|null $belowField = null;

    public function aboveLabel(string|Htmlable|Closure|array|null $content): static
    {
        $this->aboveLabel = $content;

        return $this;
    }

    public function belowLabel(string|Htmlable|Closure|array|null $content): static
    {
        $this->belowLabel = $content;

        return $this;
    }

    public function aboveField(string|Htmlable|Closure|array|null $content): static
    {
        $this->aboveField = $content;

        return $this;
    }

    public function belowField(string|Htmlable|Closure|array|null $content): static
    {
        $this->belowField = $content;

        return $this;
    }

    public function getAboveLabel(): string|Htmlable|null
    {
        return $this->resolveSlotContent($this->aboveLabel);
    }

    public function getBelowLabel(): string|Htmlable|null
    {
        return $this->resolveSlotContent($this->belowLabel);
    }

    public function getAboveField(): string|Htmlable|null
    {
        return $this->resolveSlotContent($this->aboveField);
    }

    public function getBelowField(): string|Htmlable|null
    {
        return $this->resolveSlotContent($this->belowField);
    }

    protected function resolveSlotContent(mixed $content): string|Htmlable|null
    {
        $value = $this->evaluate($content);

        if ($value === null) {
            return null;
        }

        if (is_array($value)) {
            $html = implode('', array_map(function ($item) {
                if ($item instanceof Htmlable) {
                    return $item->toHtml();
                }

                return e($item);
            }, $value));

            return new HtmlString($html);
        }

        return $value;
    }

    public function getSlotComponents(): array
    {
        $components = [];

        foreach (['aboveLabel', 'belowLabel', 'aboveField', 'belowField'] as $slot) {
            $value = $this->evaluate($this->{$slot});

            if ($value instanceof ViewComponent) {
                $components[] = $value;
            } elseif (is_array($value)) {
                foreach ($value as $item) {
                    if ($item instanceof ViewComponent) {
                        $components[] = $item;
                    }
                }
            }
        }

        return $components;
    }
}
