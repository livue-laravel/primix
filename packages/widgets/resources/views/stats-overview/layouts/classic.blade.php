<div>
    <div class="primix-stats-overview primix-grid" style="{{ $gridStyle }}">
        @foreach($stats as $stat)
            <div class="primix-stat-card primix-grid-item p-4 pt-5 pb-0 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 overflow-hidden flex flex-col gap-3"
                @if(isset($stat['columnSpan'])) style="--col-span: {{ $stat['columnSpan'] }}" @endif
            >
                <div class="flex items-start justify-between">
                    <p class="text-sm text-surface-600 dark:text-surface-300">{{ $stat['label'] }}</p>
                    <p class="text-2xl font-bold text-surface-900 dark:text-surface-100 leading-none">{{ $stat['value'] }}</p>
                </div>
                @if($stat['description'])
                    <p class="text-sm mt-1 text-surface-600 dark:text-surface-300" @if($stat['descriptionColor']) style="color: {{ $stat['descriptionColor'] }}" @endif>
                        @if($stat['descriptionIcon'])
                            {!! app(\Primix\Support\Icons\IconManager::class)->render($stat['descriptionIcon'], 'mr-1') !!}
                        @endif
                        {{ $stat['description'] }}
                    </p>
                @endif
                @if($stat['chart'])
                    <div class="-mx-4 mt-auto" style="height: 56px;">
                        <primix-sparkline
                            :data="{!! \Illuminate\Support\Js::from($stat['chart']) !!}"
                            @if($stat['chartColor']) color="{{ $stat['chartColor'] }}" @endif
                            :height="56"
                        ></primix-sparkline>
                    </div>
                @else
                    <div class="pb-4"></div>
                @endif
            </div>
        @endforeach
    </div>
</div>
