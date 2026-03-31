<?php

namespace Primix\Actions\Concerns;

use Closure;
use Illuminate\Database\Eloquent\Model;
use LiVue\Attributes\Fragment;
use Primix\Actions\Action;
use Primix\Actions\ActionGroup;

trait HasActions
{
    /**
     * The actions available for this component.
     *
     * @var array<string, Action>
     */
    protected array $cachedActions = [];

    /**
     * The currently open modal action name.
     */
    public ?string $mountedAction = null;

    /**
     * Data for the currently mounted action form.
     */
    public array $mountedActionData = [];

    /**
     * Persisted record key for the mounted action (survives re-renders).
     */
    public string|int|null $mountedActionRecordKey = null;

    /**
     * Cached record instance to avoid multiple DB queries per render.
     * Typed as mixed to support non-Eloquent records (e.g., embedded array items).
     */
    protected mixed $cachedMountedActionRecord = null;

    /**
     * Define the actions for this component.
     *
     * @return array<Action>
     */
    protected function getActions(): array
    {
        return [];
    }

    /**
     * Get a cached action by name.
     */
    public function getAction(string $name): ?Action
    {
        return $this->getCachedActions()[$name] ?? null;
    }

    /**
     * Get all cached actions.
     *
     * @return array<string, Action>
     */
    public function getCachedActions(): array
    {
        if (empty($this->cachedActions)) {
            $this->cacheActions();
        }

        return $this->cachedActions;
    }

    /**
     * Cache the actions by name.
     */
    protected function cacheActions(): void
    {
        $this->cachedActions = [];

        foreach ($this->getActions() as $action) {
            if ($action instanceof ActionGroup) {
                foreach ($action->getActions() as $groupedAction) {
                    $name = $groupedAction->getName();

                    if ($name !== null) {
                        $this->resolveAction($groupedAction);
                        $this->configureAction($groupedAction);
                        $this->cachedActions[$name] = $groupedAction;
                    }
                }
            } elseif ($action instanceof Action) {
                $name = $action->getName();

                if ($name !== null) {
                    $this->resolveAction($action);
                    $this->configureAction($action);
                    $this->cachedActions[$name] = $action;
                }
            }
        }
    }

    /**
     * Resolve an action with context (component, resource, record).
     * Override in subclasses.
     */
    protected function resolveAction(Action $action): void
    {
        // Base: no-op. Pages/Tables override.
    }

    /**
     * Configure an action with context-specific settings.
     * Override in subclasses.
     */
    protected function configureAction(Action $action): void
    {
        // Base: no-op. Pages override.
    }

    /**
     * Call an action by name.
     *
     * This method is called from the Vue template via callAction({ name: '...' }).
     */
    #[Fragment('modal')]
    public function callAction(array $arguments): mixed
    {
        return $this->executeCallAction($arguments);
    }

    /**
     * Core action execution logic. Extracted so subclasses can override
     * callAction with a different #[Fragment] without using parent:: (which
     * would incorrectly target the base Component class, not the trait).
     */
    protected function executeCallAction(array $arguments): mixed
    {
        $name = $arguments['name'] ?? null;

        if ($name === null) {
            return null;
        }

        $action = $this->getAction($name);

        if ($action === null) {
            return null;
        }

        // Resolve record: mounted record (Edit/View pages) or by key (table rows)
        $record = $this->getMountedActionRecord();

        if ($record === null && isset($arguments['recordKey'])) {
            $record = $this->resolveActionRecord($arguments['recordKey']);
        }

        // Fallback to persisted record key from openActionModal
        if ($record === null && $this->mountedActionRecordKey !== null) {
            $record = $this->resolveActionRecord($this->mountedActionRecordKey);
        }

        if ($record !== null) {
            $action->record($record);
        }

        if ($action->isHidden() || $action->isDisabled()) {
            return null;
        }

        // Get form data if the action has a form
        $data = $this->mountedActionData;

        // Hook for subclasses to prepare data (e.g., dehydrate form state)
        $data = $this->prepareActionCallData($action, $data);

        // Execute the action
        $result = $action->call($data);

        // If the action returns HALT, keep the modal open (multi-step actions)
        if ($result === Action::HALT) {
            return $result;
        }

        // Reset mounted action
        $this->mountedAction = null;
        $this->mountedActionData = [];
        $this->mountedActionRecordKey = null;
        $this->cachedMountedActionRecord = null;

        $this->afterCloseActionModal();

        return $result;
    }

    /**
     * Open a modal for an action.
     *
     * This method is called from the Vue template via openActionModal({ name: '...', callMethod: '...' }).
     */
    #[Fragment('modal')]
    public function openActionModal(array $arguments): void
    {
        $name = $arguments['name'] ?? null;

        if ($name === null) {
            return;
        }

        $action = $this->getAction($name);

        if ($action === null) {
            return;
        }

        if ($action->isHidden() || $action->isDisabled()) {
            return;
        }

        // Resolve record from arguments if provided
        $recordKey = $arguments['recordKey'] ?? null;
        if ($recordKey !== null) {
            $record = $this->resolveActionRecord($recordKey);
            if ($record !== null) {
                $action->record($record);
                $this->mountedActionRecordKey = $record->getKey();
                $this->cachedMountedActionRecord = $record;
            }
        }

        $this->beforeOpenActionModal($arguments);

        $this->mountedAction = $name;

        // Fill form with initial data if action has a form.
        // getActionForm()->fill() initializes field keys in the LiVue reactive state
        // so Vue tracks them from the start and syncs user input correctly.
        if ($action->hasForm()) {
            $form = $this->getActionForm();
            if ($form !== null) {
                $form->fill($action->getFormData());
            } else {
                $this->mountedActionData = $action->getInitialFormData();
            }
        }
    }

    /**
     * Close the currently open action modal.
     */
    #[Fragment('modal')]
    public function closeActionModal(): void
    {
        $this->mountedAction = null;
        $this->mountedActionData = [];
        $this->mountedActionRecordKey = null;
        $this->cachedMountedActionRecord = null;

        $this->afterCloseActionModal();
    }

    /**
     * Submit the currently mounted action form.
     */
    #[Fragment('modal')]
    public function submitMountedAction(): mixed
    {
        if ($this->mountedAction === null) {
            return null;
        }

        return $this->callAction([
            'name' => $this->mountedAction,
        ]);
    }

    /**
     * Get the record for the mounted action.
     *
     * Override this in your component to provide the record.
     */
    protected function getMountedActionRecord(): ?Model
    {
        return null;
    }

    /**
     * Resolve a record by key for action execution.
     * Override in subclasses (e.g., ListRecords) to load from table query.
     * Returns mixed to support non-Eloquent records (e.g., embedded array items).
     */
    protected function resolveActionRecord(mixed $key): mixed
    {
        return null;
    }

    /**
     * Get the currently mounted action.
     * Restores the persisted record onto the action instance.
     */
    public function getMountedAction(): ?Action
    {
        if ($this->mountedAction === null) {
            return null;
        }

        $action = $this->getAction($this->mountedAction);

        // Restore record from persisted key (survives re-renders)
        if ($action !== null && $this->mountedActionRecordKey !== null) {
            if ($this->cachedMountedActionRecord === null) {
                $this->cachedMountedActionRecord = $this->resolveActionRecord($this->mountedActionRecordKey);
            }

            if ($this->cachedMountedActionRecord !== null) {
                $action->record($this->cachedMountedActionRecord);
            }
        }

        return $action;
    }

    /**
     * Build and return the Form for the currently mounted action.
     * Returns null if no action is mounted, the action has no form, or primix/forms is unavailable.
     */
    public function getMountedActionForm(): mixed
    {
        if (! class_exists(\Primix\Forms\Form::class)) {
            return null;
        }

        $action = $this->getMountedAction();

        if ($action === null || ! $action->hasForm()) {
            return null;
        }

        $form = $action->buildForm($this);

        if ($form === null) {
            return null;
        }

        $form->name('mountedActionData')
            ->statePath('mountedActionData')
            ->submitAction('submitMountedAction')
            ->renderFieldActionModal(false);

        return $form;
    }

    /**
     * Get the form for the currently mounted action.
     * Override in subclasses to provide a custom Form instance.
     */
    public function getActionForm(): mixed
    {
        return $this->getMountedActionForm();
    }

    /**
     * Hook to prepare action data before calling the action.
     * Override in subclasses to process data (e.g., dehydrate form state).
     */
    protected function prepareActionCallData(Action $action, array $data): array
    {
        return $data;
    }

    /**
     * Hook called before opening an action modal.
     * When HasModalStack is present, pushes the current modal to the stack.
     */
    protected function beforeOpenActionModal(array $arguments): void
    {
        if (method_exists($this, 'pushCurrentModalToStack')
            && method_exists($this, 'getCurrentModalType')
            && $this->getCurrentModalType() !== null
        ) {
            $this->pushCurrentModalToStack();
        }
    }

    /**
     * Hook called after closing an action modal.
     * When HasModalStack is present, pops the previous modal from the stack.
     */
    protected function afterCloseActionModal(): void
    {
        if (method_exists($this, 'popModalFromStack')) {
            $this->popModalFromStack();
        }
    }
}
