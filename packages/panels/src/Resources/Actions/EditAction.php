<?php

namespace Primix\Resources\Actions;

use Primix\Actions\Action;
use Primix\Resources\Actions\Concerns\InteractsWithResourcePages;

class EditAction extends Action
{
    use InteractsWithResourcePages;

    public static function getDefaultName(): ?string
    {
        return 'edit';
    }

    protected function setUp(): void
    {
        $this->label(__('primix::panel.actions.edit'));
        $this->icon('heroicon-o-pencil-square');
        $this->color('primary');
        $this->iconButton();

        $this->modal(fn () => $this->shouldUseModalForPage('edit'));

        $this->modalHeading(function () {
            $class = $this->getResourceClass();

            return $class !== null
                ? __('primix::panel.headings.edit_model', ['model' => $class::getModelLabel()])
                : __('primix::panel.actions.edit');
        });

        $this->modalWidth('lg');

        $this->modalSubmitActionLabel(__('primix::panel.actions.save'));
    }

    public function getUrl(): ?string
    {
        $record = $this->getRecord();

        return $this->resolveResourcePageUrl('edit', ['record' => $record]);
    }

    public function isHidden(): bool
    {
        $record = $this->getRecord();

        return $this->isHiddenByResourceAbility('canEdit', $record, requiresRecord: true);
    }
}
