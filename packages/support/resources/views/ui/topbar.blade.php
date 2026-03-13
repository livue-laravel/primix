@php
    $resolvedViewData = $topbar->getViewData();
    $brandLabel = $brandLabel ?? ($resolvedViewData['brandLabel'] ?? config('app.name'));
    $navigation = $navigation ?? ($resolvedViewData['navigation'] ?? []);
@endphp

<header class="border-b border-gray-200 bg-white px-4 py-3">
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="text-sm font-medium text-gray-900">
            {{ $brandLabel }}
        </div>

        @if(! empty($navigation))
            <nav class="flex flex-wrap items-center gap-2" aria-label="Topbar navigation">
                @foreach($navigation as $item)
                    @php
                        $itemType = $item['type'] ?? (isset($item['items']) ? 'group' : 'link');
                        $children = (array) ($item['items'] ?? $item['children'] ?? []);
                        $isGroup = in_array($itemType, ['group', 'sub-group'], true) || $children !== [];
                        $itemLabel = $item['label'] ?? __('Item');
                        $itemUrl = $item['url'] ?? '#';
                        $itemIsActive = (bool) ($item['isActive'] ?? false);
                    @endphp

                    @if($isGroup)
                        <details class="group relative">
                            <summary class="cursor-pointer list-none rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                {{ $itemLabel }}
                            </summary>

                            <div class="absolute right-0 z-50 mt-2 min-w-56 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                                @foreach($children as $child)
                                    @php
                                        $childType = $child['type'] ?? (isset($child['items']) ? 'group' : 'link');
                                        $childChildren = (array) ($child['items'] ?? $child['children'] ?? []);
                                        $childIsGroup = in_array($childType, ['group', 'sub-group'], true) || $childChildren !== [];
                                        $childLabel = $child['label'] ?? __('Item');
                                        $childUrl = $child['url'] ?? '#';
                                        $childIsActive = (bool) ($child['isActive'] ?? false);
                                    @endphp

                                    @if($childIsGroup)
                                        <div class="my-1 border-t border-gray-100 pt-1 first:mt-0 first:border-t-0 first:pt-0">
                                            <div class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                {{ $childLabel }}
                                            </div>

                                            @foreach($childChildren as $nested)
                                                @php
                                                    $nestedLabel = $nested['label'] ?? __('Item');
                                                    $nestedUrl = $nested['url'] ?? '#';
                                                    $nestedIsActive = (bool) ($nested['isActive'] ?? false);
                                                @endphp

                                                <a href="{{ $nestedUrl }}" @class([
                                                    'block rounded-md px-3 py-2 text-sm',
                                                    'bg-gray-900 text-white' => $nestedIsActive,
                                                    'text-gray-700 hover:bg-gray-100 hover:text-gray-900' => ! $nestedIsActive,
                                                ])>
                                                    {{ $nestedLabel }}
                                                </a>
                                            @endforeach
                                        </div>
                                    @else
                                        <a href="{{ $childUrl }}" @class([
                                            'block rounded-md px-3 py-2 text-sm',
                                            'bg-gray-900 text-white' => $childIsActive,
                                            'text-gray-700 hover:bg-gray-100 hover:text-gray-900' => ! $childIsActive,
                                        ])>
                                            {{ $childLabel }}
                                        </a>
                                    @endif
                                @endforeach
                            </div>
                        </details>
                    @else
                        <a href="{{ $itemUrl }}" @class([
                            'rounded-md px-3 py-1.5 text-sm font-medium',
                            'bg-gray-900 text-white' => $itemIsActive,
                            'text-gray-700 hover:bg-gray-100 hover:text-gray-900' => ! $itemIsActive,
                        ])>
                            {{ $itemLabel }}
                        </a>
                    @endif
                @endforeach
            </nav>
        @endif
    </div>
</header>
