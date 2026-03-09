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
        $this->label('Edit');
        $this->icon('heroicon-o-pencil-square');
        $this->color('primary');
        $this->iconButton();

        $this->modal(fn () => $this->shouldUseModalForPage('edit'));

        $this->modalHeading(function () {
            $class = $this->getResourceClass();

            return 'Edit' . ($class !== null ? ' ' . $class::getModelLabel() : '');
        });

        $this->modalWidth('lg');

        $this->modalSubmitActionLabel('Save');
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
