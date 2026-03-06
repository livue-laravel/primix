<?php

namespace Primix\Actions\Concerns;

use Closure;

trait HasName
{
    protected ?string $name = null;

    protected string|Closure|null $label = null;

    public function name(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): ?string
    {
        if (blank($this->name)) {
            $actionClass = static::class;

            throw new \Exception("The name of the {$actionClass} is not set.");
        }

        return $this->name;
    }

    public static function getDefaultName(): ?string
    {
        return null;
    }

    public function label(string|Closure|null $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getLabel(): ?string
    {
        if ($this->label !== null) {
            return $this->evaluate($this->label);
        }

        return $this->name ? str($this->name)->headline()->toString() : null;
    }
}
