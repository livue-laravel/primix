<x-primix::layouts.shell :layout="$shell ?? null" :topbar="$topbar ?? null" :sidebar="$sidebar ?? null">
    {{ $slot }}
</x-primix::layouts.shell>
