<x-primix::pages.simple>
    <div class="flex justify-center">
        {{ $this->form }}
    </div>
    <div class="mt-4 text-center flex justify-center">
        <form method="POST" action="{{ url(\Primix\Facades\Primix::getCurrentPanel()->getPath() . '/logout') }}">
            @csrf
            @foreach($this->getSignOutActions() as $action)
                {{ $action }}
            @endforeach
        </form>
    </div>
</x-primix::pages.simple>
