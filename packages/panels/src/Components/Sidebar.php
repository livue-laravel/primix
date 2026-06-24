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
        // Cloak the island until Vue mounts. The navigation groups render their
        // titles inside <primix-collapsible> <template> slots, which are inert
        // until Vue compiles them — so before hydration the group titles (and
        // grouped items) flash in and out. Cloaking hides the sidebar until the
        // template is fully rendered. The shell reserves the space (lg:pl-64),
        // and on SPA navigation the mount is synchronous, so there is no blink.
        return true;
    }

    protected function render(): string
    {
        return 'primix::components.sidebar';
    }
}
