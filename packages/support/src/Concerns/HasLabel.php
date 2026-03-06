<?php

namespace Primix\Support\Concerns;

use Closure;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Str;

trait HasLabel
{
    protected string|Closure|null $label = null;

    protected bool|Closure $isLabelHidden = false;

    protected bool|Closure $isLabelInline = false;

    protected bool $shouldTranslateLabel = false;

    public function label(string|Closure|null $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function translateLabel(bool $condition = true): static
    {
        $this->shouldTranslateLabel = $condition;

        return $this;
    }

    public function hiddenLabel(bool|Closure $condition = true): static
    {
        $this->isLabelHidden = $condition;

        return $this;
    }

    public function inlineLabel(bool|Closure $condition = true): static
    {
        $this->isLabelInline = $condition;

        return $this;
    }

    public function getLabel(): string|Htmlable|null
    {
        $label = $this->evaluate($this->label);

        if ($label === null && property_exists($this, 'name')) {
            $label = Str::of($this->name)->headline()->toString();
        }

        if ($label !== null && $this->shouldTranslateLabel) {
            $label = __($label);
        }

        return $label;
    }

    public function shouldTranslateLabel(): bool
    {
        return $this->shouldTranslateLabel;
    }

    public function isLabelHidden(): bool
    {
        return (bool) $this->evaluate($this->isLabelHidden);
    }

    public function isLabelInline(): bool
    {
        return (bool) $this->evaluate($this->isLabelInline);
    }
}
