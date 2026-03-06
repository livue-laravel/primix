<?php

namespace Primix\Forms\Concerns;

use Illuminate\Database\Eloquent\Model;

trait ManagesFormRelationships
{
    public function getRelationshipFields(): array
    {
        return array_filter(
            $this->getFields(),
            fn ($field) => method_exists($field, 'hasRelationship')
                && $field->hasRelationship()
                && $field->isBelongsToMany()
        );
    }

    public function fillWithRelationships(array $data, Model $record): array
    {
        foreach ($this->getRelationshipFields() as $path => $field) {
            $relativePath = $this->statePath
                ? str($path)->after($this->statePath . '.')->toString()
                : $path;

            $values = $field->getRelationshipValues($record);

            if ($values !== null) {
                data_set($data, $relativePath, $values);
            }
        }

        $data = $this->fillWithNestedRelationships($data, $record);

        return $data;
    }

    public function saveRelationships(Model $record, array $data): void
    {
        foreach ($this->getRelationshipFields() as $path => $field) {
            $relativePath = $this->statePath
                ? str($path)->after($this->statePath . '.')->toString()
                : $path;

            $state = data_get($data, $relativePath, []);

            $field->saveRelationship($record, $state);
        }

        $this->saveNestedRelationships($record, $data);
    }

    public function getRelationshipKeys(): array
    {
        $keys = [];

        foreach ($this->getRelationshipFields() as $path => $field) {
            $relativePath = $this->statePath
                ? str($path)->after($this->statePath . '.')->toString()
                : $path;

            $keys[] = $relativePath;
        }

        return array_merge($keys, $this->getNestedRelationshipKeys());
    }
}
