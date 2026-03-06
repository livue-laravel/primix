<?php

namespace Primix\Details;

trait HasDetails
{
    protected array $cachedDetails = [];

    /**
     * Persistent UI state for layout components (e.g., active tab).
     */
    public array $uiState = [];

    public function bootHasDetails(): void
    {
        // Details are created lazily via getDetails().
    }

    public function hydrateHasDetails(): void
    {
        // Rebuild details with hydrated component state.
        $this->cachedDetails = [];
    }

    public function getDetails(string $name = 'details'): ?Details
    {
        if (isset($this->cachedDetails[$name])) {
            return $this->cachedDetails[$name];
        }

        if (method_exists($this, $name)) {
            $details = $this->{$name}(Details::make()->livue($this)->name($name));
            $this->cachedDetails[$name] = $details;

            return $details;
        }

        return null;
    }

    public function getAllDetails(): array
    {
        return $this->cachedDetails;
    }

    protected function getDetailsSchema(string $detailsName): array
    {
        $details = $this->getDetails($detailsName);

        return $details ? $details->getComponents() : [];
    }

    protected function resetDetailsCache(): void
    {
        $this->cachedDetails = [];
    }
}
