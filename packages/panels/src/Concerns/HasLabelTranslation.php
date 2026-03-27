<?php

namespace Primix\Concerns;

use Closure;

trait HasLabelTranslation
{
    protected bool|Closure $translateLabels = false;

    public function translateLabels(bool|Closure $condition = true): static
    {
        $this->translateLabels = $condition;

        return $this;
    }

    public function shouldTranslateLabels(): bool
    {
        if ($this->translateLabels instanceof Closure) {
            return (bool) ($this->translateLabels)();
        }

        return $this->translateLabels;
    }
}
