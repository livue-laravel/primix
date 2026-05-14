<x-primix-widgets::widget :widget="$this" class="primix-table-widget">
    @if($this->getHeading() || $this->getDescription())
        <div class="mb-5 flex flex-col gap-2">
            @if($this->getHeading())
                <h3 class="text-xl font-semibold tracking-tight text-surface-950 dark:text-surface-50">
                    {{ $this->getHeading() }}
                </h3>
            @endif

            @if($this->getDescription())
                <p class="text-sm leading-6 text-surface-500 dark:text-surface-400">
                    {{ $this->getDescription() }}
                </p>
            @endif
        </div>
    @endif

    <div class="overflow-hidden rounded-2xl">
        {{ $this->table }}
    </div>
</x-primix-widgets::widget>
