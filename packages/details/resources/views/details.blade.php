<div @class(['primix-details', 'mt-6' => $details->isWrapped()])>
    @if($details->isWrapped())
        <div class="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
            <div class="px-4 py-6 sm:p-8">
    @endif

    <div class="primix-grid" style="{{ $details->getGridStyle() }}">
        @foreach($details->getComponents() as $component)
            <div class="primix-grid-item"
                @if(method_exists($component, 'getGridItemStyle') && $component->getGridItemStyle()) style="{{ $component->getGridItemStyle() }}" @endif
                @if(method_exists($component, 'isColumnSpanFull') && $component->isColumnSpanFull()) data-col-span-full @endif
            >
                {{ $component }}
            </div>
        @endforeach
    </div>

    @if($details->isWrapped())
            </div>
        </div>
    @endif
</div>
