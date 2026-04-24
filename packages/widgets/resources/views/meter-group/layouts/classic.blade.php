<div class="primix-meter-group-widget">
    @if($this->getHeading())
        <div class="mb-4">
            <h3 class="text-lg font-medium text-surface-900 dark:text-surface-100">{{ $this->getHeading() }}</h3>
        </div>
    @endif
    <p-meter-group
        :value="{!! \Illuminate\Support\Js::from($meters) !!}"
        @if($this->getMax()) :max="{{ $this->getMax() }}" @endif
    ></p-meter-group>
</div>
