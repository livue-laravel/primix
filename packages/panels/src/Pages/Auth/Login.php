<?php

namespace Primix\Pages\Auth;

use Illuminate\Support\Facades\Auth;
use Primix\Actions\Action;
use Primix\Facades\Primix;
use Primix\Forms\Components\Fields\Checkbox;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Pages\SimplePage;

class Login extends SimplePage
{
    use HasForms;

    protected static ?string $slug = 'login';

    protected ?string $title = null;

    public array $data = [];

    public function mount(): void
    {
        $this->title = __('primix::panel.auth.sign_in_title');

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
                TextInput::make('email')
                    ->label(__('primix::panel.auth.email'))
                    ->email()
                    ->required()
                    ->autocomplete('email')
                    ->autofocus(),
                TextInput::make('password')
                    ->label(__('primix::panel.auth.password'))
                    ->password()
                    ->revealable()
                    ->required()
                    ->autocomplete('current-password'),
                Checkbox::make('remember')
                    ->label(__('primix::panel.auth.remember_me')),
            ])
            ->statePath('data')
            ->submitAction('authenticate')
            ->submitButton(
                Action::make('authenticate')
                    ->label(__('primix::panel.auth.sign_in_button'))
                    ->submit()
            );
    }

    public function authenticate(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        $credentials = [
            'email' => $this->data['email'],
            'password' => $this->data['password'],
        ];

        $remember = $this->data['remember'] ?? false;

        $panel = Primix::getCurrentPanel();

        if (! Auth::guard($panel->getAuthGuard())->attempt($credentials, $remember)) {
            $this->addError('data.email', __('auth.failed'));

            return;
        }

        session()->regenerate();

        $this->redirect(
            redirect()->intended($panel->getUrl())->getTargetUrl()
        );
    }

    protected function render(): string
    {
        return 'primix::pages.auth.login';
    }
}
