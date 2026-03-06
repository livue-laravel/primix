<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class WizardStyle extends ComponentStyle
{
    /** The stepper container (<p-stepper>) */
    public function stepper(string|array|Closure $value): static
    {
        return $this->section('stepper', $value);
    }

    /** The step list header (<p-step-list>) */
    public function stepList(string|array|Closure $value): static
    {
        return $this->section('stepList', $value);
    }

    /** Each step indicator (<p-step>) */
    public function step(string|array|Closure $value): static
    {
        return $this->section('step', $value);
    }

    /** Each step content panel (<p-step-panel>) */
    public function stepPanel(string|array|Closure $value): static
    {
        return $this->section('stepPanel', $value);
    }

    /** The navigation buttons area (Previous/Next/Submit) */
    public function navigation(string|array|Closure $value): static
    {
        return $this->section('navigation', $value);
    }
}
