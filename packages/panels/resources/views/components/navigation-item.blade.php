<a
    href="{{ $item['url'] }}"
    @if($spa) v-navigate @endif
    class="group flex items-center px-3 py-2 text-sm font-medium rounded-md {{ $stateClasses() }}"
>
    @if($item['icon'] ?? null)
        @php
            $icon = $isActive() ? ($item['activeIcon'] ?? $item['icon']) : $item['icon'];
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
        @endphp
        <span class="mr-3 h-5 w-5 flex-shrink-0">
            @if(is_string($icon) && str_starts_with($icon, 'heroicon-'))
                <i class="{{ $fallbackPrimeIcon }} h-5 w-5"></i>
            @elseif($isClassIcon)
                <i class="{{ $icon }} h-5 w-5"></i>
            @else
                <x-dynamic-component :component="$icon" class="h-5 w-5" />
            @endif
        </span>
    @endif

    <span class="flex-1">{{ $item['label'] }}</span>

    @if($item['badge'] ?? null)
        <span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {{ $item['badgeColor'] ?? 'bg-gray-100 text-gray-600' }}">
            {{ $item['badge'] }}
        </span>
    @endif
</a>
