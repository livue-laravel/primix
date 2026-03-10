<?php

namespace Primix\Components;

use LiVue\Component;
use Primix\Concerns\UsePanelConfiguration;

class Sidebar extends Component
{
    use UsePanelConfiguration;

    public array $navigation = [];

    public ?string $brandName = null;

    public ?string $brandLogo = null;

    public ?string $brandLogoDark = null;

    public bool $spa = false;

    public string $panelId = '';

    public function shouldCloak(): bool
    {
        return false;
    }

    protected function render(): string
    {
        return 'primix::components.sidebar';
    }
}
