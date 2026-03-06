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
                        Forgot your password?
                    </a>
                </div>
            @endif

            @if($panel->hasRegistration())
                <div>
                    Don't have an account?
                    <a href="{{ $panel->getRegistrationUrl() }}"
                       class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                        Create an account
                    </a>
                </div>
            @endif
        </div>
    @endif
</x-primix::pages.simple>
