@php $notification = session('primix.notification'); @endphp

<primix-toast :duration="{{ $notification['duration'] ?? 5000 }}" class="fixed bottom-4 right-4 z-50 max-w-sm w-full">
    <template #default="{ close }">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="p-4">
                <div class="flex items-start">
                    @if($notification['icon'] ?? null)
                        <div class="flex-shrink-0">
                            @php
                                $icon = $notification['icon'];
                                $isClassIcon = is_string($icon) && str_contains($icon, ' ');
                                $heroiconKey = preg_replace('/^heroicon-[os]-/', '', (string) $icon);
                                $heroiconFallbacks = [
                                    'home' => 'pi pi-home',
                                    'rectangle-stack' => 'pi pi-table',
                                    'shopping-bag' => 'pi pi-shopping-bag',
                                    'plus' => 'pi pi-plus',
                                    'plus-circle' => 'pi pi-plus-circle',
                                    'pencil' => 'pi pi-pencil',
                                    'pencil-square' => 'pi pi-pencil',
                                    'eye' => 'pi pi-eye',
                                    'trash' => 'pi pi-trash',
                                    'arrow-uturn-left' => 'pi pi-replay',
                                    'arrow-left-on-rectangle' => 'pi pi-sign-out',
                                    'link' => 'pi pi-link',
                                    'x-mark' => 'pi pi-times',
                                    'credit-card' => 'pi pi-credit-card',
                                    'user' => 'pi pi-user',
                                    'user-circle' => 'pi pi-user',
                                    'cog' => 'pi pi-cog',
                                    'document' => 'pi pi-file',
                                    'star' => 'pi pi-star',
                                ];
                                $fallbackPrimeIcon = $heroiconFallbacks[$heroiconKey] ?? 'pi pi-circle';
                                $colorClasses = app(\Primix\Support\Colors\ColorManager::class)
                                    ->toTailwindClass($notification['color'] ?? 'gray', 'text', 400);
                            @endphp
                            @if(is_string($icon) && str_starts_with($icon, 'heroicon-'))
                                <i class="{{ $fallbackPrimeIcon }} h-6 w-6 {{ $colorClasses }}"></i>
                            @elseif($isClassIcon)
                                <i class="{{ $icon }} h-6 w-6 {{ $colorClasses }}"></i>
                            @else
                                <x-dynamic-component :component="$icon" class="h-6 w-6 {{ $colorClasses }}" />
                            @endif
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
