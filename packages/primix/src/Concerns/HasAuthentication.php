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

        return route("primix.{$this->getId()}.{$loginClass::getSlug()}");
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

        return route("primix.{$this->getId()}.{$pageClass::getSlug()}");
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

        return route("primix.{$this->getId()}.{$pageClass::getSlug()}");
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

        return route("primix.{$this->getId()}.{$pageClass::getSlug()}");
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
}
