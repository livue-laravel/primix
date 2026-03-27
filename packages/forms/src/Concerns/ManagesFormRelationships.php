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
                && method_exists($field, 'isBelongsToMany')
                && $field->isBelongsToMany()
        );
    }

    private function getRelationTableFields(): array
    {
        return array_filter(
            $this->getFields(),
            fn ($field) => method_exists($field, 'isRelationTableField')
                && $field->isRelationTableField()
                && method_exists($field, 'isDetached')
                && ! $field->isDetached()
        );
    }

    private function toRelativePath(string $path): string
    {
        return $this->statePath
            ? str($path)->after($this->statePath . '.')->toString()
            : $path;
    }

    public function fillWithRelationships(array $data, Model $record): array
    {
        foreach ($this->getRelationshipFields() as $path => $field) {
            $relativePath = $this->toRelativePath($path);

            $values = $field->getRelationshipValues($record);

            if ($values !== null) {
                data_set($data, $relativePath, $values);
            }
        }

        $data = $this->fillWithNestedRelationships($data, $record);

        foreach ($this->getRelationTableFields() as $path => $field) {
            $relativePath = $this->toRelativePath($path);
            data_set($data, $relativePath, $field->getRelationshipValues($record));
        }

        return $data;
    }

    public function saveRelationships(Model $record, array $data): void
    {
        foreach ($this->getRelationshipFields() as $path => $field) {
            $relativePath = $this->toRelativePath($path);

            $state = data_get($data, $relativePath, []);

            $field->saveRelationship($record, $state);
        }

        $this->saveNestedRelationships($record, $data);

        foreach ($this->getRelationTableFields() as $path => $field) {
            $relativePath = $this->toRelativePath($path);
            $items = data_get($data, $relativePath, []);
            if (is_array($items)) {
                $field->saveRelationshipItems($record, $items);
            }
        }
    }

    public function getRelationshipKeys(): array
    {
        $keys = [];

        foreach ($this->getRelationshipFields() as $path => $field) {
            $relativePath = $this->toRelativePath($path);
            $keys[] = $relativePath;
        }

        $keys = array_merge($keys, $this->getNestedRelationshipKeys());

        foreach ($this->getRelationTableFields() as $path => $field) {
            $keys[] = $this->toRelativePath($path);
        }

        return $keys;
    }
}
