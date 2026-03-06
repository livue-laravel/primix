<?php

namespace Primix\Forms\Concerns;

use Primix\Forms\Components\Fields\FileUpload;

trait HandlesFormFileUploads
{
    public function getFileUploadFields(): array
    {
        return array_filter(
            $this->getFields(),
            fn ($field) => $field instanceof FileUpload
        );
    }

    public function getFileUploadRules(): array
    {
        $rules = [];

        foreach ($this->getFileUploadFields() as $path => $field) {
            $relativePath = $this->statePath
                ? str($path)->after($this->statePath . '.')->toString()
                : $path;

            // Use getAllValidationRules which handles nested validation for multiple uploads
            $fieldRules = $field->getAllValidationRules($relativePath);

            foreach ($fieldRules as $rulePath => $ruleSet) {
                $rules[$rulePath] = $ruleSet;
            }
        }

        return $rules;
    }

    public function getFileUploadKeys(): array
    {
        $keys = [];

        foreach ($this->getFileUploadFields() as $path => $field) {
            $relativePath = $this->statePath
                ? str($path)->after($this->statePath . '.')->toString()
                : $path;

            $keys[] = $relativePath;
        }

        return $keys;
    }
}
