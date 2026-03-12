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
        $this->label(__('primix::panel.actions.attach'));
        $this->icon('heroicon-o-link');
        $this->color('primary');
        $this->modal();
        $this->modalHeading(__('primix::panel.headings.attach_record'));
        $this->modalWidth('lg');
        $this->modalSubmitActionLabel(__('primix::panel.actions.attach'));
    }
}
