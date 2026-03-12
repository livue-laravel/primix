@props([
    'maxWidth' => \Primix\Support\Enums\Width::SevenExtraLarge,
])

<div
    {{ $attributes->class([
        'w-full',
        $maxWidth instanceof \Primix\Support\Enums\Width ? $maxWidth->value : $maxWidth,
    ]) }}
>
    {{ $slot }}
</div>
