<?php

namespace Primix\Forms\Concerns;

use LiVue\Attributes\Json;

trait HasAsyncSelectSearch
{
    /**
     * Store async search options for select fields.
     * Keyed by "formName.fieldName" => options array.
     */
    public array $asyncSelectOptions = [];

    /**
     * Track loading state for async select fields.
     * Keyed by "formName.fieldName" => bool.
     */
    public array $asyncSelectLoading = [];

    /**
     * Search options for a select field asynchronously.
     * Called from Vue when user types in an async searchable select.
     *
     * @return array<array{label: string, value: mixed}>
     */
    #[Json]
    public function searchSelectOptions(string $formName, string $fieldName, string $search): array
    {
        $optionKey = "{$formName}.{$fieldName}";

        // Set loading state
        $this->asyncSelectLoading[$optionKey] = true;

        $form = $this->getForm($formName);

        if (! $form) {
            $this->asyncSelectLoading[$optionKey] = false;

            return [];
        }

        $fields = $form->getFields();

        // Find the field by name (the last part of the state path)
        $field = null;
        foreach ($fields as $statePath => $f) {
            $name = last(explode('.', $statePath));
            if ($name === $fieldName) {
                $field = $f;
                break;
            }
        }

        if (! $field || ! method_exists($field, 'searchOptions')) {
            $this->asyncSelectLoading[$optionKey] = false;

            return [];
        }

        $options = $field->searchOptions($search);

        // Format options for Vue
        $formatted = collect($options)->map(function ($label, $value) {
            return [
                'label' => $label,
                'value' => $value,
            ];
        })->values()->all();

        // Preserve labels for already-selected values
        if (method_exists($field, 'getSelectedOptions')) {
            $selectedOptions = $field->getSelectedOptions();
            $searchValues = collect($formatted)->pluck('value')->all();

            foreach ($selectedOptions as $value => $label) {
                if (! in_array($value, $searchValues, false)) {
                    array_unshift($formatted, [
                        'label' => $label,
                        'value' => $value,
                    ]);
                }
            }
        }

        // Store options for this field
        $this->asyncSelectOptions[$optionKey] = $formatted;
        $this->asyncSelectLoading[$optionKey] = false;

        return $formatted;
    }

    /**
     * Search options for a MorphToSelect field asynchronously.
     * Called from Vue when user types in the record selector of a morph-to-select.
     *
     * @return array<array{label: string, value: mixed}>
     */
    #[Json]
    public function searchMorphToSelectOptions(string $formName, string $fieldName, string $modelClass, string $search): array
    {
        $optionKey = "{$formName}.{$fieldName}.{$modelClass}";

        // Set loading state
        $this->asyncSelectLoading[$optionKey] = true;

        $form = $this->getForm($formName);

        if (! $form) {
            $this->asyncSelectLoading[$optionKey] = false;

            return [];
        }

        $fields = $form->getFields();

        // Find the field by name
        $field = null;
        foreach ($fields as $statePath => $f) {
            $name = last(explode('.', $statePath));
            if ($name === $fieldName) {
                $field = $f;
                break;
            }
        }

        if (! $field || ! method_exists($field, 'searchOptionsForType')) {
            $this->asyncSelectLoading[$optionKey] = false;

            return [];
        }

        $options = $field->searchOptionsForType($modelClass, $search);

        // Format options for Vue
        $formatted = collect($options)->map(function ($label, $value) {
            return [
                'label' => $label,
                'value' => $value,
            ];
        })->values()->all();

        // Store options for this field + type
        $this->asyncSelectOptions[$optionKey] = $formatted;
        $this->asyncSelectLoading[$optionKey] = false;

        return $formatted;
    }
}
