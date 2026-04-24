@php
    $meters = collect($this->getMeters())->map(fn ($meter) => $meter->toArray())->all();
@endphp

<div class="primix-meter-group-widget rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-5 shadow-sm">
    @if($this->getHeading())
        <div class="mb-5">
            <h3 class="text-xl font-semibold tracking-tight text-surface-950 dark:text-surface-50">
                {{ $this->getHeading() }}
            </h3>
        </div>
    @endif

    <div class="rounded-2xl bg-surface-50/90 p-4 dark:bg-surface-950/75">
        <p-meter-group
            :value="{!! \Illuminate\Support\Js::from($meters) !!}"
            @if($this->getMax()) :max="{{ $this->getMax() }}" @endif
        ></p-meter-group>
    </div>
</div>
