<?php

namespace Primix\Support\Concerns;

use Closure;
use Primix\Support\Components\ComponentAttributeBag;

trait HasExtraAttributes
{
    protected array|Closure $extraAttributes = [];

    protected array|Closure $extraWrapperAttributes = [];

    public function extraAttributes(array|Closure $attributes): static
    {
        $this->extraAttributes = $attributes;

        return $this;
    }

    public function extraWrapperAttributes(array|Closure $attributes): static
    {
        $this->extraWrapperAttributes = $attributes;

        return $this;
    }

    public function getExtraAttributes(): ComponentAttributeBag
    {
        $attributes = $this->evaluate($this->extraAttributes);

        return new ComponentAttributeBag($attributes);
    }

    public function getExtraWrapperAttributes(): ComponentAttributeBag
    {
        $attributes = $this->evaluate($this->extraWrapperAttributes);

        return new ComponentAttributeBag($attributes);
    }

    /**
     * @return array{class: string, attributes: ComponentAttributeBag}
     */
    public function getRenderableExtraAttributes(string $baseClass = '', array $defaults = []): array
    {
        return $this->prepareRenderableAttributes($this->getExtraAttributes(), $baseClass, $defaults);
    }

    /**
     * @return array{class: string, attributes: ComponentAttributeBag}
     */
    public function getRenderableExtraWrapperAttributes(string $baseClass = '', array $defaults = []): array
    {
        return $this->prepareRenderableAttributes($this->getExtraWrapperAttributes(), $baseClass, $defaults);
    }

    /**
     * @return array{class: string, attributes: ComponentAttributeBag}
     */
    protected function prepareRenderableAttributes(ComponentAttributeBag $attributes, string $baseClass = '', array $defaults = []): array
    {
        if ($defaults !== []) {
            $attributes = $attributes->merge($defaults);
        }

        $class = trim($baseClass . ' ' . (string) ($attributes->get('class') ?? ''));

        return [
            'class' => $class,
            'attributes' => $attributes->except('class'),
        ];
    }
}
