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
        $this->label(__('primix::panel.actions.new'));
        $this->icon('heroicon-o-plus');
        $this->color('primary');

        $this->modal(fn () => $this->shouldUseModalForPage('create'));

        $this->modalHeading(function () {
            $class = $this->getResourceClass();

            return $class !== null
                ? __('primix::panel.headings.create_model', ['model' => $class::getModelLabel()])
                : __('primix::panel.actions.create');
        });

        $this->modalWidth('lg');

        $this->modalSubmitActionLabel(__('primix::panel.actions.create'));
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
