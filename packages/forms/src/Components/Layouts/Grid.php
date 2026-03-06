<?php

namespace Primix\Forms\Components\Layouts;

class Grid extends LayoutComponent
{
    public function __construct(int $columns)
    {
        $this->columns($columns);
    }


    public static function make(int $columns = 2): static
    {
        $instance = app(static::class, ['columns' => $columns]);

        $instance->configure();

        return $instance;
    }

    public function getWrapperView(): ?string
    {
        return null;
    }

    public function getView(): string
    {
        return 'primix-forms::components.layouts.grid';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'columns' => $this->getColumns(),
        ]);
    }
}
