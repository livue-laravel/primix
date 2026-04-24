<div class="primix-table-widget">
    @if($this->getHeading() || $this->getDescription())
        <div class="mb-4">
            @if($this->getHeading())
                <h3 class="text-lg font-medium text-surface-900 dark:text-surface-100">
                    {{ $this->getHeading() }}
                </h3>
            @endif
            @if($this->getDescription())
                <p class="text-sm text-surface-500 dark:text-surface-400">
                    {{ $this->getDescription() }}
                </p>
            @endif
        </div>
    @endif

    {{ $this->table }}
</div>
