<?php

namespace Primix\Support\Styles;

use Closure;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

abstract class ComponentStyle
{
    use EvaluatesClosures;
    use Makeable;

    protected array $sections = [];

    protected function section(string $name, string|array|Closure $value): static
    {
        $this->sections[$name] = $value;

        return $this;
    }

    /**
     * Resolve all sections, evaluating closures via the owning component's DI context.
     */
    public function resolve(?object $component = null): array
    {
        $resolved = [];

        foreach ($this->sections as $name => $value) {
            if ($component !== null && method_exists($component, 'evaluate')) {
                $evaluated = $component->evaluate($value);
            } else {
                $evaluated = $this->evaluate($value);
            }

            $resolved[$name] = is_string($evaluated)
                ? ['class' => $evaluated]
                : ($evaluated ?? []);
        }

        return $resolved;
    }

    /**
     * Get the raw sections without resolving closures.
     */
    public function toArray(): array
    {
        return $this->sections;
    }
}
