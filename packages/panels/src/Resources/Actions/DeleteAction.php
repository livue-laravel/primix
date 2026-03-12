<?php

namespace Primix\Resources\Actions;

use Primix\Actions\Action;

class DeleteAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'delete';
    }

    protected function setUp(): void
    {
        $this->label(__('primix::panel.actions.delete'));
        $this->icon('heroicon-o-trash');
        $this->color('danger');
        $this->requiresConfirmation();
        $this->successNotificationTitle(__('primix::panel.notifications.deleted'));
        $this->iconButton();

        $this->visible(function (mixed $record): bool {
            if ($record === null) {
                return true;
            }

            return ! method_exists($record, 'trashed') || ! $record->trashed();
        });

        $this->action(function (): void {
            $record = $this->getRecord();
            $record?->delete();
            $this->success();
        });
    }

    public function isHidden(): bool
    {
        if ($this->hasExplicitVisibility()) {
            return parent::isHidden();
        }

        if (parent::isHidden()) {
            return true;
        }

        $record = $this->getRecord();

        if ($record !== null) {
            $resource = $this->getResourceClass();

            if ($resource !== null) {
                return ! $resource::canDelete($record);
            }
        }

        return false;
    }
}
