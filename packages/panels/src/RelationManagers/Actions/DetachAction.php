<?php

namespace Primix\RelationManagers\Actions;

use Primix\Actions\Action;

class DetachAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'detach';
    }

    protected function setUp(): void
    {
        $this->label('Detach');
        $this->icon('heroicon-o-x-mark');
        $this->color('warning');
        $this->requiresConfirmation();
        $this->successNotificationTitle('Record detached successfully');
    }
}
