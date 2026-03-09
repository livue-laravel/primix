<?php

namespace Primix\Resources\Actions;

use Primix\Actions\Action;
use Primix\Resources\Actions\Concerns\InteractsWithResourcePages;

class CreateAction extends Action
{
    use InteractsWithResourcePages;

    public static function getDefaultName(): ?string
    {
        return 'create';
    }

    protected function setUp(): void
    {
        $this->label('New');
        $this->icon('heroicon-o-plus');
        $this->color('primary');

        $this->modal(fn () => $this->shouldUseModalForPage('create'));

        $this->modalHeading(function () {
            $class = $this->getResourceClass();

            return 'Create' . ($class !== null ? ' ' . $class::getModelLabel() : '');
        });

        $this->modalWidth('lg');

        $this->modalSubmitActionLabel('Create');
    }

    public function getUrl(): ?string
    {
        return $this->resolveResourcePageUrl('create');
    }

    public function isHidden(): bool
    {
        return $this->isHiddenByResourceAbility('canCreate');
    }
}
