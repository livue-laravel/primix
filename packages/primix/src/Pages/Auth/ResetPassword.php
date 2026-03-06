<?php

namespace Primix\Pages\Auth;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Primix\Actions\Action;
use Primix\Facades\Primix;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;
use Primix\Pages\SimplePage;

class ResetPassword extends SimplePage
{
    use HasForms;

    protected static ?string $slug = 'password-reset/reset';

    protected ?string $title = 'Reset your password';

    public array $data = [];

    public string $token = '';

    public function mount(string $token): void
    {
        $panel = Primix::getCurrentPanel();

        if (Auth::guard($panel->getAuthGuard())->check()) {
            $this->redirect($panel->getUrl());

            return;
        }

        $this->token = $token;
        $this->data['email'] = request()->query('email', '');

        $this->form($this->getForm());
    }

    public static function getRouteUri(): string
    {
        return 'password-reset/{token}';
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required()
                    ->disabled()
                    ->autocomplete('email'),
                TextInput::make('password')
                    ->label('New password')
                    ->password()
                    ->revealable()
                    ->required()
                    ->minLength(8)
                    ->autocomplete('new-password')
                    ->autofocus(),
                TextInput::make('password_confirmation')
                    ->label('Confirm password')
                    ->password()
                    ->revealable()
                    ->required()
                    ->autocomplete('new-password'),
            ])
            ->statePath('data')
            ->submitAction('resetPassword')
            ->submitButton(
                Action::make('resetPassword')
                    ->label('Reset password')
                    ->submit()
            );
    }

    public function resetPassword(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        if ($this->data['password'] !== $this->data['password_confirmation']) {
            $this->addError('data.password_confirmation', __('The password confirmation does not match.'));

            return;
        }

        $status = Password::reset(
            [
                'email' => $this->data['email'],
                'password' => $this->data['password'],
                'password_confirmation' => $this->data['password_confirmation'],
                'token' => $this->token,
            ],
            function ($user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            $panel = Primix::getCurrentPanel();

            Notification::make()
                ->title(__($status))
                ->success()
                ->flash();

            $this->redirect($panel->getLoginUrl());
        } else {
            $this->addError('data.email', __($status));
        }
    }

    protected function render(): string
    {
        return 'primix::pages.auth.reset-password';
    }
}
