<?php

namespace Primix\Forms\Concerns;

use LiVue\Features\SupportFileUploads\WithFileUploads;
use Primix\Forms\Form;
use ReflectionClass;
use ReflectionMethod;
use ReflectionNamedType;

trait IntegratesFileUploads
{
    use WithFileUploads {
        WithFileUploads::getFileUploadProperties as baseGetFileUploadProperties;
        WithFileUploads::fileRules as baseFileRules;
    }

    /**
     * Get file upload properties from all forms.
     * Overrides WithFileUploads to detect FileUpload fields in forms.
     *
     * @return string[]
     */
    public function getFileUploadProperties(): array
    {
        // Start with base properties (from type hints)
        $properties = $this->baseGetFileUploadProperties();

        // Ensure forms are initialized (they are lazy-loaded)
        $this->initializeFormsForFileUploads();

        // Add FileUpload field paths from all forms
        foreach ($this->cachedForms as $form) {
            foreach ($form->getFileUploadFields() as $statePath => $field) {
                if (! in_array($statePath, $properties)) {
                    $properties[] = $statePath;
                }
            }
        }

        return $properties;
    }

    /**
     * Initialize forms that may contain FileUpload fields.
     * This ensures upload tokens are generated even for lazy-loaded forms.
     */
    protected function initializeFormsForFileUploads(): void
    {
        // Look for form methods using reflection
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Skip methods from traits and parent classes
            if ($method->getDeclaringClass()->getName() !== static::class) {
                continue;
            }

            $methodName = $method->getName();

            // Check if this is a form method (takes Form parameter and returns Form)
            $parameters = $method->getParameters();
            $returnType = $method->getReturnType();

            if (count($parameters) === 1
                && $returnType instanceof ReflectionNamedType
                && $returnType->getName() === Form::class
            ) {
                $paramType = $parameters[0]->getType();

                if ($paramType instanceof ReflectionNamedType
                    && $paramType->getName() === Form::class
                ) {
                    // This looks like a form method, initialize it
                    $this->getForm($methodName);
                }
            }
        }
    }

    /**
     * Get file validation rules for all FileUpload fields.
     * Overrides WithFileUploads to provide rules from form fields.
     * Supports nested validation for multiple file uploads.
     *
     * @return array<string, array<string>>
     */
    public function fileRules(): array
    {
        // Start with base rules (from component definition)
        $rules = $this->baseFileRules();

        // Add rules from FileUpload fields in all forms
        foreach ($this->cachedForms as $form) {
            foreach ($form->getFileUploadFields() as $statePath => $field) {
                // Use getAllValidationRules which handles nested validation
                $fieldRules = $field->getAllValidationRules($statePath);

                foreach ($fieldRules as $rulePath => $ruleSet) {
                    $rules[$rulePath] = $ruleSet;
                }
            }
        }

        return $rules;
    }

    /**
     * Get keys (property names) for all file upload fields in forms.
     * Useful for excluding from Eloquent mass assignment.
     *
     * @return string[]
     */
    public function getFormFileUploadKeys(): array
    {
        $keys = [];

        foreach ($this->cachedForms as $form) {
            $formKeys = $form->getFileUploadKeys();
            $keys = array_merge($keys, $formKeys);
        }

        return array_unique($keys);
    }
}
