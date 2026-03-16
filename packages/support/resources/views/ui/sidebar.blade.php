@php
    $resolvedViewData = $sidebar->getViewData();
    $brandLabel = $brandLabel ?? ($resolvedViewData['brandLabel'] ?? config('app.name'));
    $navigation = $navigation ?? ($resolvedViewData['navigation'] ?? []);
@endphp

<aside class="w-64 border-r border-gray-200 bg-white">
    <div class="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
        {{ $brandLabel }}
    </div>

    <nav class="space-y-1 px-2 py-3" aria-label="Sidebar navigation">
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
                <div class="pt-2 first:pt-0">
                    <div class="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {{ $itemLabel }}
                    </div>

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
                            <div class="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                {{ $childLabel }}
                            </div>

                            @foreach($childChildren as $nested)
                                @php
                                    $nestedLabel = $nested['label'] ?? __('Item');
                                    $nestedUrl = $nested['url'] ?? '#';
                                    $nestedIsActive = (bool) ($nested['isActive'] ?? false);
                                @endphp

                                <a href="{{ $nestedUrl }}" @class([
                                    'block rounded-md px-2 py-1.5 text-sm',
                                    'bg-gray-900 text-white' => $nestedIsActive,
                                    'text-gray-700 hover:bg-gray-100 hover:text-gray-900' => ! $nestedIsActive,
                                ])>
                                    {{ $nestedLabel }}
                                </a>
                            @endforeach
                        @else
                            <a href="{{ $childUrl }}" @class([
                                'block rounded-md px-2 py-1.5 text-sm',
                                'bg-gray-900 text-white' => $childIsActive,
                                'text-gray-700 hover:bg-gray-100 hover:text-gray-900' => ! $childIsActive,
                            ])>
                                {{ $childLabel }}
                            </a>
                        @endif
                    @endforeach
                </div>
            @else
                <a href="{{ $itemUrl }}" @class([
                    'block rounded-md px-2 py-1.5 text-sm',
                    'bg-gray-900 text-white' => $itemIsActive,
                    'text-gray-700 hover:bg-gray-100 hover:text-gray-900' => ! $itemIsActive,
                ])>
                    {{ $itemLabel }}
                </a>
            @endif
        @endforeach
    </nav>
</aside>

