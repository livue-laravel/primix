<?php

namespace Primix\Resources\Actions;

use Primix\Actions\Action;

class RestoreAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'restore';
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->label(__('primix::panel.actions.restore'));
        $this->icon('heroicon-o-arrow-uturn-left');
        $this->color('success');
        $this->requiresConfirmation();
        $this->successNotificationTitle(__('primix::panel.notifications.restored'));

        $this->visible(function (mixed $record): bool {
            if ($record === null) {
                return true;
            }

            return method_exists($record, 'trashed') && $record->trashed();
        });

        $this->action(function (): void {
            $record = $this->getRecord();
            $record?->restore();
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
                return ! $resource::canRestore($record);
            }
        }

        return false;
    }
}
