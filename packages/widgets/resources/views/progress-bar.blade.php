<div class="primix-progress-bar-widget">
    @if($this->getHeading())
        <div class="mb-4">
            <h3 class="text-lg font-medium text-surface-900 dark:text-surface-100">{{ $this->getHeading() }}</h3>
        </div>
    @endif
    <p-progress-bar
        :value="{{ $this->getValue() }}"
        @if($this->getMode()) mode="{{ $this->getMode() }}" @endif
        :show-value="{{ $this->shouldShowValue() ? 'true' : 'false' }}"
    ></p-progress-bar>
</div>
