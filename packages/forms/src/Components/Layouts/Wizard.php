<?php

namespace Primix\Forms\Components\Layouts;

use Closure;

class Wizard extends LayoutComponent
{
    protected int|Closure|null $startStep = null;

    protected bool|Closure $isLinear = true;

    protected string|Closure|null $submitAction = null;

    protected string|Closure|null $submitLabel = null;

    protected string|Closure|null $submitIcon = null;

    protected string|Closure|null $previousLabel = null;

    protected string|Closure|null $previousIcon = null;

    protected string|Closure|null $nextLabel = null;

    protected string|Closure|null $nextIcon = null;

    protected string|Closure|null $cancelAction = null;

    protected string|Closure|null $cancelLabel = null;

    protected bool|Closure $shouldValidateOnStepChange = false;

    public function __construct(?string $label = null)
    {
        $this->label($label);
    }

    public static function make(?string $label = null): static
    {
        $instance = app(static::class, ['label' => $label]);

        $instance->configure();

        return $instance;
    }

    public function steps(array $steps): static
    {
        return $this->childComponents($steps);
    }

    public function startStep(int|Closure|null $step): static
    {
        $this->startStep = $step;

        return $this;
    }

    public function linear(bool|Closure $condition = true): static
    {
        $this->isLinear = $condition;

        return $this;
    }

    public function submitAction(string|Closure|null $action): static
    {
        $this->submitAction = $action;

        return $this;
    }

    public function submitLabel(string|Closure|null $label): static
    {
        $this->submitLabel = $label;

        return $this;
    }

    public function getSteps(): array
    {
        return $this->getChildComponents();
    }

    public function getStartStep(): ?int
    {
        return $this->evaluate($this->startStep);
    }

    public function isLinear(): bool
    {
        return (bool) $this->evaluate($this->isLinear);
    }

    public function getSubmitAction(): ?string
    {
        return $this->evaluate($this->submitAction);
    }

    public function getSubmitLabel(): string
    {
        return $this->evaluate($this->submitLabel) ?? 'Submit';
    }

    public function submitIcon(string|Closure|null $icon): static
    {
        $this->submitIcon = $icon;

        return $this;
    }

    public function getSubmitIcon(): string
    {
        return $this->evaluate($this->submitIcon) ?? 'pi pi-check';
    }

    public function previousLabel(string|Closure|null $label): static
    {
        $this->previousLabel = $label;

        return $this;
    }

    public function getPreviousLabel(): string
    {
        return $this->evaluate($this->previousLabel) ?? 'Previous';
    }

    public function previousIcon(string|Closure|null $icon): static
    {
        $this->previousIcon = $icon;

        return $this;
    }

    public function getPreviousIcon(): string
    {
        return $this->evaluate($this->previousIcon) ?? 'pi pi-arrow-left';
    }

    public function nextLabel(string|Closure|null $label): static
    {
        $this->nextLabel = $label;

        return $this;
    }

    public function getNextLabel(): string
    {
        return $this->evaluate($this->nextLabel) ?? 'Next';
    }

    public function nextIcon(string|Closure|null $icon): static
    {
        $this->nextIcon = $icon;

        return $this;
    }

    public function getNextIcon(): string
    {
        return $this->evaluate($this->nextIcon) ?? 'pi pi-arrow-right';
    }

    public function cancelAction(string|Closure|null $action): static
    {
        $this->cancelAction = $action;

        return $this;
    }

    public function cancelLabel(string|Closure|null $label): static
    {
        $this->cancelLabel = $label;

        return $this;
    }

    public function getCancelAction(): ?string
    {
        return $this->evaluate($this->cancelAction);
    }

    public function getCancelLabel(): string
    {
        return $this->evaluate($this->cancelLabel) ?? 'Cancel';
    }

    public function validateOnStepChange(bool|Closure $condition = true): static
    {
        $this->shouldValidateOnStepChange = $condition;

        return $this;
    }

    public function shouldValidateOnStepChange(): bool
    {
        return (bool) $this->evaluate($this->shouldValidateOnStepChange);
    }

    protected function getChildComponentsVuePropKey(): string
    {
        return 'steps';
    }

    public function getView(): string
    {
        return 'primix-forms::components.layouts.wizard.wizard';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'startStep' => $this->getStartStep(),
            'linear' => $this->isLinear(),
            'submitAction' => $this->getSubmitAction(),
            'submitLabel' => $this->getSubmitLabel(),
            'submitIcon' => $this->getSubmitIcon(),
            'previousLabel' => $this->getPreviousLabel(),
            'previousIcon' => $this->getPreviousIcon(),
            'nextLabel' => $this->getNextLabel(),
            'nextIcon' => $this->getNextIcon(),
            'cancelAction' => $this->getCancelAction(),
            'cancelLabel' => $this->getCancelLabel(),
            'validateOnStepChange' => $this->shouldValidateOnStepChange(),
        ]);
    }
}
