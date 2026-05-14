<?php

namespace Primix\Concerns;

trait HasAuthentication
{
    protected ?string $loginPage = null;

    protected ?string $profilePage = null;

    protected ?string $registrationPage = null;

    protected bool $emailVerification = false;

    protected ?string $emailVerificationPage = null;

    protected bool $passwordReset = false;

    protected ?string $requestPasswordResetPage = null;

    protected ?string $resetPasswordPage = null;

    protected ?string $authGuard = null;

    public function login(string $pageClass = \Primix\Pages\Auth\Login::class): static
    {
        $this->loginPage = $pageClass;

        return $this;
    }

    public function getLoginPage(): ?string
    {
        return $this->loginPage;
    }

    public function hasLogin(): bool
    {
        return $this->loginPage !== null;
    }

    public function getLoginUrl(): ?string
    {
        if (! $this->hasLogin()) {
            return null;
        }

        $loginClass = $this->getLoginPage();

        return $this->resolvePanelAuthUrl($loginClass::getSlug());
    }

    public function profile(?string $pageClass = null): static
    {
        $this->profilePage = $pageClass;

        return $this;
    }

    public function getProfilePage(): ?string
    {
        return $this->profilePage;
    }

    public function registration(string $pageClass = \Primix\Pages\Auth\Register::class): static
    {
        $this->registrationPage = $pageClass;

        return $this;
    }

    public function getRegistrationPage(): ?string
    {
        return $this->registrationPage;
    }

    public function hasRegistration(): bool
    {
        return $this->registrationPage !== null;
    }

    public function getRegistrationUrl(): ?string
    {
        if (! $this->hasRegistration()) {
            return null;
        }

        $pageClass = $this->getRegistrationPage();

        return $this->resolvePanelAuthUrl($pageClass::getSlug());
    }

    public function emailVerification(
        bool $enabled = true,
        string $pageClass = \Primix\Pages\Auth\EmailVerificationPrompt::class
    ): static
    {
        $this->emailVerification = $enabled;

        if ($enabled) {
            $this->emailVerificationPage = $pageClass;
        }

        return $this;
    }

    public function hasEmailVerification(): bool
    {
        return $this->emailVerification;
    }

    public function getEmailVerificationPage(): ?string
    {
        return $this->emailVerificationPage;
    }

    public function getEmailVerificationUrl(): ?string
    {
        if (! $this->hasEmailVerification()) {
            return null;
        }

        $pageClass = $this->getEmailVerificationPage();

        return $this->resolvePanelAuthUrl($pageClass::getSlug());
    }

    public function passwordReset(
        bool $enabled = true,
        string $requestPage = \Primix\Pages\Auth\RequestPasswordReset::class,
        string $resetPage = \Primix\Pages\Auth\ResetPassword::class
    ): static
    {
        $this->passwordReset = $enabled;

        if ($enabled) {
            $this->requestPasswordResetPage = $requestPage;
            $this->resetPasswordPage = $resetPage;
        }

        return $this;
    }

    public function hasPasswordReset(): bool
    {
        return $this->passwordReset;
    }

    public function getRequestPasswordResetPage(): ?string
    {
        return $this->requestPasswordResetPage;
    }

    public function getResetPasswordPage(): ?string
    {
        return $this->resetPasswordPage;
    }

    public function getRequestPasswordResetUrl(): ?string
    {
        if (! $this->hasPasswordReset()) {
            return null;
        }

        $pageClass = $this->getRequestPasswordResetPage();

        return $this->resolvePanelAuthUrl($pageClass::getSlug());
    }

    public function getLogoutUrl(): ?string
    {
        if (! $this->hasLogin()) {
            return null;
        }

        return $this->resolvePanelAuthUrl('logout');
    }

    public function getResetPasswordUrl(array $parameters = []): ?string
    {
        if (! $this->hasPasswordReset()) {
            return null;
        }

        $pageClass = $this->getResetPasswordPage();

        return $this->resolvePanelAuthUrl($pageClass::getSlug(), $parameters);
    }

    public function authGuard(?string $guard): static
    {
        $this->authGuard = $guard;

        return $this;
    }

    public function getAuthGuard(): ?string
    {
        return $this->authGuard;
    }

    /**
     * Generate a URL for a panel auth page, picking the tenant-scoped route
     * (`primix.tenant.{panelId}.{slug}`) when a tenant is currently in scope
     * and the panel uses path-based identification — otherwise the central
     * route (`primix.{panelId}.{slug}`).
     */
    protected function resolvePanelAuthUrl(string $slug, array $parameters = []): string
    {
        if ($this->shouldUseTenantScopedRoute()) {
            return route("primix.tenant.{$this->getId()}.{$slug}", $parameters);
        }

        return route("primix.{$this->getId()}.{$slug}", $parameters);
    }

    /**
     * Decide whether auth URLs should resolve to the tenant-prefixed route
     * (registered by TenantPanelRouteRegistrar) or the central one
     * (registered by PanelRouteRegistrar).
     */
    protected function shouldUseTenantScopedRoute(): bool
    {
        if (! method_exists($this, 'hasTenancy') || ! $this->hasTenancy()) {
            return false;
        }

        $identification = method_exists($this, 'getTenantIdentification')
            ? $this->getTenantIdentification()
            : null;

        $identification ??= config('multi-tenant.identification.default', 'path');

        if ($identification !== 'path') {
            return false;
        }

        // Tenant param must be resolvable. InitializeTenancyByPath sets it
        // both on Tenancy::tenant() and on URL::defaults() in the same step,
        // so the facade's presence is a reliable proxy for URL::defaults state.
        $tenancyFacade = '\\Primix\\MultiTenant\\Facades\\Tenancy';

        if (! class_exists($tenancyFacade)) {
            return false;
        }

        return $tenancyFacade::tenant() !== null;
    }
}
