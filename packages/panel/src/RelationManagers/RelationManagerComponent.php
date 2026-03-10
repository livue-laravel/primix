<?php

namespace Primix\RelationManagers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use LiVue\Attributes\Fragment;
use LiVue\Attributes\Modelable;
use LiVue\Component;
use Primix\Actions\Action;
use Primix\Concerns\HasPageActions;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;
use Primix\RelationManagers\Actions\AttachAction;
use Primix\RelationManagers\Actions\DetachAction;
use Primix\RelationManagers\EmbeddedRecord;
use Primix\Resources\Actions\CreateAction;
use Primix\Resources\Actions\DeleteAction;
use Primix\Resources\Actions\EditAction;
use Primix\Tables\HasTable;
use Primix\Tables\Table;

class RelationManagerComponent extends Component
{
    use HasForms;
    use HasPageActions;
    use HasTable;

    public ?string $managerClass = null;

    public ?string $ownerClass = null;

    public int|string $ownerKey = 0;

    public bool $embedded = false;

    #[Modelable]
    public array $embeddedItems = [];

    protected ?Model $cachedOwner = null;

    public function mount(?string $managerClass = null, ?string $ownerClass = null, int|string $ownerKey = 0, bool $embedded = false, array $embeddedItems = []): void
    {
        $this->managerClass ??= $managerClass;
        $this->ownerClass ??= $ownerClass;
        $this->ownerKey ??= $ownerKey;
        $this->embedded = $embedded;
        $this->embeddedItems = $embeddedItems;
    }

    protected function getOwner(): Model
    {
        if ($this->ownerClass === null) {
            throw new \LogicException('getOwner() called in embedded mode — ownerClass is not set.');
        }

        if ($this->cachedOwner === null) {
            $this->cachedOwner = ($this->ownerClass)::findOrFail($this->ownerKey);
        }

        return $this->cachedOwner;
    }

    protected function getRelation(): \Illuminate\Database\Eloquent\Relations\Relation
    {
        $owner = $this->getOwner();
        $relationshipName = ($this->managerClass)::getRelationshipName();

        return $owner->{$relationshipName}();
    }

    protected function getRelationQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return $this->getRelation()->getQuery();
    }

    protected function isDetachedRelation(): bool
    {
        if ($this->embedded) {
            return false;
        }

        $relation = $this->getRelation();

        return $relation instanceof BelongsToMany || $relation instanceof MorphToMany;
    }

    protected function table(Table $table): Table
    {
        $manager = $this->managerClass;

        if ($this->embedded) {
            $itemsWithIndex = array_map(
                fn($item, $idx) => new EmbeddedRecord(array_merge($item, ['__embedded_index' => $idx])),
                $this->embeddedItems,
                array_keys($this->embeddedItems)
            );
            $table = $manager::table($table->embeddedRecords($itemsWithIndex)->recordKey('__embedded_index'));
        } else {
            $table = $manager::table($table->query($this->getRelationQuery()));
        }

        // Enable inline create by default unless explicitly configured
        if (! $table->isInlineCreateExplicitlyConfigured()) {
            $table->inlineCreate();
        }

        // Configure all table actions immediately so isModal() returns the correct value
        // when the table Blade template renders action buttons. Without this, actions are
        // rendered unconfigured (isModal=false) and Vue calls callAction instead of
        // openActionModal, executing the action directly with empty data.
        foreach (array_merge($table->getHeaderActions(), $table->getActions()) as $action) {
            if ($action instanceof Action) {
                $this->resolveAction($action);
                $this->configureAction($action);
            }
        }

        return $table;
    }

    protected function getHeaderActions(): array
    {
        $table = $this->getTable();

        return array_merge(
            $table->getHeaderActions(),
            $table->getActions(),
        );
    }

    protected function configureAction(Action $action): void
    {
        if ($this->embedded) {
            match (true) {
                $action instanceof CreateAction => $this->configureEmbeddedCreateAction($action),
                $action instanceof EditAction   => $this->configureEmbeddedEditAction($action),
                $action instanceof DeleteAction => $this->configureEmbeddedDeleteAction($action),
                $action instanceof AttachAction => $this->configureEmbeddedAttachAction($action),
                $action instanceof DetachAction => $this->configureEmbeddedDetachAction($action),
                default                         => null,
            };
            return;
        }

        match (true) {
            $action instanceof CreateAction => $this->configureCreateAction($action),
            $action instanceof EditAction   => $this->configureEditAction($action),
            $action instanceof DeleteAction => $this->configureDeleteAction($action),
            $action instanceof AttachAction => $this->configureAttachAction($action),
            $action instanceof DetachAction => $this->configureDetachAction($action),
            default                         => null,
        };
    }

    protected function configureCreateAction(CreateAction $action): void
    {
        $manager = $this->managerClass;

        $action->modal(true);
        $action->modalHeading('Create record');
        $action->form(fn (Form $form) => $manager::form($form));
        $action->action(function (array $data): void {
            $relation = $this->getRelation();

            if ($this->isDetachedRelation()) {
                /** @var BelongsToMany $relation */
                $record = $relation->getRelated()::create($data);
                $relation->attach($record->getKey());
            } else {
                $relation->create($data);
            }

            Notification::make()
                ->title('Created successfully')
                ->success()
                ->send();
        });
    }

    protected function configureEditAction(EditAction $action): void
    {
        $manager = $this->managerClass;

        $action->modal(true);
        $action->modalHeading('Edit record');

        $action->form(function (Form $form, ?Model $record) use ($manager) {
            $form = $manager::form($form);

            if ($record !== null) {
                $form->model($record);
            }

            return $form;
        });

        $action->fillForm(fn (?Model $record): array => $record?->toArray() ?? []);

        $action->action(function (array $data, ?Model $record): void {
            $record?->update($data);

            Notification::make()
                ->title('Saved successfully')
                ->success()
                ->send();
        });
    }

    protected function configureDeleteAction(DeleteAction $action): void
    {
        $action->action(function (?Model $record): void {
            if ($record === null) {
                return;
            }

            if ($this->isDetachedRelation()) {
                /** @var BelongsToMany $relation */
                $relation = $this->getRelation();
                $relation->detach($record->getKey());
            } else {
                $record->delete();
            }

            Notification::make()
                ->title('Deleted successfully')
                ->success()
                ->send();
        });
    }

    protected function configureAttachAction(AttachAction $action): void
    {
        $manager = $this->managerClass;

        $action->modal(true);
        $action->form(fn (Form $form) => $form->schema([
            \Primix\Forms\Components\Fields\Select::make('ids')
                ->label('Select records')
                ->multiple()
                ->options(function () use ($manager): array {
                    $relation = $this->getRelation();
                    $titleAttr = $manager::getRecordTitleAttribute();

                    return $relation->getRelated()::all()
                        ->pluck($titleAttr ?? 'id', 'id')
                        ->toArray();
                }),
        ]));

        $action->action(function (array $data): void {
            /** @var BelongsToMany $relation */
            $relation = $this->getRelation();
            $relation->attach($data['ids'] ?? []);

            Notification::make()
                ->title('Attached successfully')
                ->success()
                ->send();
        });
    }

    protected function configureDetachAction(DetachAction $action): void
    {
        $action->action(function (?Model $record): void {
            if ($record === null) {
                return;
            }

            /** @var BelongsToMany $relation */
            $relation = $this->getRelation();
            $relation->detach($record->getKey());

            Notification::make()
                ->title('Detached successfully')
                ->success()
                ->send();
        });
    }

    protected function configureEmbeddedCreateAction(CreateAction $action): void
    {
        $manager = $this->managerClass;

        $action->modal(true);
        $action->modalHeading('Add record');
        $action->form(fn (Form $form) => $manager::form($form));
        $action->action(function (array $data): void {
            $this->embeddedItems[] = $data;
            $this->resetTableCache();

            Notification::make()
                ->title('Added successfully')
                ->success()
                ->send();
        });
    }

    protected function configureEmbeddedEditAction(EditAction $action): void
    {
        $manager = $this->managerClass;

        $action->modal(true);
        $action->modalHeading('Edit record');
        $action->form(fn (Form $form) => $manager::form($form));
        $action->fillForm(fn ($record): array => $record instanceof \Illuminate\Support\Fluent ? $record->toArray() : ($record !== null ? (array) $record : []));
        $action->action(function (array $data, $record): void {
            $index = $record instanceof \Illuminate\Support\Fluent ? $record->__embedded_index : null;
            if ($index !== null) {
                $this->embeddedItems[(int) $index] = $data;
            }
            $this->resetTableCache();

            Notification::make()
                ->title('Saved successfully')
                ->success()
                ->send();
        });
    }

    protected function configureEmbeddedDeleteAction(DeleteAction $action): void
    {
        $action->action(function ($record): void {
            $index = ($record instanceof \Illuminate\Support\Fluent ? $record->__embedded_index : null);
            if ($index !== null) {
                array_splice($this->embeddedItems, (int) $index, 1);
            }
            $this->resetTableCache();

            Notification::make()
                ->title('Deleted successfully')
                ->success()
                ->send();
        });
    }

    protected function configureEmbeddedAttachAction(AttachAction $action): void
    {
        $action->hidden();
    }

    protected function configureEmbeddedDetachAction(DetachAction $action): void
    {
        $action->action(function ($record): void {
            $index = ($record instanceof \Illuminate\Support\Fluent ? $record->__embedded_index : null);
            if ($index !== null) {
                array_splice($this->embeddedItems, (int) $index, 1);
            }
            $this->resetTableCache();

            Notification::make()
                ->title('Removed')
                ->success()
                ->send();
        });
    }

    protected function performInlineCreate(\Primix\Tables\Table $table, array $data): void
    {
        if ($table->getInlineCreateCallback() !== null) {
            $this->evaluate($table->getInlineCreateCallback(), ['data' => $data]);

            return;
        }

        if ($this->embedded) {
            $this->embeddedItems[] = $data;

            return;
        }

        $relation = $this->getRelation();

        if ($this->isDetachedRelation()) {
            /** @var BelongsToMany $relation */
            $record = $relation->getRelated()::create($data);
            $relation->attach($record->getKey());
        } else {
            $relation->create($data);
        }
    }

    protected function resolveActionRecord(mixed $key): mixed
    {
        if ($this->embedded) {
            $index = (int) $key;
            if (!array_key_exists($index, $this->embeddedItems)) {
                return null;
            }
            return new EmbeddedRecord(array_merge($this->embeddedItems[$index], ['__embedded_index' => $index]));
        }

        $query = clone $this->getRelationQuery();

        return $query->where($this->getTable()->getRecordKeyName(), $key)->first();
    }

    /**
     * Override with #[Fragment('modal', 'table')] so that after saving an action
     * both the modal (closes) and the table (shows updated data) are re-rendered.
     */
    #[Fragment('modal', 'table')]
    public function callAction(array $arguments): mixed
    {
        return $this->executeCallAction($arguments);
    }

    /**
     * Override with #[Fragment('modal', 'table')] so that submitting the modal
     * form refreshes both the modal and the table.
     */
    #[Fragment('modal', 'table')]
    public function submitMountedAction(): mixed
    {
        if ($this->mountedAction === null) {
            return null;
        }

        return $this->callAction(['name' => $this->mountedAction]);
    }

    protected function render(): string
    {
        return 'primix::components.relation-manager';
    }
}
