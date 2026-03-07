<?php

namespace Primix\Actions;

use Closure;
use Illuminate\Contracts\Support\Htmlable;
use LiVue\Component as LiVueComponent;
use Primix\Support\Components\Component;
use Primix\Support\Concerns\CanBeHidden;
use Primix\Support\Concerns\HasColor;
use Primix\Support\Concerns\HasIcon;
use Primix\Support\Concerns\HasId;
use Primix\Support\Concerns\HasSchemaComponentIdentifier;

class ActionGroup extends Component implements Htmlable
{
    use CanBeHidden;
    use HasColor;
    use HasIcon;
    use HasId;
    use HasSchemaComponentIdentifier;

    protected static ?string $schemaComponentCategory = 'action';

    /**
     * @var array<Action>
     */
    protected array $actions = [];

    protected string|Closure|null $label = null;

    protected string|Closure|null $tooltip = null;

    protected bool|Closure $isDropdown = true;

    protected bool|Closure $isSpeedDial = false;

    protected string|Closure $speedDialDirection = 'up';

    protected string|Closure $speedDialType = 'linear';

    public static function make(array $actions = []): static
    {
        $instance = new static();
        $instance->actions($actions);
        $instance->configure();

        return $instance;
    }

    /**
     * @param array<Action> $actions
     */
    public function actions(array $actions): static
    {
        $this->actions = $actions;

        return $this;
    }

    /**
     * @return array<Action>
     */
    public function getActions(): array
    {
        return array_filter(
            $this->actions,
            fn (Action $action) => ! $action->isHidden()
        );
    }

    public function tooltip(string|Closure|null $tooltip): static
    {
        $this->tooltip = $tooltip;

        return $this;
    }

    public function getTooltip(): ?string
    {
        return $this->evaluate($this->tooltip);
    }

    public function dropdown(bool|Closure $condition = true): static
    {
        $this->isDropdown = $condition;

        return $this;
    }

    public function isDropdown(): bool
    {
        return (bool) $this->evaluate($this->isDropdown);
    }

    public function speedDial(string $direction = 'up', string $type = 'linear'): static
    {
        $this->isSpeedDial = true;
        $this->speedDialDirection = $direction;
        $this->speedDialType = $type;

        return $this;
    }

    public function isSpeedDial(): bool
    {
        return (bool) $this->evaluate($this->isSpeedDial);
    }

    public function getSpeedDialDirection(): string
    {
        return $this->evaluate($this->speedDialDirection);
    }

    public function getSpeedDialType(): string
    {
        return $this->evaluate($this->speedDialType);
    }

    public function label(string|Closure|null $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->evaluate($this->label);
    }

    public function livue(?LiVueComponent $component): static
    {
        foreach ($this->actions as $action) {
            if (method_exists($action, 'livue')) {
                $action->livue($component);
            }
        }

        return $this;
    }

    public function resource(?string $resourceClass): static
    {
        foreach ($this->actions as $action) {
            if (method_exists($action, 'resource')) {
                $action->resource($resourceClass);
            }
        }

        return $this;
    }

    public function toHtml(): string
    {
        $actions = $this->getActions();

        if (empty($actions)) {
            return '';
        }

        if (count($actions) === 1) {
            return $actions[0]->toHtml();
        }

        return view('primix-actions::action-group', [
            'component' => $this,
            'actions' => $actions,
            'icon' => $this->getIcon() ?? 'pi pi-ellipsis-v',
            'color' => $this->getColor() ?? 'secondary',
            'tooltip' => $this->getTooltip(),
            'isDropdown' => $this->isDropdown(),
            'isSpeedDial' => $this->isSpeedDial(),
            'speedDialDirection' => $this->getSpeedDialDirection(),
            'speedDialType' => $this->getSpeedDialType(),
            'label' => $this->getLabel(),
        ])->render();
    }

    public function toVueProps(): array
    {
        return [
            'id' => $this->getId(),
            'label' => $this->getLabel(),
            'actions' => array_map(fn (Action $action) => $action->toVueProps(), $this->getActions()),
            'icon' => $this->getIcon() ?? 'pi pi-ellipsis-v',
            'color' => $this->getColor() ?? 'secondary',
            'tooltip' => $this->getTooltip(),
            'isDropdown' => $this->isDropdown(),
            'isSpeedDial' => $this->isSpeedDial(),
            'speedDialDirection' => $this->getSpeedDialDirection(),
            'speedDialType' => $this->getSpeedDialType(),
        ];
    }

    public function toArray(): array
    {
        return $this->toVueProps();
    }
}
