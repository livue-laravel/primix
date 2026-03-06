<?php

namespace Primix\Forms\Concerns;

use LiVue\Attributes\Fragment;
use Primix\Actions\Action;
use Primix\Forms\Components\Fields\Field;
use Primix\Forms\Form;

trait HasFormFieldActions
{
    /**
     * Currently mounted form field action identifier.
     * Format: "formName.fieldName.actionName" (e.g., "form.category_id.create")
     */
    public ?string $mountedFormFieldAction = null;

    /**
     * Data for the currently mounted form field action form.
     */
    public array $mountedFormFieldActionData = [];

    /**
     * The key of the record being edited in a form field action.
     * Used for both single and multi-select edit operations.
     */
    public mixed $mountedFormFieldActionEditKey = null;

    /**
     * Options for the edit picker (multi-select only).
     * When populated and editKey is null, the picker modal is shown.
     */
    public array $mountedFormFieldActionEditOptions = [];

    /**
     * Open a modal for a form field action.
     * Called from Vue: openFormFieldAction('form', 'category_id', 'create')
     */
    #[Fragment('modal')]
    public function openFormFieldAction(string $formName, string $fieldName, string $actionName): void
    {
        // Ensure the form is available (e.g., action modal forms aren't cached across requests)
        $this->ensureFormAvailable($formName);

        $field = $this->resolveFormField($formName, $fieldName);

        if (! $field) {
            return;
        }

        $action = $this->resolveFieldAction($field, $actionName);

        if (! $action) {
            return;
        }

        // Hook: push current modal to stack before mutating state
        $this->beforeOpenFormFieldAction($formName, $fieldName, $actionName);

        $this->mountedFormFieldAction = "{$formName}.{$fieldName}.{$actionName}";

        // Pre-initialize all field keys so LiVue can track changes
        $data = $action->getFormData();

        foreach ($action->getFormSchema() as $component) {
            if (method_exists($component, 'getName')) {
                $name = $component->getName();

                if (! array_key_exists($name, $data)) {
                    $data[$name] = null;
                }
            }
        }

        // For edit action
        if ($actionName === 'edit') {
            if (method_exists($field, 'isMultiple') && $field->isMultiple()) {
                // Multi-select: show picker first
                $this->mountedFormFieldActionEditOptions = $this->getEditPickerOptions($field);
                $this->mountedFormFieldActionEditKey = null;
                $this->mountedFormFieldActionData = [];

                return;
            }

            // Single select: load record directly
            $selectedKey = $this->getFieldSelectedValue($field);

            if ($selectedKey === null) {
                return;
            }

            $this->mountedFormFieldActionEditKey = $selectedKey;
            $recordData = $this->loadEditOptionRecordByKey($field, $selectedKey);

            if ($recordData !== null) {
                $data = array_merge($data, $recordData);
            }
        }

        $this->mountedFormFieldActionData = $data;
    }

    /**
     * Submit (execute) the currently mounted form field action.
     * Called from Vue: submitFormFieldAction()
     */
    #[Fragment('modal')]
    public function submitFormFieldAction(): void
    {
        if (! $this->mountedFormFieldAction) {
            return;
        }

        [$formName, $fieldName, $actionName] = explode('.', $this->mountedFormFieldAction, 3);

        $this->ensureFormAvailable($formName);

        $field = $this->resolveFormField($formName, $fieldName);

        if (! $field) {
            $this->closeFormFieldAction();

            return;
        }

        $action = $this->resolveFieldAction($field, $actionName);

        if (! $action) {
            $this->closeFormFieldAction();

            return;
        }

        // Validate the action form data
        $rules = $this->buildFieldActionValidationRules($action);

        if (! empty($rules)) {
            $this->validate($rules);
        }

        $data = $this->mountedFormFieldActionData;

        if ($actionName === 'edit') {
            // Execute the edit logic
            $this->executeEditOption($field, $data, $this->mountedFormFieldActionEditKey);

            // Refresh options for the select
            $this->refreshFieldOptionsAfterCreate($formName, $field);
        } else {
            // Execute the create logic
            $newKey = $this->executeCreateOption($field, $data);

            if ($newKey !== null) {
                // Update the select field value
                $this->updateFieldValueAfterCreate($formName, $field, $newKey);

                // Refresh options for the select
                $this->refreshFieldOptionsAfterCreate($formName, $field);
            }
        }

        // Close the modal
        $this->closeFormFieldAction();
    }

    /**
     * Close the currently open form field action modal.
     */
    #[Fragment('modal')]
    public function closeFormFieldAction(): void
    {
        $this->mountedFormFieldAction = null;
        $this->mountedFormFieldActionData = [];
        $this->mountedFormFieldActionEditKey = null;
        $this->mountedFormFieldActionEditOptions = [];

        $this->afterCloseFormFieldAction();
    }

    /**
     * Create a missing option for a select field.
     * Creates the record using just the search text (title attribute) and updates the select.
     * Called from Vue: createMissingSelectOption('form', 'category_id', 'New Category')
     */
    public function createMissingSelectOption(string $formName, string $fieldName, string $search): void
    {
        $this->ensureFormAvailable($formName);

        $field = $this->resolveFormField($formName, $fieldName);

        if (! $field || ! method_exists($field, 'hasCreateMissingOption') || ! $field->hasCreateMissingOption()) {
            return;
        }

        $newKey = $this->executeCreateMissingOption($field, $search);

        if ($newKey !== null) {
            $this->updateFieldValueAfterCreate($formName, $field, $newKey);
            $this->refreshFieldOptionsAfterCreate($formName, $field);
        }
    }

    /**
     * Select a record to edit from the multi-select picker.
     * Called from Vue: selectFormFieldEditRecord(key)
     */
    #[Fragment('modal')]
    public function selectFormFieldEditRecord(mixed $key): void
    {
        if (! $this->mountedFormFieldAction) {
            return;
        }

        [$formName, $fieldName, $actionName] = explode('.', $this->mountedFormFieldAction, 3);

        $this->ensureFormAvailable($formName);

        $field = $this->resolveFormField($formName, $fieldName);

        if (! $field) {
            return;
        }

        $action = $this->resolveFieldAction($field, 'edit');

        if (! $action) {
            return;
        }

        $this->mountedFormFieldActionEditKey = $key;
        $this->mountedFormFieldActionEditOptions = [];

        // Pre-initialize all field keys so LiVue can track changes
        $data = $action->getFormData();

        foreach ($action->getFormSchema() as $component) {
            if (method_exists($component, 'getName')) {
                $name = $component->getName();

                if (! array_key_exists($name, $data)) {
                    $data[$name] = null;
                }
            }
        }

        // Load the record data
        $recordData = $this->loadEditOptionRecordByKey($field, $key);

        if ($recordData !== null) {
            $data = array_merge($data, $recordData);
        }

        $this->mountedFormFieldActionData = $data;
    }

    /**
     * Get the Action object for the currently mounted form field action.
     * Used by the blade template to render the modal.
     */
    public function getMountedFormFieldAction(): ?Action
    {
        if (! $this->mountedFormFieldAction) {
            return null;
        }

        [$formName, $fieldName, $actionName] = explode('.', $this->mountedFormFieldAction, 3);

        $this->ensureFormAvailable($formName);

        $field = $this->resolveFormField($formName, $fieldName);

        if (! $field) {
            return null;
        }

        return $this->resolveFieldAction($field, $actionName);
    }

    /**
     * Get a Form instance for the currently mounted field action.
     * Creates a temporary Form with statePath('mountedFormFieldActionData')
     * so that child components bind to the correct state.
     */
    public function getFieldActionForm(): ?Form
    {
        $action = $this->getMountedFormFieldAction();

        if (! $action || ! $action->hasForm()) {
            return null;
        }

        return Form::make()
            ->livue($this)
            ->name('mountedFormFieldActionData')
            ->statePath('mountedFormFieldActionData')
            ->submitAction('submitFormFieldAction')
            ->schema($action->getFormSchema());
    }

    /**
     * Resolve a field by form name and field name.
     */
    protected function resolveFormField(string $formName, string $fieldName): ?Field
    {
        $form = $this->getForm($formName);

        if (! $form) {
            return null;
        }

        $fields = $form->getFields();

        foreach ($fields as $statePath => $f) {
            $name = last(explode('.', $statePath));

            if ($name === $fieldName) {
                return $f;
            }
        }

        return null;
    }

    /**
     * Resolve an action from a field.
     * Supports 'create' and 'edit' actions on Select fields.
     */
    protected function resolveFieldAction(Field $field, string $actionName): ?Action
    {
        if ($actionName === 'create'
            && method_exists($field, 'hasCreateOptionForm')
            && $field->hasCreateOptionForm()
        ) {
            return $field->getCreateOptionAction();
        }

        if ($actionName === 'edit'
            && method_exists($field, 'hasEditOptionForm')
            && $field->hasEditOptionForm()
        ) {
            return $field->getEditOptionAction();
        }

        return null;
    }

    /**
     * Build validation rules from an action's form schema.
     */
    protected function buildFieldActionValidationRules(Action $action): array
    {
        $rules = [];

        foreach ($action->getFormSchema() as $component) {
            if (method_exists($component, 'getRules') && method_exists($component, 'getName')) {
                $fieldRules = $component->getRules();

                if ($fieldRules) {
                    $rules['mountedFormFieldActionData.' . $component->getName()] = $fieldRules;
                }
            }
        }

        return $rules;
    }

    /**
     * Hook called before opening a form field action modal.
     * When HasModalStack is present, pushes the current modal to the stack.
     */
    protected function beforeOpenFormFieldAction(string $formName, string $fieldName, string $actionName): void
    {
        if (method_exists($this, 'pushCurrentModalToStack')
            && method_exists($this, 'getCurrentModalType')
            && $this->getCurrentModalType() !== null
        ) {
            $this->pushCurrentModalToStack();
        }
    }

    /**
     * Hook called after closing a form field action modal.
     * When HasModalStack is present, pops the previous modal from the stack.
     */
    protected function afterCloseFormFieldAction(): void
    {
        if (method_exists($this, 'popModalFromStack')) {
            $this->popModalFromStack();
        }
    }

    /**
     * Ensure a form is available for field resolution.
     * Override in subclasses to build dynamic forms (e.g., action modal forms).
     */
    protected function ensureFormAvailable(string $formName): void
    {
        if (method_exists($this, 'buildDynamicForm')) {
            $this->buildDynamicForm($formName);
        }
    }
}
