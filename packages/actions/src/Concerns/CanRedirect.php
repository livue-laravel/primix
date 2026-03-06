<?php

namespace Primix\Actions\Concerns;

use Closure;

trait CanRedirect
{
    protected string|Closure|null $successRedirectUrl = null;

    public function successRedirectUrl(string|Closure|null $url): static
    {
        $this->successRedirectUrl = $url;

        return $this;
    }

    public function getSuccessRedirectUrl(): ?string
    {
        return $this->evaluate($this->successRedirectUrl);
    }

    protected function dispatchSuccessRedirect(): void
    {
        $url = $this->getSuccessRedirectUrl();
        $component = $this->getComponent();

        if ($url && $component && method_exists($component, 'redirect')) {
            $component->redirect($url, navigate: true);
        }
    }
}
