@props(['managers', 'ownerClass', 'ownerKey'])

@if(count($managers) > 0)
    <div class="space-y-10">
        @foreach($managers as $item)
            @if($item instanceof \Primix\RelationManagers\RelationManagerGroup)
                @php
                    $groupManagers = $item->getManagers();
                    $groupKey = 'rm_group_' . \Illuminate\Support\Str::slug($item->getLabel());
                    $firstTabId = \Illuminate\Support\Str::slug(class_basename($groupManagers[0] ?? ''));
                @endphp

                <div>
                    <div class="mb-4 flex items-center gap-4">
                        <h3 class="text-base font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                            {{ $item->getLabel() }}
                        </h3>
                        <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                    </div>

                    <p-tabs
                        :value="uiState?.['{{ $groupKey }}'] ?? '{{ $firstTabId }}'"
                        @update:value="uiState['{{ $groupKey }}'] = $event"
                    >
                        <p-tab-list>
                            @foreach($groupManagers as $managerClass)
                                @php($tabId = \Illuminate\Support\Str::slug(class_basename($managerClass)))
                                <p-tab value="{{ $tabId }}">
                                    {{ $managerClass::getTitle() }}
                                </p-tab>
                            @endforeach
                        </p-tab-list>
                        <p-tab-panels>
                            @foreach($groupManagers as $managerClass)
                                @php($tabId = \Illuminate\Support\Str::slug(class_basename($managerClass)))
                                <p-tab-panel value="{{ $tabId }}">
                                    @livue('primix-relation-manager', [
                                        'managerClass' => $managerClass,
                                        'ownerClass'   => $ownerClass,
                                        'ownerKey'     => $ownerKey,
                                    ])
                                </p-tab-panel>
                            @endforeach
                        </p-tab-panels>
                    </p-tabs>
                </div>
            @else
                <div>
                    <div class="mb-4 flex items-center gap-4">
                        <h3 class="text-base font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                            {{ $item::getTitle() }}
                        </h3>
                        <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                    </div>

                    @livue('primix-relation-manager', [
                        'managerClass' => $item,
                        'ownerClass'   => $ownerClass,
                        'ownerKey'     => $ownerKey,
                    ])
                </div>
            @endif
        @endforeach
    </div>
@endif
