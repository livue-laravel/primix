<?php

namespace Primix\Resources\Actions;

use Primix\Actions\BulkAction;

class RestoreBulkAction extends BulkAction
{
    public static function getDefaultName(): ?string
    {
        return 'restore';
    }

    protected function setUp(): void
    {
        $this->label('Restore selected');
        $this->icon('heroicon-o-arrow-uturn-left');
        $this->color('success');
        $this->requiresConfirmation();
        $this->successNotificationTitle('Record(s) restored successfully');

        $this->action(function (): void {
            $records = $this->getRecords();

            if ($records !== null) {
                $records->each->restore();
                $this->success();
            }
        });
    }
}
