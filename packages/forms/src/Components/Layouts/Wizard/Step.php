<?php

namespace Primix\Forms\Components\Layouts\Wizard;

use Primix\Forms\Components\FormComponent;
use Primix\Forms\Concerns\CanDetectChildErrors;
use Primix\Forms\Concerns\HasColumns;
use Primix\Forms\Concerns\HasName;
use Primix\Forms\Concerns\HasNestedRelationship;
use Primix\Forms\Concerns\HasSchema;
use Primix\Support\Concerns\HasDescription;
use Primix\Support\Concerns\HasIcon;
use Primix\Support\Concerns\HasSchemaComponentIdentifier;

class Step extends FormComponent
{
    use CanDetectChildErrors;
    use HasColumns;
    use HasDescription;
    use HasIcon;
    use HasName;
    use HasNestedRelationship;
    use HasSchemaComponentIdentifier;
    use HasSchema;

    protected static ?string $schemaComponentCategory = 'layout';

    protected ?string $badge = null;

    protected ?string $badgeColor = null;

    public static function make(mixed ...$arguments): static
    {
        $instance = new static();

        $label = $arguments[0] ?? null;

        if ($label !== null) {
            $instance->label($label);
            $instance->name(str($label)->slug()->toString());
        }

        $instance->configure();

        return $instance;
    }

    public function badge(?string $badge): static
    {
        $this->badge = $badge;

        return $this;
    }

    public function badgeColor(?string $color): static
    {
        $this->badgeColor = $color;

        return $this;
    }

    public function getBadge(): ?string
    {
        return $this->badge;
    }

    public function getBadgeColor(): ?string
    {
        return $this->badgeColor;
    }

    public function getView(): string
    {
        return 'primix-forms::components.layouts.wizard.step';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'label' => $this->getLabel(),
            'name' => $this->getName(),
            'badge' => $this->getBadge(),
            'icon' => $this->getIcon(),
            'description' => $this->getDescription(),
            'badgeColor' => $this->getBadgeColor(),
            'components' => array_map(fn ($c) => $c->toVueProps(), $this->getSchema()),
        ]);
    }
}
