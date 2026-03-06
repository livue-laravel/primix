<?php

namespace Primix\Resources\Pages;

use Illuminate\Database\Eloquent\Model;
use Primix\Actions\Action;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;
use Primix\Resources\Actions\CreateAction;
use Primix\Resources\Actions\EditAction;
use Primix\Resources\Actions\ViewAction;
use Primix\Tables\HasTable;
use Primix\Tables\Table;

class ListRecords extends Page
{
    use HasForms;
    use HasTable;

    public function mount(): void
    {
        $this->resourceClass = static::getResource();
        $resource = $this->resourceClass;

        if (! $resource::canViewAny()) {
            abort(403);
        }
    }

    protected function table(Table $table): Table
    {
        $resource = $this->resolveResource();

        $table = $resource::table(
            $table->resource($resource)
        )->query($resource::getEloquentQuery());

        if ($table->getRecordUrlResolver() === null) {
            $table->recordUrl(function (Model $record) use ($resource, $table) {
                $recordKey = $record->{$table->getRecordKeyName()};

                if ($resource::hasPage('view')) {
                    return $resource::getUrl('view', ['record' => $recordKey]);
                }

                if ($resource::hasPage('edit')) {
                    return $resource::getUrl('edit', ['record' => $recordKey]);
                }

                return null;
            });
        }

        return $table;
    }

    public function getTitle(): string
    {
        $resource = $this->resolveResource();

        return $resource::getPluralModelLabel();
    }

    protected function getActions(): array
    {
        return array_merge(
            parent::getActions(),
            $this->getTable()->getHeaderActions(),
            $this->getTable()->getActions(),
        );
    }

    protected function configureAction(Action $action): void
    {
        $resource = static::getResource();

        if ($action instanceof CreateAction && ! $resource::hasPage('create')) {
            $this->configureCreateModalAction($action, $resource);
        } elseif ($action instanceof EditAction && ! $resource::hasPage('edit')) {
            $this->configureEditModalAction($action, $resource);
        } elseif ($action instanceof ViewAction && ! $resource::hasPage('view')) {
            $this->configureViewModalAction($action, $resource);
        }
    }

    protected function configureCreateModalAction(CreateAction $action, string $resource): void
    {
        $action->form(fn (Form $form) => $resource::form($form));

        $action->action(function (array $data) use ($resource): void {
            $model = $resource::getModel();
            $form = $this->getActionForm();

            $relationshipKeys = $form->getRelationshipKeys();
            $fileUploadKeys = $form->getFileUploadKeys();

            $attributeData = collect($data)
                ->except(array_merge($relationshipKeys, $fileUploadKeys))
                ->toArray();

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
        });
    }

    protected function configureEditModalAction(EditAction $action, string $resource): void
    {
        $action->form(function (Form $form, ?Model $record) use ($resource) {
            $form = $resource::form($form);

            if ($record !== null) {
                $form->model($record);
            }

            return $form;
        });

        $action->fillForm(function (?Model $record) use ($resource) {
            if ($record === null) {
                return [];
            }

            $data = $record->toArray();

            $form = $resource::form(Form::make()->model($record));

            if (method_exists($form, 'fillWithRelationships')) {
                $data = $form->fillWithRelationships($data, $record);
            }

            return $data;
        });

        $action->action(function (array $data, ?Model $record) use ($resource): void {
            if ($record === null) {
                return;
            }

            $form = $this->getActionForm();

            $relationshipKeys = $form->getRelationshipKeys();
            $fileUploadKeys = $form->getFileUploadKeys();

            $attributeData = collect($data)
                ->except(array_merge($relationshipKeys, $fileUploadKeys))
                ->toArray();

            foreach ($fileUploadKeys as $key) {
                $value = data_get($data, $key);
                if ($value !== null) {
                    data_set($attributeData, $key, $value);
                }
            }

            $record->update($attributeData);

            $form->saveRelationships($record, $data);

            Notification::make()
                ->title('Saved successfully')
                ->success()
                ->send();
        });
    }

    protected function configureViewModalAction(ViewAction $action, string $resource): void
    {
        $action->form(function (Form $form, ?Model $record) use ($resource) {
            $form = $resource::form($form);

            if ($record !== null) {
                $form->model($record);
            }

            return $form;
        });

        $action->fillForm(function (?Model $record) use ($resource) {
            if ($record === null) {
                return [];
            }

            $data = $record->toArray();

            $form = $resource::form(Form::make()->model($record));

            if (method_exists($form, 'fillWithRelationships')) {
                $data = $form->fillWithRelationships($data, $record);
            }

            return $data;
        });
    }

    protected function resolveActionRecord(mixed $key): ?Model
    {
        $table = $this->getTable();
        $query = clone $table->getQuery();

        return $query->where($table->getRecordKeyName(), $key)->first();
    }

    protected function render(): string
    {
        return 'primix::pages.list-records';
    }
}
