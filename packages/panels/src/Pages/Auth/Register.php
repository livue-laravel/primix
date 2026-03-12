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

    protected ?string $title = null;

    public array $data = [];

    public function mount(): void
    {
        $this->title = __('primix::panel.auth.create_account_title');

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
                    ->label(__('primix::panel.auth.name'))
                    ->required()
                    ->maxLength(255)
                    ->autofocus(),
                TextInput::make('email')
                    ->label(__('primix::panel.auth.email'))
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->autocomplete('email'),
                TextInput::make('password')
                    ->label(__('primix::panel.auth.password'))
                    ->password()
                    ->revealable()
                    ->required()
                    ->minLength(8)
                    ->autocomplete('new-password'),
                TextInput::make('password_confirmation')
                    ->label(__('primix::panel.auth.confirm_password'))
                    ->password()
                    ->revealable()
                    ->required()
                    ->autocomplete('new-password'),
            ])
            ->statePath('data')
            ->submitAction('register')
            ->submitButton(
                Action::make('register')
                    ->label(__('primix::panel.auth.sign_up_button'))
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
