<?php

namespace Primix\RelationManagers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Primix\Forms\Components\Fields\Field;
use Primix\Forms\Form;
use Primix\Support\Contracts\RelationManagerField;
use Primix\Tables\Table;

class RelationTable extends Field implements RelationManagerField
{
    protected string $managerClass;

    protected bool $detached = false;

    protected ?Table $resolvedTable = null;

    public function manager(string $managerClass): static
    {
        $this->managerClass = $managerClass;

        return $this;
    }

    public function detached(bool $detached = true): static
    {
        $this->detached = $detached;

        return $this;
    }

    public function isDetached(): bool
    {
        return $this->detached;
    }

    /**
     * Duck typing marker for ManagesFormRelationships.
     */
    public function isRelationTableField(): bool
    {
        return true;
    }

    public function getManagerClass(): string
    {
        return $this->managerClass;
    }

    public function getRelationshipName(): string
    {
        return $this->managerClass::getRelationshipName();
    }

    public function isDehydrated(): bool
    {
        // Detached: relation manager handles DB directly, nothing to dehydrate in form
        // Embedded: items synced via #[Modelable] in child component, form state needed
        return ! $this->detached;
    }

    public function getOwnerModel(): mixed
    {
        $livue = $this->getLiVue();

        if (! $livue) {
            return null;
        }

        return property_exists($livue, 'record') ? $livue->record : null;
    }

    public function getView(): string
    {
        return 'primix::components.fields.relation-table';
    }

    public function getDefaultValue(): mixed
    {
        return $this->detached ? null : [];
    }

    protected function getAutoRules(): array
    {
        return $this->detached ? [] : ['array'];
    }

    protected function resolveTable(): Table
    {
        if ($this->resolvedTable === null) {
            $this->resolvedTable = $this->managerClass::table(new Table());
        }

        return $this->resolvedTable;
    }

    protected function resolveColumns(): array
    {
        return $this->resolveTable()->getColumns();
    }

    public function getHeaderActionType(): ?string
    {
        foreach ($this->resolveTable()->getHeaderActions() as $action) {
            if ($action instanceof \Primix\RelationManagers\Actions\AttachAction) {
                return 'attach';
            }
            if ($action instanceof \Primix\Resources\Actions\CreateAction) {
                return 'create';
            }
        }

        return null;
    }

    public function getRowActionTypes(): array
    {
        $types = [];

        foreach ($this->resolveTable()->getActions() as $action) {
            if ($action instanceof \Primix\Resources\Actions\EditAction) {
                $types[] = 'edit';
            }
            if ($action instanceof \Primix\Resources\Actions\DeleteAction) {
                $types[] = 'delete';
            }
            if ($action instanceof \Primix\RelationManagers\Actions\DetachAction) {
                $types[] = 'detach';
            }
        }

        return $types;
    }

    protected function getAvailableRecords(): array
    {
        $model = $this->getOwnerModel();

        if (! $model instanceof \Illuminate\Database\Eloquent\Model) {
            return [];
        }

        $relation = $model->{$this->getRelationshipName()}();
        $related = $relation->getRelated();

        return $related::all()->map(fn ($r) => $r->toArray())->toArray();
    }

    public function getRelationshipValues(Model $record): array
    {
        $relationshipName = $this->getRelationshipName();
        $columns = $this->resolveColumns();

        return $record->{$relationshipName}()->get()->map(function ($item) use ($columns) {
            $data = $item->toArray();

            foreach ($columns as $column) {
                $name = $column->getName();
                $state = $column->getState($item);

                if ($state instanceof \DateTimeInterface) {
                    $state = $state->format('Y-m-d H:i');
                }

                $data['__display_' . $name] = $state;
            }

            return $data;
        })->toArray();
    }

    public function saveRelationshipItems(Model $record, array $items): void
    {
        $relationshipName = $this->getRelationshipName();
        $relation = $record->{$relationshipName}();

        // Strip internal metadata keys (e.g. __display_*, __embedded_index) before persisting
        $items = array_map(
            fn ($item) => array_filter($item, fn ($key) => ! str_starts_with((string) $key, '__'), ARRAY_FILTER_USE_KEY),
            $items
        );

        if ($relation instanceof BelongsToMany || $relation instanceof MorphToMany) {
            $ids = collect($items)
                ->filter(fn ($item) => ! empty($item['id']))
                ->pluck('id')
                ->all();
            $relation->sync($ids);
        } else {
            $keyName = $relation->getRelated()->getKeyName();
            $existingIds = collect($items)
                ->filter(fn ($item) => ! empty($item[$keyName]))
                ->pluck($keyName)
                ->all();

            if (! empty($existingIds)) {
                $relation->whereNotIn($keyName, $existingIds)->delete();
            } else {
                $relation->delete();
            }

            foreach ($items as $item) {
                $itemData = collect($item)->except([$keyName])->all();

                if (! empty($item[$keyName])) {
                    $relation->where($keyName, $item[$keyName])->update($itemData);
                } else {
                    $relation->create($itemData);
                }
            }
        }
    }

    public function getColumnDefinitions(): array
    {
        return array_values(array_map(
            fn ($column) => [
                'name'  => $column->getName(),
                'label' => $column->getLabel() ?? str($column->getName())->title()->toString(),
            ],
            $this->resolveColumns()
        ));
    }

    public function getFormFieldDefinitions(): array
    {
        $form = $this->managerClass::form(new Form());
        $definitions = [];

        foreach ($form->getFields() as $field) {
            $type = match (true) {
                $field instanceof \Primix\Forms\Components\Fields\Select => 'select',
                $field instanceof \Primix\Forms\Components\Fields\Textarea => 'textarea',
                $field instanceof \Primix\Forms\Components\Fields\Toggle => 'toggle',
                $field instanceof \Primix\Forms\Components\Fields\Checkbox => 'checkbox',
                $field instanceof \Primix\Forms\Components\Fields\DatePicker => 'date',
                $field instanceof \Primix\Forms\Components\Fields\ColorPicker => 'color',
                default => 'text',
            };

            $definition = [
                'name'        => $field->getName(),
                'label'       => $field->getLabel() ?? str($field->getName())->title()->toString(),
                'type'        => $type,
                'required'    => $field->isRequired(),
                'placeholder' => method_exists($field, 'getPlaceholder') ? $field->getPlaceholder() : null,
                'options'     => [],
            ];

            if ($field instanceof \Primix\Forms\Components\Fields\Select) {
                try {
                    $definition['options'] = $field->getOptionsForVue();
                } catch (\Throwable) {
                    $definition['options'] = [];
                }
            }

            $definitions[] = $definition;
        }

        return $definitions;
    }


    public function toVueProps(): array
    {
        $props = [
            'detached'     => $this->detached,
            'managerClass' => $this->managerClass,
        ];

        if (! $this->detached) {
            $props['columns']          = $this->getColumnDefinitions();
            $props['headerActionType'] = $this->getHeaderActionType();
            $props['rowActions']       = $this->getRowActionTypes();
        }

        return array_merge(parent::toVueProps(), $props);
    }
}
