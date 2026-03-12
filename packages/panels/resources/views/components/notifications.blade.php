@php $notification = session('primix.notification'); @endphp

<primix-toast :duration="{{ $notification['duration'] ?? 5000 }}" class="fixed bottom-4 right-4 z-50 max-w-sm w-full">
    <template #default="{ close }">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="p-4">
                <div class="flex items-start">
                    @if($notification['icon'] ?? null)
                        <div class="flex-shrink-0">
                            @php
                                $colorClasses = app(\Primix\Support\Colors\ColorManager::class)
                                    ->toTailwindClass($notification['color'] ?? 'gray', 'text', 400);
                            @endphp
                            <x-dynamic-component :component="$notification['icon']" class="h-6 w-6 {{ $colorClasses }}" />
                        </div>
                    @endif

                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        @if($notification['title'] ?? null)
                            <p class="text-sm font-medium text-gray-900 dark:text-white">
                                {{ $notification['title'] }}
                            </p>
                        @endif

                        @if($notification['body'] ?? null)
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {{ $notification['body'] }}
                            </p>
                        @endif
                    </div>

                    @if($notification['closeable'] ?? true)
                        <div class="ml-4 flex flex-shrink-0">
                            @php
                                $closeNotificationAction = \Primix\Actions\Action::make('closeNotification')
                                    ->label(__('primix::panel.actions.close'))
                                    ->icon('pi pi-times')
                                    ->iconButton(true, false)
                                    ->color('gray')
                                    ->jsAction('close()')
                                    ->extraAttributes([
                                        'class' => 'inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                                    ]);
                            @endphp
                            {{ $closeNotificationAction }}
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </template>
</primix-toast>
