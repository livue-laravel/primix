<?php

namespace Primix\View\Components;

use Illuminate\View\Component;

class Notifications extends Component
{
    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.notifications');
    }

    public function shouldRender(): bool
    {
        return session()->has('primix.notification');
    }
}
