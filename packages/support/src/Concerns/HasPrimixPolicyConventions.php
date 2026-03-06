<?php

namespace Primix\Support\Concerns;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

trait HasPrimixPolicyConventions
{
    public static function getPrimixPolicyClass(): string
    {
        return 'App\\Policies\\' . class_basename(static::class) . 'Policy';
    }

    public static function hasPrimixPolicy(): bool
    {
        return class_exists(static::getPrimixPolicyClass());
    }

    public static function getPrimixPolicyAbility(string $ability): string
    {
        return Str::of($ability)->snake()->toString();
    }

    public function canPrimix(string $ability, ?Authenticatable $user = null): bool
    {
        $ability = static::getPrimixPolicyAbility($ability);
        $resolvedUser = $user ?? auth()->user();

        return Gate::forUser($resolvedUser)->allows($ability, $this);
    }
}

