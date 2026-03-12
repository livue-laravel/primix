<?php

namespace Primix\Pages\Auth;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Primix\Actions\Action;
use Primix\Facades\Primix;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Pages\SimplePage;

class Register extends SimplePage
{
    use HasForms;

    protected static ?string $slug = 'register';

    protected ?string $title = 'Create an account';

    public array $data = [];

    public function mount(): void
    {
        $panel = Primix::getCurrentPanel();

        if (Auth::guard($panel->getAuthGuard())->check()) {
            $this->redirect($panel->getUrl());

            return;
        }

        $this->form($this->getForm());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255)
                    ->autofocus(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->autocomplete('email'),
                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->revealable()
                    ->required()
                    ->minLength(8)
                    ->autocomplete('new-password'),
                TextInput::make('password_confirmation')
                    ->label('Confirm password')
                    ->password()
                    ->revealable()
                    ->required()
                    ->autocomplete('new-password'),
            ])
            ->statePath('data')
            ->submitAction('register')
            ->submitButton(
                Action::make('register')
                    ->label('Sign up')
                    ->submit()
            );
    }

    public function register(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        if ($this->data['password'] !== $this->data['password_confirmation']) {
            $this->addError('data.password_confirmation', __('The password confirmation does not match.'));

            return;
        }

        $panel = Primix::getCurrentPanel();
        $userModel = $this->getUserModel($panel);

        $user = $userModel::create([
            'name' => $this->data['name'],
            'email' => $this->data['email'],
            'password' => Hash::make($this->data['password']),
        ]);

        event(new Registered($user));

        Auth::guard($panel->getAuthGuard())->login($user);

        session()->regenerate();

        if ($panel->hasEmailVerification()) {
            $this->redirect($panel->getEmailVerificationUrl());
        } else {
            $this->redirect($panel->getUrl());
        }
    }

    protected function getUserModel($panel): string
    {
        $guard = $panel->getAuthGuard() ?? config('auth.defaults.guard');
        $provider = config("auth.guards.{$guard}.provider");

        return config("auth.providers.{$provider}.model");
    }

    protected function render(): string
    {
        return 'primix::pages.auth.register';
    }
}
