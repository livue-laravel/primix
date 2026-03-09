<?php

namespace Primix\Resources\Actions;

use Primix\Actions\Action;
use Primix\Resources\Actions\Concerns\InteractsWithResourcePages;

class ViewAction extends Action
{
    use InteractsWithResourcePages;

    public static function getDefaultName(): ?string
    {
        return 'view';
    }

    protected function setUp(): void
    {
        $this->label('View');
        $this->icon('heroicon-o-eye');
        $this->color('gray');

        $this->iconButton();

        $this->outlined();

        $this->modal(fn () => $this->shouldUseModalForPage('view'));

        $this->modalHeading(function () {
            $class = $this->getResourceClass();

            return 'View' . ($class !== null ? ' ' . $class::getModelLabel() : '');
        });

        $this->modalWidth('lg');

        $this->hideModalFooter(fn () => $this->shouldUseModalForPage('view'));
    }

    public function getUrl(): ?string
    {
        $record = $this->getRecord();

        return $this->resolveResourcePageUrl('view', ['record' => $record]);
    }

    public function isHidden(): bool
    {
        $record = $this->getRecord();

        return $this->isHiddenByResourceAbility('canView', $record, requiresRecord: true);
    }
}
