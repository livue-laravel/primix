@props([
    'title' => null,
    'hasDarkMode' => false,
    'favicon' => null,
])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? config('app.name') }}</title>

    @if($favicon)
        <link rel="icon" href="{{ $favicon }}">
    @endif

    @if($hasDarkMode)
    <script>
        (function() {
            var m = localStorage.getItem('primix-color-mode') || 'system';
            var d = m === 'dark' || (m === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (d) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        })();
    </script>
    @endif

    @livueStyles
    @php(\Primix\Support\ViteHot::prepare())
</head>
<body class="h-full bg-gray-100 dark:bg-gray-900">
    {{ $slot }}

    @livueScripts
</body>
</html>
