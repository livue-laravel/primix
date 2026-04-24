@props([
    'brandLogo' => null,
    'brandLogoDark' => null,
    'brandName' => null,
    'variant' => 'topbar',
])

@php
    $textClasses = match ($variant) {
        'simple' => 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white',
        default => 'text-lg font-bold text-gray-900 dark:text-white',
    };

    $wrapperTag = $variant === 'simple' ? 'div' : 'span';
    $wrapperClasses = $variant === 'simple' ? 'mb-8 text-center' : 'mr-6 flex-shrink-0';
    $inlineClass = $variant === 'simple' ? 'inline-block' : '';
@endphp

<{{ $wrapperTag }} {{ $attributes->merge(['class' => $wrapperClasses]) }}>
    @if($brandLogoDark)
        <span class="{{ $inlineClass }} dark:hidden">{!! $brandLogo !!}</span>
        <span class="{{ $inlineClass ?: '' }} hidden dark:inline{{ $inlineClass ? '-block' : '' }}">{!! $brandLogoDark !!}</span>
    @elseif($brandLogo)
        @if($inlineClass)
            <span class="{{ $inlineClass }}">{!! $brandLogo !!}</span>
        @else
            {!! $brandLogo !!}
        @endif
        @elseif(filled($brandName))
            @if($variant === 'simple')
            <h2 data-primix-heading class="{{ $textClasses }}">{!! $brandName !!}</h2>
        @else
            <span data-primix-heading class="{{ $textClasses }}">{!! $brandName !!}</span>
        @endif
    @endif
</{{ $wrapperTag }}>
