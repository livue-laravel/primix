<?php

namespace Primix\Pages\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Primix\Actions\Action;
use Primix\Facades\Primix;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Notifications\Notification;
use Primix\Pages\SimplePage;

class RequestPasswordReset extends SimplePage
{
    use HasForms;

    protected static ?string $slug = 'password-reset';

    protected ?string $title = null;

    protected string|\Closure|\Illuminate\Contracts\Support\Htmlable|null $subheading = 'Enter your email and we will send you a reset link.';

    public array $data = [];

    public function mount(): void
    {
        $this->title = __('primix::panel.auth.forgot_password_title');

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
            ])
            ->statePath('data')
            ->submitAction('sendResetLink')
            ->submitButton(
                Action::make('sendResetLink')
                    ->label(__('primix::panel.auth.send_reset_link'))
                    ->submit()
            );
    }

    public function sendResetLink(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        $status = Password::sendResetLink([
            'email' => $this->data['email'],
        ]);

        if ($status === Password::RESET_LINK_SENT) {
            Notification::make()
                ->title(__($status))
                ->success()
                ->send();

            $this->data['email'] = '';
        } else {
            $this->addError('data.email', __($status));
        }
    }

    protected function render(): string
    {
        return 'primix::pages.auth.request-password-reset';
    }
}
