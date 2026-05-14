<?php

namespace Primix\Actions\Concerns;

use Closure;

trait HasGradient
{
    protected string|Closure|null $gradient = null;

    protected ?string $gradientType = null;

    /**
     * @var array<int, mixed>
     */
    protected array $gradientArguments = [];

    protected string|Closure|null $gradientTextColor = null;

    public function gradient(string|Closure|null $typeOrBackground, mixed ...$arguments): static
    {
        $this->gradient = null;
        $this->gradientType = null;
        $this->gradientArguments = [];

        if (is_string($typeOrBackground) && $this->isGradientType($typeOrBackground)) {
            $this->gradientType = strtolower($typeOrBackground);
            $this->gradientArguments = $arguments;

            return $this;
        }

        $this->gradient = $typeOrBackground;

        if (($arguments[0] ?? null) instanceof Closure || is_string($arguments[0] ?? null) || ($arguments[0] ?? null) === null) {
            $this->gradientTextColor = $arguments[0] ?? null;
        }

        return $this;
    }

    public function gradientTextColor(string|Closure|null $color): static
    {
        $this->gradientTextColor = $color;

        return $this;
    }

    public function getGradient(): ?string
    {
        if ($this->gradientType !== null) {
            return $this->buildGradientFromParts();
        }

        return $this->evaluate($this->gradient);
    }

    public function getGradientTextColor(): ?string
    {
        return $this->evaluate($this->gradientTextColor);
    }

    public function hasGradient(): bool
    {
        return filled($this->getGradient());
    }

    protected function isGradientType(string $type): bool
    {
        return in_array(strtolower($type), [
            'linear',
            'radial',
            'conic',
            'repeating-linear',
            'repeating-radial',
            'repeating-conic',
        ], true);
    }

    protected function buildGradientFromParts(): ?string
    {
        $segments = [];

        foreach ($this->gradientArguments as $argument) {
            foreach ($this->normalizeGradientArgument($argument) as $segment) {
                if (filled($segment)) {
                    $segments[] = $segment;
                }
            }
        }

        if ($segments === []) {
            return null;
        }

        return $this->gradientType . '-gradient(' . implode(', ', $segments) . ')';
    }

    /**
     * @return array<int, string>
     */
    protected function normalizeGradientArgument(mixed $argument): array
    {
        $resolved = $this->evaluate($argument);

        if (is_array($resolved)) {
            $segments = [];

            foreach ($resolved as $nestedArgument) {
                array_push($segments, ...$this->normalizeGradientArgument($nestedArgument));
            }

            return $segments;
        }

        if ($resolved === null) {
            return [];
        }

        return [(string) $resolved];
    }

    /**
     * @return array<string, string>
     */
    public function getGradientExtraAttributes(): array
    {
        $gradient = $this->getGradient();

        if (blank($gradient)) {
            return [];
        }

        $style = 'background: ' . rtrim($gradient, '; ') . '; border-color: transparent;';

        if (filled($textColor = $this->getGradientTextColor())) {
            $style .= ' color: ' . rtrim($textColor, '; ') . ';';
        }

        return [
            'class' => 'primix-action-button-gradient',
            'data-primix-gradient' => 'true',
            'style' => $style,
        ];
    }
}
