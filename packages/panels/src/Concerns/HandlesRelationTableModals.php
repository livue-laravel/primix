<?php

namespace Primix\Concerns;

use LiVue\Attributes\Fragment;
use Primix\Forms\Form;
use Primix\RelationManagers\RelationTable;

trait HandlesRelationTableModals
{
    public ?string $mountedRelationTableField = null;

    public ?string $mountedRelationTableAction = null;

    public ?int $mountedRelationTableIndex = null;

    public array $mountedRelationTableData = [];

    public mixed $mountedRelationTableAttachId = null;

    #[Fragment('relation-table-modal')]
    public function openRelationTableModal(array $arguments): void
    {
        $this->mountedRelationTableField  = $arguments['field'] ?? null;
        $this->mountedRelationTableAction = $arguments['action'] ?? 'create';
        $index                            = $arguments['index'] ?? null;
        $this->mountedRelationTableIndex  = $index !== null ? (int) $index : null;
        $this->mountedRelationTableAttachId = null;

        if ($this->mountedRelationTableAction === 'edit' && $this->mountedRelationTableIndex !== null) {
            $raw = data_get($this->data, $this->mountedRelationTableField . '.' . $this->mountedRelationTableIndex, []);
            $this->mountedRelationTableData = array_filter(
                $raw,
                fn ($key) => ! str_starts_with((string) $key, '__display_'),
                ARRAY_FILTER_USE_KEY
            );
        } else {
            $this->mountedRelationTableData = [];
        }
    }

    public function saveRelationTableRecord(): void
    {
        if ($this->mountedRelationTableField === null) {
            return;
        }

        $field = $this->getMountedRelationTableField();

        if ($field === null) {
            return;
        }

        $managerClass = $field->getManagerClass();

        $modalForm = Form::make()
            ->livue($this)
            ->name('mountedRelationTableData')
            ->statePath('mountedRelationTableData')
            ->schema($managerClass::form(new Form())->getFields());

        $this->validate(
            $modalForm->getValidationRules(),
            [],
            $modalForm->getValidationAttributes()
        );

        $fieldName  = $this->mountedRelationTableField;
        $index      = $this->mountedRelationTableIndex;
        $current    = data_get($this->data, $fieldName, []);

        $newData = array_filter(
            $this->mountedRelationTableData,
            fn ($key) => ! str_starts_with((string) $key, '__display_'),
            ARRAY_FILTER_USE_KEY
        );

        if ($index !== null) {
            $existing        = $current[$index] ?? [];
            $current[$index] = array_merge($existing, $newData);
        } else {
            $current[] = $newData;
        }

        data_set($this->data, $fieldName, array_values($current));

        $this->resetRelationTableModal();
    }

    public function attachRelationTableRecord(): void
    {
        if ($this->mountedRelationTableField === null || $this->mountedRelationTableAttachId === null) {
            return;
        }

        $field = $this->getMountedRelationTableField();

        if ($field === null) {
            return;
        }

        $record = collect($field->getAvailableRecords())
            ->first(fn ($r) => (string) $r['id'] === (string) $this->mountedRelationTableAttachId);

        if ($record !== null) {
            $fieldName = $this->mountedRelationTableField;
            $current   = data_get($this->data, $fieldName, []);

            $alreadyAttached = collect($current)->contains('id', $record['id']);

            if (! $alreadyAttached) {
                $current[] = $record;
                data_set($this->data, $fieldName, array_values($current));
            }
        }

        $this->resetRelationTableModal();
    }

    #[Fragment('relation-table-modal')]
    public function closeRelationTableModal(): void
    {
        $this->resetRelationTableModal();
    }

    public function deleteRelationTableRecord(array $arguments): void
    {
        $fieldName = $arguments['field'];
        $index     = (int) $arguments['index'];

        $current = data_get($this->data, $fieldName, []);
        array_splice($current, $index, 1);
        data_set($this->data, $fieldName, array_values($current));
    }

    public function getMountedRelationTableField(): ?RelationTable
    {
        if ($this->mountedRelationTableField === null) {
            return null;
        }

        $form = method_exists($this, 'getForm') ? $this->getForm('form') : null;

        if ($form === null) {
            return null;
        }

        foreach ($form->getFields() as $path => $field) {
            if (
                method_exists($field, 'isRelationTableField') && $field->isRelationTableField()
                && method_exists($field, 'isDetached') && ! $field->isDetached()
                && $field->getRelationshipName() === $this->mountedRelationTableField
            ) {
                return $field;
            }
        }

        return null;
    }

    private function resetRelationTableModal(): void
    {
        $this->mountedRelationTableField    = null;
        $this->mountedRelationTableAction   = null;
        $this->mountedRelationTableIndex    = null;
        $this->mountedRelationTableData     = [];
        $this->mountedRelationTableAttachId = null;
    }
}
