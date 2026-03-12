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
        $this->label(__('primix::panel.actions.delete_selected'));
        $this->icon('heroicon-o-trash');
        $this->color('danger');
        $this->requiresConfirmation();
        $this->successNotificationTitle(__('primix::panel.notifications.bulk_deleted'));

        $this->action(function (): void {
            $records = $this->getRecords();

            if ($records !== null) {
                $records->each->delete();
                $this->success();
            }
        });
    }
}
