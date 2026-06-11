<x-primix::pages.simple>
    {{ $this->form }}

    <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <a href="{{ \Primix\Facades\Primix::getCurrentPanel()->getLoginUrl() }}"
           class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            {{ __('primix::panel.auth.back_to_sign_in') }}
        </a>
    </div>
</x-primix::pages.simple>
