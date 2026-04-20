<?php

namespace Primix\Forms\Concerns;

use Illuminate\Support\Str;

trait WatchesFormState
{
    protected array $formOldState = [];

    /**
     * Track how many times each property has been updated via setState.
     * The first update is snapshot hydration, the second is client diffs.
     */
    protected array $formStateUpdateCount = [];

    public function updatingHasForms(string $key, mixed $value): mixed
    {
        $this->formStateUpdateCount[$key] = ($this->formStateUpdateCount[$key] ?? 0) + 1;

        // First update per key is snapshot hydration, skip it
        if ($this->formStateUpdateCount[$key] < 2) {
            return null;
        }

        foreach ($this->cachedForms as $form) {
            if ($form->getStatePath() === $key) {
                $this->formOldState[$key] = $this->{$key} ?? [];
            }
        }

        return null;
    }

    public function updatedHasForms(string $key, mixed $value): void
    {
        // First update per key is snapshot hydration, skip it
        if (($this->formStateUpdateCount[$key] ?? 0) < 2) {
            return;
        }

        foreach ($this->cachedForms as $form) {
            if ($form->getStatePath() !== $key) {
                continue;
            }

            $oldState = $this->formOldState[$key] ?? [];
            $newState = is_array($value) ? $value : [];

            foreach ($form->getFields() as $statePath => $field) {
                if (! $field->isWatched()) {
                    continue;
                }

                $relativePath = Str::after($statePath, $key . '.');
                $oldValue = data_get($oldState, $relativePath);
                $newValue = data_get($newState, $relativePath);

                if ($oldValue === $newValue) {
                    continue;
                }

                $watcher = $field->getWatchCallback();

                if ($watcher) {
                    $component = $this;
                    $setter = new class($component, $key) {
                        public function __construct(
                            private mixed $component,
                            private string $key,
                        ) {}

                        public function __invoke(string $path, mixed $value): void
                        {
                            data_set($this->component->{$this->key}, $path, $value);
                        }
                    };

                    $field->evaluate($watcher, [
                        'old'   => $oldValue,
                        'state' => $newValue,
                        'set'   => $setter,
                    ]);
                }
            }

            unset($this->formOldState[$key]);
        }
    }
}
