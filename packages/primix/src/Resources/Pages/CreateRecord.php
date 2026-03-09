<?php

namespace Primix\Resources\Pages;

use Primix\Actions\Action;
use Primix\Forms\Form;
use Primix\Concerns\HandlesRelationTableModals;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;

class CreateRecord extends Page
{
    use HandlesRelationTableModals;
    use HasForms;

    protected function getFooterActions(): array
    {
        $resource = $this->resolveResource();

        return [
            Action::make('cancel')
                ->label('Cancel')
                ->color('gray')
                ->outlined()
                ->url($resource::getUrl('index')),
            Action::make('create')
                ->label('Create')
                ->submit(),
        ];
    }

    public array $data = [];

    public function mount(): void
    {
        $this->resourceClass = static::getResource();
        $resource = $this->resourceClass;

        if (! $resource::canCreate()) {
            abort(403);
        }

        $this->form($this->getForm());
    }

    protected function form(Form $form): Form
    {
        $resource = $this->resolveResource();

        return $resource::form($form)
            ->statePath('data')
            ->model($resource::getModel())
            ->submitAction('create')
            ->wrapped()
            ->footerActions(fn () => $this->getVisibleFooterActions());
    }

    public function create(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        $resource = $this->resolveResource();
        $model = $resource::getModel();
        $form = $this->getForm();

        $relationshipKeys = $form->getRelationshipKeys();
        $fileUploadKeys = $form->getFileUploadKeys();

        // Apply dehydration callbacks, persist file uploads, and remove non-dehydrated fields
        $data = $this->data;
        $form->dehydrateState($data);

        $attributeData = collect($data)
            ->except(array_merge($relationshipKeys, $fileUploadKeys))
            ->toArray();

        // Add file paths to attribute data (they are now string paths, not TemporaryUploadedFile)
        foreach ($fileUploadKeys as $key) {
            $value = data_get($data, $key);

            if ($value !== null) {
                data_set($attributeData, $key, $value);
            }
        }

        if ($resource::shouldScopeToTenant()) {
            $column = config('multi-tenant.tenant_column', 'tenant_id');
            $attributeData[$column] = \Primix\MultiTenant\Facades\Tenancy::tenant()->getTenantKey();
        }

        $record = $model::create($attributeData);

        $form->saveRelationships($record, $data);

        Notification::make()
            ->title('Created successfully')
            ->success()
            ->send();

        $this->redirect(
            $this->getRedirectUrl($record),
            navigate: true
        );
    }

    protected function getRedirectUrl(\Illuminate\Database\Eloquent\Model $record): string
    {
        $resource = $this->resolveResource();

        if ($resource::hasPage('edit')) {
            return $resource::getUrl('edit', ['record' => $record->getKey()]);
        }

        if ($resource::hasPage('view')) {
            return $resource::getUrl('view', ['record' => $record->getKey()]);
        }

        return $resource::getUrl('index');
    }

    public function getTitle(): string
    {
        $resource = $this->resolveResource();

        return 'Create ' . $resource::getModelLabel();
    }

    protected function render(): string
    {
        return 'primix::pages.create-record';
    }
}
