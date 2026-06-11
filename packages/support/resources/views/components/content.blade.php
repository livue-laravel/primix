@props([
    'value' => null,
    'markdown' => false,
    'sanitize' => true,
])

@php
    $content = $markdown
        ? \Primix\Support\Content\RichContent::markdown($value)
        : \Primix\Support\Content\RichContent::html($value);

    $content->sanitize($sanitize);
@endphp

<div {{ $attributes->merge(['class' => 'primix-rich-content']) }}>{{ $content }}</div>
