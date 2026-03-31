<?php

namespace Primix\Concerns;

use Illuminate\Database\Eloquent\Model;
use Primix\Actions\Action;
use Primix\Actions\Concerns\HasActions;
use Primix\Forms\Form;

trait HasPageActions
{
    use HasActions;
    use HasModalStack;

    protected array $cachedHeaderActions = [];
    protected array $cachedFooterActions = [];

    protected function getHeaderActions(): array
    {
        return [];
    }

    protected function getFooterActions(): array
    {
        return [];
    }

    /**
     * @return array<Action>
     */
    public function getVisibleHeaderActions(): array
    {
        return array_filter(
            $this->getCachedHeaderActions(),
            fn (Action $action) => $action->isVisible()
        );
    }

    /**
     * @return array<Action>
     */
    public function getVisibleFooterActions(): array
    {
        return array_filter(
            $this->getCachedFooterActions(),
            fn (Action $action) => $action->isVisible()
        );
    }

    /**
     * @return array<string, Action>
     */
    public function getCachedHeaderActions(): array
    {
        if (empty($this->cachedHeaderActions)) {
            $this->cachePageActions();
        }

        return $this->cachedHeaderActions;
    }

    /**
     * @return array<string, Action>
     */
    public function getCachedFooterActions(): array
    {
        if (empty($this->cachedFooterActions)) {
            $this->cachePageActions();
        }

        return $this->cachedFooterActions;
    }

    protected function cachePageActions(): void
    {
        $this->cachedHeaderActions = [];
        $this->cachedFooterActions = [];

        foreach ($this->getHeaderActions() as $action) {
            if ($action instanceof Action && $action->getName() !== null) {
                $this->resolveAction($action);
                $this->configureAction($action);
                $this->cachedHeaderActions[$action->getName()] = $action;
            }
        }

        foreach ($this->getFooterActions() as $action) {
            if ($action instanceof Action && $action->getName() !== null) {
                $this->resolveAction($action);
                $this->configureAction($action);
                $this->cachedFooterActions[$action->getName()] = $action;
            }
        }
    }

    /**
     * Auto-inject component, resource, and record into the action.
     */
    protected function resolveAction(Action $action): void
    {
        if (method_exists($action, 'component')) {
            $action->component($this);
        }

        if (method_exists($this, 'resolveResource')) {
            $action->resource($this->resolveResource());
        }

        if (property_exists($this, 'record') && $this->record instanceof Model) {
            $action->record($this->record);
        }
    }

    /**
     * Override HasActions::getActions() to merge both positions.
     * This ensures callAction/openActionModal can find any action.
     */
    protected function getActions(): array
    {
        return array_merge($this->getHeaderActions(), $this->getFooterActions());
    }

    /**
     * Get a Form instance for the currently mounted action.
     * Wraps the action's form schema with statePath('mountedActionData')
     * so fields bind to the correct reactive property.
     *
     * The form is cached in cachedForms so IntegratesFileUploads
     * can discover FileUpload fields and generate upload tokens.
     */
    public function getActionForm(): ?Form
    {
        $action = $this->getMountedAction();

        if (! $action || ! $action->hasForm()) {
            // Don't clear the cache if a form field action is using this form
            // (the action was pushed to the modal stack, but its form is still needed)
            $formFieldActionNeedsForm = property_exists($this, 'mountedFormFieldAction')
                && $this->mountedFormFieldAction !== null
                && str_starts_with($this->mountedFormFieldAction, 'mountedActionData.');

            if (! $formFieldActionNeedsForm
                && property_exists($this, 'cachedForms')
                && isset($this->cachedForms['mountedActionData'])
            ) {
                unset($this->cachedForms['mountedActionData']);
            }

            return null;
        }

        // Always rebuild — multi-step actions may change schema between steps.
        // buildForm($this) injects the livue context into the closure so the Form
        // is fully configured (columns, schema) before we add statePath/submitAction.
        $form = $action->buildForm($this);

        if ($form === null) {
            return null;
        }

        $form->name('mountedActionData')
            ->statePath('mountedActionData')
            ->submitAction('submitMountedAction')
            ->renderFieldActionModal(false);

        // Set model on form for relationship fields
        $record = $action->getRecord();
        if ($record !== null) {
            $form->model($record);
        } elseif ($action->getResourceClass() !== null) {
            $form->model($action->getResourceClass()::getModel());
        }

        // Register in cachedForms so IntegratesFileUploads discovers FileUpload fields
        if (property_exists($this, 'cachedForms')) {
            $this->cachedForms['mountedActionData'] = $form;
        }

        return $form;
    }

    /**
     * Prepare action form data before the action processes it.
     */
    protected function prepareActionCallData(Action $action, array $data): array
    {
        // Build the form if not cached yet (callAction runs in a new request cycle)
        $form = $this->getActionForm();

        if ($form !== null) {
            // Validate form fields before processing
            $rules = $form->getValidationRules();
            if (! empty($rules)) {
                $this->validate($rules, $form->getValidationMessages(), $form->getValidationAttributes());
            }

            $form->dehydrateState($data);
            $this->mountedActionData = $data;
        }

        return $data;
    }

    /**
     * Override for resource pages with a record property.
     */
    protected function getMountedActionRecord(): ?Model
    {
        if (property_exists($this, 'record') && $this->record instanceof Model) {
            return $this->record;
        }

        return null;
    }

    /**
     * Build a dynamic form on demand for form field action resolution.
     * Called by HasFormFieldActions::ensureFormAvailable() when the form
     * isn't cached yet (e.g., action modal forms across request cycles).
     */
    protected function buildDynamicForm(string $formName): void
    {
        if ($formName !== 'mountedActionData') {
            return;
        }

        if ($this->mountedAction !== null) {
            $this->getActionForm();

            return;
        }

        // The action was pushed to the modal stack but its form is still needed
        // to resolve fields for the form field action. Temporarily restore the
        // action name to build and cache the form.
        if (method_exists($this, 'getModalStackDepth')
            && $this->getModalStackDepth() > 0
        ) {
            $lastEntry = end($this->modalStack);

            if ($lastEntry['type'] === 'action') {
                $this->mountedAction = $lastEntry['action'];
                $this->mountedActionRecordKey = $lastEntry['recordKey'] ?? null;
                $this->getActionForm();
                $this->mountedAction = null;
                $this->mountedActionRecordKey = null;
                $this->cachedMountedActionRecord = null;
            }
        }
    }
}
