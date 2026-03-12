<?php

namespace Primix\Resources\Actions;

use Primix\Actions\BulkAction;

class ForceDeleteBulkAction extends BulkAction
{
    public static function getDefaultName(): ?string
    {
        return 'force-delete';
    }

    protected function setUp(): void
    {
        $this->label(__('primix::panel.actions.force_delete_selected'));
        $this->icon('heroicon-o-trash');
        $this->color('danger');
        $this->requiresConfirmation();
        $this->successNotificationTitle(__('primix::panel.notifications.bulk_force_deleted'));

        $this->action(function (): void {
            $records = $this->getRecords();

            if ($records !== null) {
                $records->each->forceDelete();
                $this->success();
            }
        });
    }
}
