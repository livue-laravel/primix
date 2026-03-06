<?php

namespace Primix\Concerns;

use Primix\Facades\Primix;

trait HasModalStack
{
    /**
     * Stack of previously open modals.
     * Each entry contains type + state + metadata for rendering.
     */
    public array $modalStack = [];

    /**
     * Detect the type of the currently open modal.
     *
     * @return 'action'|'formFieldAction'|null
     */
    public function getCurrentModalType(): ?string
    {
        if (property_exists($this, 'mountedAction') && $this->mountedAction !== null) {
            return 'action';
        }

        if (property_exists($this, 'mountedFormFieldAction') && $this->mountedFormFieldAction !== null) {
            return 'formFieldAction';
        }

        return null;
    }

    public function hasModalStack(): bool
    {
        return true;
    }

    public function getModalStackDepth(): int
    {
        return count($this->modalStack);
    }

    public function shouldStackModals(): bool
    {
        $panel = Primix::getCurrentPanel();

        if ($panel === null) {
            return true;
        }

        return $panel->hasStackBasedModals();
    }

    /**
     * Push the current modal state onto the stack and clear current state.
     */
    public function pushCurrentModalToStack(): void
    {
        $type = $this->getCurrentModalType();

        if ($type === null) {
            return;
        }

        if ($type === 'action') {
            $action = $this->getMountedAction();

            $this->modalStack[] = [
                'type' => 'action',
                'action' => $this->mountedAction,
                'data' => $this->mountedActionData,
                'recordKey' => $this->mountedActionRecordKey,
                'heading' => $action?->getModalHeading() ?? '',
                'width' => $action?->getModalWidth() ?? 'md',
            ];

            // Clear current action state
            $this->mountedAction = null;
            $this->mountedActionData = [];
            $this->mountedActionRecordKey = null;
            $this->cachedMountedActionRecord = null;
        } elseif ($type === 'formFieldAction') {
            $action = $this->getMountedFormFieldAction();

            $this->modalStack[] = [
                'type' => 'formFieldAction',
                'action' => $this->mountedFormFieldAction,
                'data' => $this->mountedFormFieldActionData,
                'editKey' => $this->mountedFormFieldActionEditKey,
                'editOptions' => $this->mountedFormFieldActionEditOptions,
                'heading' => $action?->getModalHeading() ?? '',
                'width' => $action?->getModalWidth() ?? 'md',
            ];

            // Clear current form field action state
            $this->mountedFormFieldAction = null;
            $this->mountedFormFieldActionData = [];
            $this->mountedFormFieldActionEditKey = null;
            $this->mountedFormFieldActionEditOptions = [];
        }
    }

    /**
     * Pop the last modal from the stack and restore it as the current modal.
     */
    public function popModalFromStack(): void
    {
        if (empty($this->modalStack)) {
            return;
        }

        $entry = array_pop($this->modalStack);

        if ($entry['type'] === 'action') {
            // Merge values set during the nested modal (e.g., select value after create option)
            $this->mountedAction = $entry['action'];
            $this->mountedActionData = array_merge($entry['data'], $this->mountedActionData);
            $this->mountedActionRecordKey = $entry['recordKey'];
            $this->cachedMountedActionRecord = null;
        } elseif ($entry['type'] === 'formFieldAction') {
            $this->mountedFormFieldAction = $entry['action'];
            $this->mountedFormFieldActionData = $entry['data'];
            $this->mountedFormFieldActionEditKey = $entry['editKey'];
            $this->mountedFormFieldActionEditOptions = $entry['editOptions'];
        }
    }
}
