<?php

namespace Primix\Support\Theme;

use Primix\Support\Styles\ComponentStyle;

class ThemeConfig
{
    protected string $primaryColor = 'emerald';

    protected array $componentStyles = [];

    protected string $surfaceColor = 'slate';

    protected ?string $dangerColor = null;

    protected ?string $warningColor = null;

    protected ?string $successColor = null;

    protected ?string $infoColor = null;

    protected string $borderRadius = 'md';

    protected ?string $font = null;

    protected array $tokens = [];

    protected array $darkTokens = [];

    public static function make(): static
    {
        return new static();
    }

    public function primaryColor(string $color): static
    {
        $this->primaryColor = $color;

        return $this;
    }

    public function getPrimaryColor(): string
    {
        return $this->primaryColor;
    }

    public function surfaceColor(string $color): static
    {
        $this->surfaceColor = $color;

        return $this;
    }

    public function getSurfaceColor(): string
    {
        return $this->surfaceColor;
    }

    public function dangerColor(string $color): static
    {
        $this->dangerColor = $color;

        return $this;
    }

    public function getDangerColor(): ?string
    {
        return $this->dangerColor;
    }

    public function warningColor(string $color): static
    {
        $this->warningColor = $color;

        return $this;
    }

    public function getWarningColor(): ?string
    {
        return $this->warningColor;
    }

    public function successColor(string $color): static
    {
        $this->successColor = $color;

        return $this;
    }

    public function getSuccessColor(): ?string
    {
        return $this->successColor;
    }

    public function infoColor(string $color): static
    {
        $this->infoColor = $color;

        return $this;
    }

    public function getInfoColor(): ?string
    {
        return $this->infoColor;
    }

    public function borderRadius(string $radius): static
    {
        $this->borderRadius = $radius;

        return $this;
    }

    public function getBorderRadius(): string
    {
        return $this->borderRadius;
    }

    public function font(string $font): static
    {
        $this->font = $font;

        return $this;
    }

    public function getFont(): ?string
    {
        return $this->font;
    }

    public function token(string $path, string $value): static
    {
        $this->setNestedValue($this->tokens, $path, $value);

        return $this;
    }

    public function getTokens(): array
    {
        return $this->tokens;
    }

    public function darkToken(string $path, string $value): static
    {
        $this->setNestedValue($this->darkTokens, $path, $value);

        return $this;
    }

    public function getDarkTokens(): array
    {
        return $this->darkTokens;
    }

    /**
     * Set a nested value using dot notation.
     *
     * Example: 'form.field.border.radius' => ['form' => ['field' => ['border' => ['radius' => $value]]]]
     */
    protected function setNestedValue(array &$array, string $path, string $value): void
    {
        $keys = explode('.', $path);
        $current = &$array;

        foreach ($keys as $key) {
            if (! isset($current[$key]) || ! is_array($current[$key])) {
                $current[$key] = [];
            }
            $current = &$current[$key];
        }

        $current = $value;
    }

    /**
     * Configure global styles for a Primix component type.
     *
     * Accepts a ComponentStyle instance or a raw array of sections.
     * These styles are applied server-side at render time as defaults
     * and can be overridden per-instance via ->style().
     */
    public function configure(string $componentClass, ComponentStyle|array $style): static
    {
        $this->componentStyles[$componentClass] = $style;

        return $this;
    }

    public function getComponentStyles(): array
    {
        return $this->componentStyles;
    }

    public function toArray(): array
    {
        $config = [];

        if ($this->primaryColor !== 'emerald') {
            $config['primaryColor'] = $this->primaryColor;
        }

        if ($this->surfaceColor !== 'slate') {
            $config['surfaceColor'] = $this->surfaceColor;
        }

        if ($this->dangerColor !== null) {
            $config['dangerColor'] = $this->dangerColor;
        }

        if ($this->warningColor !== null) {
            $config['warningColor'] = $this->warningColor;
        }

        if ($this->successColor !== null) {
            $config['successColor'] = $this->successColor;
        }

        if ($this->infoColor !== null) {
            $config['infoColor'] = $this->infoColor;
        }

        if ($this->borderRadius !== 'md') {
            $config['borderRadius'] = $this->borderRadius;
        }

        if ($this->font !== null) {
            $config['font'] = $this->font;
        }

        if (! empty($this->tokens)) {
            $config['tokens'] = $this->tokens;
        }

        if (! empty($this->darkTokens)) {
            $config['darkTokens'] = $this->darkTokens;
        }

        return $config;
    }
}
