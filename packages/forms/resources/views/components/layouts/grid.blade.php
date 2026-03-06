<div class="primix-grid" style="{{ $component->getGridStyle() }}">
    @foreach($component->getSchema() as $child)
        <div class="primix-grid-item"
            @if(method_exists($child, 'getGridItemStyle') && $child->getGridItemStyle()) style="{{ $child->getGridItemStyle() }}" @endif
            @if(method_exists($child, 'isColumnSpanFull') && $child->isColumnSpanFull()) data-col-span-full @endif
        >
            {{ $child }}
        </div>
    @endforeach
</div>
