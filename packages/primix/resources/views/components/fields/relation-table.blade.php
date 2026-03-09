@php
    $model = $component->getOwnerModel();
    $initialItems = ($model instanceof \Illuminate\Database\Eloquent\Model && $model->exists)
        ? $component->getRelationshipValues($model)
        : [];
@endphp
@if ($model instanceof \Illuminate\Database\Eloquent\Model && $model->exists && $component->isDetached())
    {{-- Detached mode with persisted record: relation manager queries DB directly --}}
    @livue('primix-relation-manager', [
        'managerClass' => $component->getManagerClass(),
        'ownerKey'     => $model->getKey(),
        'ownerClass'   => get_class($model),
    ])
@elseif (! $component->isDetached())
    {{-- Embedded mode: client memory, works with or without a persisted record --}}
    @livue('primix-relation-manager', [
        'managerClass'  => $component->getManagerClass(),
        'embedded'      => true,
        'embeddedItems' => $initialItems,
    ], [
        'model' => 'data.' . $component->getName(),
    ])
@else
    {{-- Detached mode but no persisted record yet --}}
    <div class="flex items-center justify-center rounded-lg border border-dashed border-surface-300 py-8 dark:border-surface-600">
        <p class="text-sm text-surface-400 dark:text-surface-500">{{ __('Save the record first to manage related records.') }}</p>
    </div>
@endif
