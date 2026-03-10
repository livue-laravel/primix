<?php

namespace Primix\RelationManagers\Actions;

use Primix\Actions\Action;

class AttachAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'attach';
    }

    protected function setUp(): void
    {
        $this->label('Attach');
        $this->icon('heroicon-o-link');
        $this->color('primary');
        $this->modal();
        $this->modalHeading('Attach record');
        $this->modalWidth('lg');
        $this->modalSubmitActionLabel('Attach');
    }
}
