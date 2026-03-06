<?php

namespace Primix\Forms\Concerns;

use Primix\Forms\Components\Fields\Field;

trait ManagesFieldOptions
{
    /**
     * Execute the create-option logic for a field.
     * Returns the key of the newly created record, or null on failure.
     */
    protected function executeCreateOption(Field $field, array $data): mixed
    {
        // Custom createOptionUsing callback takes precedence
        $callback = method_exists($field, 'getCreateOptionUsing') ? $field->getCreateOptionUsing() : null;

        if ($callback) {
            return $callback($data);
        }

        // Auto-create via relationship model
        if (method_exists($field, 'hasRelationship') && $field->hasRelationship()) {
            $relation = $field->getRelation();

            if ($relation) {
                $relatedModel = $relation->getRelated();
                $created = $relatedModel->create($data);

                return $created->getKey();
            }
        }

        return null;
    }

    /**
     * Execute the create-missing-option logic for a field.
     * Returns the key of the newly created record, or null on failure.
     */
    protected function executeCreateMissingOption(Field $field, string $value): mixed
    {
        $callback = method_exists($field, 'getCreateMissingOptionUsing') ? $field->getCreateMissingOptionUsing() : null;

        if ($callback) {
            return $callback($value);
        }

        if (method_exists($field, 'hasRelationship') && $field->hasRelationship()) {
            $relation = $field->getRelation();

            if ($relation) {
                $titleAttribute = $field->getRelationshipTitleAttribute();
                $created = $relation->getRelated()->create([
                    $titleAttribute => $value,
                ]);

                return $created->getKey();
            }
        }

        return null;
    }

    /**
     * Execute the edit-option logic for a field.
     * Updates the record identified by $recordKey with the provided data.
     */
    protected function executeEditOption(Field $field, array $data, mixed $recordKey = null): void
    {
        // Custom editOptionUsing callback takes precedence
        $callback = method_exists($field, 'getEditOptionUsing') ? $field->getEditOptionUsing() : null;

        if ($callback) {
            $callback($data, $recordKey);

            return;
        }

        // Auto-update via relationship model
        if (! method_exists($field, 'hasRelationship') || ! $field->hasRelationship()) {
            return;
        }

        $relation = $field->getRelation();

        if (! $relation || empty($recordKey)) {
            return;
        }

        $record = $relation->getRelated()->find($recordKey);

        if (! $record) {
            return;
        }

        $record->update($data);
    }

    /**
     * Load a specific record's data by key for editing.
     */
    protected function loadEditOptionRecordByKey(Field $field, mixed $key): ?array
    {
        if (! method_exists($field, 'hasRelationship') || ! $field->hasRelationship()) {
            return null;
        }

        $relation = $field->getRelation();

        if (! $relation) {
            return null;
        }

        $record = $relation->getRelated()->find($key);

        return $record?->toArray();
    }

    /**
     * Get the list of currently selected options for the edit picker (multi-select).
     *
     * @return array<array{label: string, value: mixed}>
     */
    protected function getEditPickerOptions(Field $field): array
    {
        if (! method_exists($field, 'hasRelationship') || ! $field->hasRelationship()) {
            return [];
        }

        $relation = $field->getRelation();

        if (! $relation) {
            return [];
        }

        $values = $this->getFieldSelectedValue($field);

        if (! is_array($values) || empty($values)) {
            return [];
        }

        $titleAttribute = $field->getRelationshipTitleAttribute();
        $keyName = $relation->getRelated()->getKeyName();

        return $relation->getRelated()
            ->whereIn($keyName, $values)
            ->get()
            ->map(fn ($record) => [
                'label' => $record->{$titleAttribute},
                'value' => $record->{$keyName},
            ])
            ->all();
    }

    /**
     * Update the select field value after creating a new record.
     */
    protected function updateFieldValueAfterCreate(string $formName, Field $field, mixed $newKey): void
    {
        $statePath = $field->getStatePath();
        $segments = explode('.', $statePath);
        $property = array_shift($segments);

        if (method_exists($field, 'isMultiple') && $field->isMultiple()) {
            // For multiple select, add to existing array
            if (empty($segments)) {
                $current = $this->{$property} ?? [];
                $current[] = $newKey;
                $this->{$property} = $current;
            } else {
                $data = $this->{$property};
                $current = data_get($data, implode('.', $segments)) ?? [];
                $current[] = $newKey;
                data_set($data, implode('.', $segments), $current);
                $this->{$property} = $data;
            }
        } else {
            // For single select, replace value
            if (empty($segments)) {
                $this->{$property} = $newKey;
            } else {
                $data = $this->{$property};
                data_set($data, implode('.', $segments), $newKey);
                $this->{$property} = $data;
            }
        }
    }

    /**
     * Refresh the select options after creating a new record.
     */
    protected function refreshFieldOptionsAfterCreate(string $formName, Field $field): void
    {
        $fieldName = $field->getName();
        $optionKey = "{$formName}.{$fieldName}";

        if (method_exists($field, 'getOptionsForVue')) {
            $this->asyncSelectOptions[$optionKey] = $field->getOptionsForVue();
        }
    }

    /**
     * Get the currently selected value from a field's state path.
     */
    protected function getFieldSelectedValue(Field $field): mixed
    {
        $statePath = $field->getStatePath();
        $segments = explode('.', $statePath);
        $property = array_shift($segments);

        return empty($segments)
            ? ($this->{$property} ?? null)
            : data_get($this->{$property} ?? [], implode('.', $segments));
    }
}
