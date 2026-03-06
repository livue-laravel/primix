<?php

namespace Primix\Resources\Actions\Concerns;

trait InteractsWithResourcePages
{
    protected function shouldUseModalForPage(string $page): bool
    {
        $resource = $this->getResourceClass();

        return $resource !== null && ! $resource::hasPage($page);
    }

    protected function resolveResourcePageUrl(string $page, array $parameters = []): ?string
    {
        $url = $this->evaluate($this->url);

        if ($url !== null) {
            return $url;
        }

        $resource = $this->getResourceClass();

        if ($resource !== null && $resource::hasPage($page)) {
            return $resource::getUrl($page, $parameters);
        }

        return null;
    }

    protected function isHiddenByResourceAbility(string $ability, mixed $record = null, bool $requiresRecord = false): bool
    {
        if ($this->hasExplicitVisibility()) {
            return parent::isHidden();
        }

        $resource = $this->getResourceClass();

        if ($resource === null) {
            return parent::isHidden();
        }

        if ($requiresRecord) {
            if ($record === null) {
                return parent::isHidden();
            }

            return ! $resource::{$ability}($record);
        }

        return ! $resource::{$ability}();
    }
}
