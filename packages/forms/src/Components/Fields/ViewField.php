<?php

namespace Primix\Forms\Components\Fields;

class ViewField extends Field
{
    protected ?string $customView = null;

    public function view(string $view): static
    {
        $this->customView = $view;

        return $this;
    }

    public function getView(): string
    {
        return $this->customView ?? '';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'state' => $this->getStateValue(),
        ]);
    }
}
