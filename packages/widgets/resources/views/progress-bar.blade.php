<div class="primix-progress-bar-widget rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-5 shadow-sm">
    @if($this->getHeading())
        <div class="mb-5 flex items-center justify-between gap-3">
            <h3 class="text-xl font-semibold tracking-tight text-surface-950 dark:text-surface-50">
                {{ $this->getHeading() }}
            </h3>

            @if($this->shouldShowValue())
                <span class="text-xs font-semibold uppercase tracking-[0.16em] text-surface-500 dark:text-surface-400">
                    Progress
                </span>
            @endif
        </div>
    @endif

    <div class="rounded-2xl bg-surface-50/90 p-4 dark:bg-surface-950/75">
        <p-progress-bar
            :value="{{ $this->getValue() }}"
            @if($this->getMode()) mode="{{ $this->getMode() }}" @endif
            :show-value="{{ $this->shouldShowValue() ? 'true' : 'false' }}"
        ></p-progress-bar>
    </div>
</div>
