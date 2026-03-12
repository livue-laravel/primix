<?php

namespace Primix\Resources\Actions;

use Primix\Actions\BulkAction;

class DeleteBulkAction extends BulkAction
{
    public static function getDefaultName(): ?string
    {
        return 'delete';
    }

    protected function setUp(): void
    {
        $this->label('Delete selected');
        $this->icon('heroicon-o-trash');
        $this->color('danger');
        $this->requiresConfirmation();
        $this->successNotificationTitle('Record(s) deleted successfully');

        $this->action(function (): void {
            $records = $this->getRecords();

            if ($records !== null) {
                $records->each->delete();
                $this->success();
            }
        });
    }
}
