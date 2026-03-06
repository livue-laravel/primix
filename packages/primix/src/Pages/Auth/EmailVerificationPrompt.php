<?php

namespace Primix\Pages\Auth;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Primix\Actions\Action;
use Primix\Facades\Primix;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;
use Primix\Pages\SimplePage;

class EmailVerificationPrompt extends SimplePage
{
    use HasForms;

    protected static ?string $slug = 'email-verification';

    protected ?string $title = 'Verify your email address';

    protected string|\Closure|\Illuminate\Contracts\Support\Htmlable|null $subheading = 'Please verify your email address by clicking the link we sent you.';

    public array $data = [];

    public function mount(): void
    {
        $panel = Primix::getCurrentPanel();
        $user = Auth::guard($panel->getAuthGuard())->user();

        if (! $user) {
            $this->redirect($panel->getLoginUrl());

            return;
        }

        if (! $user instanceof MustVerifyEmail || $user->hasVerifiedEmail()) {
            $this->redirect($panel->getUrl());

            return;
        }

        $this->form($this->getForm());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([])
            ->statePath('data')
            ->submitAction('resendNotification')
            ->submitButton(
                Action::make('resendNotification')
                    ->label('Resend verification email')
                    ->submit()
            );
    }

    public function getSignOutActions(): array
    {
        return [
            Action::make('signOut')
                ->label('Sign out')
                ->submit()
                ->link()
                ->extraAttributes([
                    'class' => 'text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400',
                ]),
        ];
    }

    public function resendNotification(): void
    {
        $panel = Primix::getCurrentPanel();
        $user = Auth::guard($panel->getAuthGuard())->user();

        if (! $user instanceof MustVerifyEmail) {
            return;
        }

        if ($user->hasVerifiedEmail()) {
            $this->redirect($panel->getUrl());

            return;
        }

        $user->sendEmailVerificationNotification();

        Notification::make()
            ->title('A new verification link has been sent to your email address.')
            ->success()
            ->send();
    }

    protected function render(): string
    {
        return 'primix::pages.auth.email-verification-prompt';
    }
}
