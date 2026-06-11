@php
    $panel = \Primix\Facades\Primix::getCurrentPanel();
@endphp

<x-primix::pages.simple>
    {{ $this->form }}

    @if($panel->hasPasswordReset() || $panel->hasRegistration())
        <div class="mt-4 space-y-2 text-center text-sm text-gray-600 dark:text-gray-400">
            @if($panel->hasPasswordReset())
                <div>
                    <a href="{{ $panel->getRequestPasswordResetUrl() }}"
                       class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                        {{ __('primix::panel.auth.forgot_password_link') }}
                    </a>
                </div>
            @endif

            @if($panel->hasRegistration())
                <div>
                    {{ __('primix::panel.auth.no_account_prompt') }}
                    <a href="{{ $panel->getRegistrationUrl() }}"
                       class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                        {{ __('primix::panel.auth.create_account_link') }}
                    </a>
                </div>
            @endif
        </div>
    @endif
</x-primix::pages.simple>
