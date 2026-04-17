<?php

namespace Primix\Pages\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Primix\Actions\Action;
use Primix\Facades\Primix;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Form;
use Primix\Forms\HasForms;
use Primix\Pages\SimplePage;

class CreateTenant extends SimplePage
{
    use HasForms;

    protected static ?string $slug = 'create-tenant';

    protected ?string $title = null;

    public array $data = [];

    public function mount(): void
    {
        $this->title = __('primix::panel.auth.create_organization_title');

        $panel = Primix::getCurrentPanel();

        if (! Auth::guard($panel->getAuthGuard())->check()) {
            $this->redirect($panel->getLoginUrl() ?? $panel->getUrl());

            return;
        }

        $this->form($this->getForm());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label(__('primix::panel.auth.organization_name'))
                    ->required()
                    ->maxLength(255)
                    ->autofocus(),
            ])
            ->statePath('data')
            ->submitAction('create')
            ->submitButton(
                Action::make('create')
                    ->label(__('primix::panel.actions.create'))
                    ->submit()
            );
    }

    public function validateWizardStep(int $step): void
    {
        $form = $this->getForm('form');

        if (! $form) {
            return;
        }

        $rules = $form->getValidationRulesForWizardStep($step);

        if ($rules) {
            $this->validate($rules);
        }
    }

    public function create(): void
    {
        $rules = $this->getFormValidationRules('form');
        $this->validate($rules);

        $panel = Primix::getCurrentPanel();
        $user = Auth::guard($panel->getAuthGuard())->user();
        $tenantModel = $panel->getTenantModel();

        $slug = Str::slug($this->data['name']);

        $tenant = $tenantModel::create([
            'name' => $this->data['name'],
            $panel->getTenantSlugAttribute() ?? 'slug' => $slug,
        ]);

        $identification = $panel->getTenantIdentification();

        if (in_array($identification, ['subdomain', 'domain']) && method_exists($tenant, 'domains')) {
            $tenant->domains()->create([
                'domain' => $slug,
            ]);

            $tenant->load('domains');
        }

        $user->tenants()->attach($tenant);

        $this->redirect($panel->getTenantSwitchUrl($tenant));
    }

    protected function render(): string
    {
        return 'primix::pages.auth.create-tenant';
    }
}
