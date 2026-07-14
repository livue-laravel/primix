<?php

namespace Primix\Forms\Components;

use Closure;
use Primix\Forms\Components\Utilities\Get;
use Primix\Forms\Components\Utilities\Set;
use Primix\Support\Components\Schema\Component;

abstract class FormComponent extends Component
{
    protected bool|Closure $isUnwrapped = false;

    public function unwrapped(bool|Closure $condition = true): static
    {
        $this->isUnwrapped = $condition;

        return $this;
    }

    public function isUnwrapped(): bool
    {
        return (bool) $this->evaluate($this->isUnwrapped);
    }

    /**
     * Get the PT style overrides that make this component appear borderless/transparent.
     * Override in subclasses that have a visual "box" (TextInput, Select, etc.).
     */
    protected function getUnwrappedStyle(): array
    {
        return [];
    }

    public function getStylePassThrough(): array
    {
        $style = parent::getStylePassThrough();

        if (! $this->isUnwrapped()) {
            return $style;
        }

        $unwrapped = $this->getUnwrappedStyle();

        foreach ($unwrapped as $section => $value) {
            if (! isset($style[$section])) {
                $style[$section] = $value;
            } else {
                if (isset($value['class'])) {
                    $existingClass = $style[$section]['class'] ?? '';
                    $style[$section]['class'] = trim("{$value['class']} {$existingClass}");
                }
                if (isset($value['style'])) {
                    $existingStyle = $style[$section]['style'] ?? '';
                    $style[$section]['style'] = rtrim($value['style'], '; ') . '; ' . ltrim($existingStyle);
                    $style[$section]['style'] = trim($style[$section]['style'], '; ') . ';';
                }
            }
        }

        return $style;
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'get' => [$this->makeGetUtility()],
            'set' => [$this->makeSetUtility()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    {
        return match ($parameterType) {
            Get::class => [$this->makeGetUtility()],
            Set::class => [$this->makeSetUtility()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
        };
    }

    protected function makeGetUtility(): Get
    {
        // Get gestisce internamente il caso livue null (ritorna null per
        // qualsiasi path): mai iniettare null al posto di $get.
        return new Get(
            livue: $this->getLiVue(),
            containerStatePath: $this->container?->getStatePath(),
        );
    }

    protected function makeSetUtility(): Set
    {
        return new Set(
            livue: $this->getLiVue(),
            containerStatePath: $this->container?->getStatePath(),
        );
    }
}
