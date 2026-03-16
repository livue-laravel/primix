<?php

namespace Primix\Resources\Actions;

use Primix\Actions\Action;

class CloneAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'clone';
    }

    protected function setUp(): void
    {
        $this->label(__('primix::panel.actions.clone'));
        $this->icon('heroicon-o-document-duplicate');
        $this->color('gray');
        $this->successNotificationTitle(__('primix::panel.notifications.cloned'));
        $this->iconButton();

        $this->action(function (): void {
            $record = $this->getRecord();
            $record?->replicate()->save();
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
                return ! $resource::canClone($record);
            }
        }

        return false;
    }
}
