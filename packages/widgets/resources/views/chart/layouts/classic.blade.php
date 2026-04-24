<div class="primix-chart-widget">
    @if($this->getHeading())
        <div class="mb-4">
            <h3 class="text-lg font-medium text-surface-900 dark:text-surface-100">{{ $this->getHeading() }}</h3>
            @if($this->getDescription())
                <p class="text-sm text-surface-500 dark:text-surface-400">{{ $this->getDescription() }}</p>
            @endif
        </div>
    @endif
    <p-chart
        type="{{ $this->getType() }}"
        :data="{!! \Illuminate\Support\Js::from($this->getData()) !!}"
        :options="{!! \Illuminate\Support\Js::from((object) $this->getOptions()) !!}"
        @if($this->getHeight()) :height="{{ $this->getHeight() }}" @endif
        @if($this->getMaxHeight()) style="max-height: {{ $this->getMaxHeight() }}" @endif
    ></p-chart>
</div>
