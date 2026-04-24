<div>
    @php
        $colorManager = app(\Primix\Support\Colors\ColorManager::class);
        $cardBorderColor = $colorManager->shadeOf('primary', 700)->toHex();
        $cardBorderDarkColor = $colorManager->shadeOf('primary', 400)->toHex();
    @endphp
    <div class="primix-stats-overview primix-grid" style="{{ $gridStyle }}">
        @foreach($stats as $stat)
            @php
                $hasDescriptionSection = in_array('description', $statCardSections ?? [], true);
                $hasTrendSection = in_array('trend', $statCardSections ?? [], true);
                $hasChartSection = in_array('chart', $statCardSections ?? [], true);
                $iconBoxRadiusClasses = match ($stat['iconBoxShape'] ?? 'soft-square') {
                    'square' => 'rounded-none',
                    'circle' => 'rounded-full',
                    default => 'rounded-2xl',
                };
                $iconBoxStyle = null;

                if ($stat['color'] && $stat['iconBackgroundColor']) {
                    $iconBoxStyle = implode(' ', array_filter([
                        'color: ' . $stat['color'] . ';',
                        'background-color: ' . $stat['iconBackgroundColor'] . ';',
                        'border-color: color-mix(in srgb, ' . $stat['iconBackgroundColor'] . ' 78%, ' . $stat['color'] . ' 22%);',
                    ]));
                } elseif ($stat['color']) {
                    $iconBoxStyle = implode(' ', array_filter([
                        'color: ' . $stat['color'] . ';',
                        'background-color: color-mix(in srgb, ' . $stat['color'] . ' 14%, transparent);',
                        'border-color: color-mix(in srgb, ' . $stat['color'] . ' 26%, transparent);',
                    ]));
                } elseif ($stat['iconBackgroundColor']) {
                    $iconBoxStyle = implode(' ', array_filter([
                        'background-color: ' . $stat['iconBackgroundColor'] . ';',
                        'border-color: color-mix(in srgb, ' . $stat['iconBackgroundColor'] . ' 82%, transparent);',
                    ]));
                }

                $cardMinHeightClass = match (true) {
                    $hasChartSection => 'min-h-[13.5rem]',
                    $hasDescriptionSection || $hasTrendSection => 'min-h-[11rem]',
                    default => 'min-h-[8.75rem]',
                };
            @endphp
            <div
                class="primix-stat-card primix-grid-item flex h-full {{ $cardMinHeightClass }} flex-col rounded-[1.75rem] border border-[var(--px-stat-card-border)] bg-surface-0 p-5 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.18),0_2px_8px_-4px_rgba(15,23,42,0.08)] dark:border-[var(--px-stat-card-border-dark)] dark:bg-surface-900 dark:shadow-[0_16px_36px_-22px_rgba(2,6,23,0.55),0_2px_10px_-6px_rgba(2,6,23,0.35)]"
                style="
                    --px-stat-card-border: color-mix(in srgb, {{ $cardBorderColor }} 28%, transparent);
                    --px-stat-card-border-dark: color-mix(in srgb, {{ $cardBorderDarkColor }} 34%, transparent);
                    @if(isset($stat['columnSpan'])) --col-span: {{ $stat['columnSpan'] }}; @endif
                "
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0 space-y-2">
                        <p class="text-[0.72rem] font-light uppercase tracking-[0.24em] text-surface-500 dark:text-surface-400">
                            {{ $stat['label'] }}
                        </p>
                        <h3 data-primix-heading class="text-4xl font-semibold leading-none tracking-tight text-surface-950 dark:text-surface-50">
                            {{ $stat['value'] }}
                        </h3>
                    </div>

                    @if($stat['icon'])
                        <div
                            class="{{ $iconBoxRadiusClasses }} flex size-12 shrink-0 items-center justify-center border border-surface-200 bg-surface-100 p-3 text-surface-700 shadow-sm dark:border-surface-700 dark:bg-surface-800 dark:text-surface-200"
                            @if($iconBoxStyle) style="{{ $iconBoxStyle }}" @endif
                        >
                            {!! app(\Primix\Support\Icons\IconManager::class)->render($stat['icon'], 'h-5 w-5') !!}
                        </div>
                    @endif
                </div>

                @if($hasDescriptionSection)
                    <div class="mt-4 min-h-[2rem]">
                        @if($stat['description'])
                            <div class="flex items-center gap-2 text-sm">
                                @if($stat['descriptionIcon'])
                                    <span
                                        class="flex size-7 items-center justify-center rounded-full bg-surface-100 text-surface-500 dark:bg-surface-800 dark:text-surface-300"
                                        @if($stat['descriptionColor']) style="color: {{ $stat['descriptionColor'] }};" @endif
                                    >
                                        {!! app(\Primix\Support\Icons\IconManager::class)->render($stat['descriptionIcon'], 'h-3.5 w-3.5') !!}
                                    </span>
                                @endif

                                <p class="leading-6 text-surface-600 dark:text-surface-300" @if($stat['descriptionColor']) style="color: {{ $stat['descriptionColor'] }};" @endif>
                                    {{ $stat['description'] }}
                                </p>
                            </div>
                        @endif
                    </div>
                @endif

                @if($hasTrendSection && $stat['trend'])
                    <div class="mt-2.5 flex items-center gap-2 text-sm font-medium" @if($stat['trendColor']) style="color: {{ $stat['trendColor'] }};" @endif>
                        @if($stat['trendIcon'])
                            {!! app(\Primix\Support\Icons\IconManager::class)->render($stat['trendIcon'], 'h-6 w-6 shrink-0') !!}
                        @endif

                        <span>{{ $stat['trend'] }}</span>
                    </div>
                @elseif($hasChartSection && $stat['chart'])
                    <div class="mt-auto pt-3">
                        <div class="-mx-1 overflow-hidden rounded-xl bg-surface-50/80 dark:bg-surface-950/70" style="height: 44px;">
                            <primix-sparkline
                                :data="{!! \Illuminate\Support\Js::from($stat['chart']) !!}"
                                @if($stat['chartColor']) color="{{ $stat['chartColor'] }}" @elseif($stat['color']) color="{{ $stat['color'] }}" @endif
                                :height="44"
                            ></primix-sparkline>
                        </div>
                    </div>
                @endif
            </div>
        @endforeach
    </div>
</div>
