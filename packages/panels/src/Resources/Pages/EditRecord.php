<?php

namespace Primix\Resources\Pages;

use Illuminate\Database\Eloquent\Model;
use Primix\Actions\Action;
use Primix\Forms\Form;
use Primix\Concerns\HandlesRelationTableModals;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;
use Primix\Resources\Actions\DeleteAction;
use Primix\Resources\Actions\ForceDeleteAction;
use Primix\Resources\Actions\RestoreAction;
use Primix\Resources\Concerns\HasRelationManagers;

class EditRecord extends Page
{
    use HandlesRelationTableModals;
    use HasForms;
    use HasRelationManagers;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }

    protected function configureAction(Action $action): void
    {
        match (true) {
            $action instanceof DeleteAction,
            $action instanceof ForceDeleteAction => $action->successRedirectUrl(
                fn () => $this->resolveResource()::getUrl('index')
            ),
            $action instanceof RestoreAction => $action->after(function () {
                $this->record->refresh();
                $form = $this->getForm('form');
                $this->data = $form->fillWithRelationships(
                    $this->record->toArray(),
                    $this->record,
                );
            }),
            default => null,
        };
    }

    protected function getFooterActions(): array
    {
        $resource = $this->resolveResource();

        return [
            Action::make('cancel')
                ->label(__('primix::panel.actions.cancel'))
                ->color('gray')
                ->outlined()
                ->url($resource::getUrl('index')),
            Action::make('save')
                ->label(__('primix::panel.actions.save'))
                ->submit(),
        ];
    }

    public ?Model $record = null;

    public array $data = [];

    public function mount(int|string $record): void
    {
        $this->resourceClass = static::getResource();
        $resource = $this->resourceClass;

        $this->record = $resource::getEloquentQuery()->findOrFail($record);

        if (! $resource::canEdit($this->record)) {
            abort(403);
        }

        $this->resetFormCache();

        $data = $this->record->toArray();

        $form = $this->getForm('form');
        $this->data = $form->fillWithRelationships($data, $this->record);
    }

    protected function form(Form $form): Form
    {
        $resource = $this->resolveResource();

        return $resource::form($form)
            ->statePath('data')
            ->model($this->record)
            ->submitAction('save')
            ->wrapped()
            ->footerActions(fn () => $this->getVisibleFooterActions());
    }

    public function save(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        $form = $this->getForm('form');

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

        $this->record->update($attributeData);

        $form->saveRelationships($this->record, $data);

        $this->record->refresh();
        $this->data = $form->fillWithRelationships(
            $this->record->toArray(),
            $this->record,
        );

        Notification::make()
            ->title(__('primix::panel.notifications.saved'))
            ->success()
            ->send();
    }

    public function getTitle(): string
    {
        $resource = $this->resolveResource();
        $recordTitle = $resource::getRecordTitle($this->record);

        if (filled($recordTitle)) {
            return __('primix::panel.page_titles.edit_record', ['record' => $recordTitle]);
        }

        return __('primix::panel.page_titles.edit', ['model' => $resource::getModelLabel()]);
    }

    protected function render(): string
    {
        return 'primix::pages.edit-record';
    }
}
