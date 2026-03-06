<?php

namespace Primix\Support\RenderHook;

use BackedEnum;
use Closure;
use Illuminate\Support\HtmlString;

class RenderHookManager
{
    protected array $hooks = [];

    public function register(string|BackedEnum $name, Closure|string $callback, array $scopes = []): void
    {
        $name = $name instanceof BackedEnum ? $name->value : $name;

        $this->hooks[$name][] = [
            'callback' => $callback,
            'scopes' => $scopes,
        ];
    }

    public function render(string|BackedEnum $name, array $scopes = []): string
    {
        $name = $name instanceof BackedEnum ? $name->value : $name;

        if (! isset($this->hooks[$name])) {
            return '';
        }

        $output = '';

        foreach ($this->hooks[$name] as $hook) {
            if (! $this->matchesScope($hook['scopes'], $scopes)) {
                continue;
            }

            $callback = $hook['callback'];

            if (is_string($callback)) {
                $output .= $callback;
            } else {
                $result = $callback();
                $output .= $result instanceof HtmlString ? $result->toHtml() : (string) $result;
            }
        }

        return $output;
    }

    protected function matchesScope(array $hookScopes, array $currentScopes): bool
    {
        // Global hook (no scopes) - always matches
        if (empty($hookScopes)) {
            return true;
        }

        // Hook has scopes - at least one must match
        foreach ($hookScopes as $hookScope) {
            foreach ($currentScopes as $currentScope) {
                if ($hookScope === $currentScope || is_subclass_of($currentScope, $hookScope)) {
                    return true;
                }
            }
        }

        return false;
    }
}
