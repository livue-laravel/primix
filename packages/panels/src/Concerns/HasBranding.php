<?php

namespace Primix\Concerns;

use Closure;
use Illuminate\Contracts\Support\Htmlable;

trait HasBranding
{
    protected string|Closure|Htmlable|null $brandName = null;

    protected string|Closure|Htmlable|null $brandLogoDefault = null;

    protected string|Closure|Htmlable|null $brandLogoLight = null;

    protected string|Closure|Htmlable|null $brandLogoDark = null;

    protected ?string $brandLogoHeight = null;

    public function brandName(string|Closure|Htmlable|null $name): static
    {
        $this->brandName = $name;

        return $this;
    }

    public function getBrandName(): string|Htmlable|null
    {
        $name = $this->brandName;

        if ($name instanceof Closure) {
            $name = $name();
        }

        return $name;
    }

    public function brandLogo(
        string|Closure|Htmlable|null $default = null,
        string|Closure|Htmlable|null $light = null,
        string|Closure|Htmlable|null $dark = null,
    ): static {
        $this->brandLogoDefault = $default;
        $this->brandLogoLight = $light;
        $this->brandLogoDark = $dark;

        return $this;
    }

    public function brandLogoHeight(?string $height): static
    {
        $this->brandLogoHeight = $height;

        return $this;
    }

    public function getBrandLogo(): ?string
    {
        $light = $this->brandLogoLight ?? $this->brandLogoDefault;

        return $this->resolveBrandLogo($light);
    }

    public function getBrandLogoDark(): ?string
    {
        $dark = $this->brandLogoDark ?? $this->brandLogoDefault;
        $light = $this->brandLogoLight ?? $this->brandLogoDefault;

        $resolvedDark = $this->resolveBrandLogo($dark);
        $resolvedLight = $this->resolveBrandLogo($light);

        if ($resolvedDark === $resolvedLight) {
            return null;
        }

        return $resolvedDark;
    }

    public function getBrandLogoHeight(): ?string
    {
        return $this->brandLogoHeight;
    }

    protected function resolveBrandLogo(string|Closure|Htmlable|null $logo): ?string
    {
        if ($logo === null) {
            return null;
        }

        if ($logo instanceof Closure) {
            $logo = $logo();
        }

        if ($logo instanceof Htmlable) {
            return $logo->toHtml();
        }

        $height = $this->brandLogoHeight ? ' style="height: ' . e($this->brandLogoHeight) . '"' : '';
        $alt = e($this->getBrandName() instanceof Htmlable ? strip_tags($this->getBrandName()->toHtml()) : $this->getBrandName());

        return '<img src="' . e($logo) . '" alt="' . $alt . '"' . $height . ' />';
    }
}
