@props(['entry'])

@php
    $heading = $entry['heading'] ?? '';
    $sizePx = match($entry['width'] ?? 'md') {
        'sm' => '400px',
        'md' => '500px',
        'lg' => '700px',
        'xl' => '900px',
        '2xl' => '1100px',
        default => '500px',
    };
@endphp

<p-dialog
    :visible="true"
    modal
    :header="'{{ addslashes($heading) }}'"
    :style="{ width: '{{ $sizePx }}' }"
    :closable="false"
    :close-on-escape="false"
>
    <div class="opacity-30 pointer-events-none blur-sm min-h-[100px]">
        <div class="space-y-4">
            <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
            <div class="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
            <div class="h-10 bg-surface-200 dark:bg-surface-700 rounded"></div>
            <div class="h-10 bg-surface-200 dark:bg-surface-700 rounded"></div>
        </div>
    </div>
</p-dialog>
