<?php

use LiVue\Component;
use Primix\Support\UI\HasSidebar;
use Primix\Support\UI\Sidebar;

class TestClassSidebar extends Sidebar
{
    protected function setUp(): void
    {
        $this->mergeViewData([
            'source' => 'class',
        ]);
    }
}

it('uses the default sidebar view', function () {
    $sidebar = Sidebar::make();

    expect($sidebar->getView())->toBe('primix::ui.sidebar');
});

it('renders sidebar detached view with sidebar variable context', function () {
    $html = Sidebar::make()->toHtml();

    expect($html)
        ->toContain('<aside')
        ->toContain(config('app.name'));
});

it('resolves sidebar with a sidebar method and caches the instance', function () {
    $component = new class extends Component
    {
        use HasSidebar;

        public int $buildCount = 0;

        public function sidebar(Sidebar $sidebar): Sidebar
        {
            $this->buildCount++;

            return $sidebar->mergeViewData([
                'source' => 'method',
            ]);
        }

        protected function render(): string
        {
            return '';
        }
    };

    $first = $component->getSidebar();
    $second = $component->sidebar;

    expect($first)->toBeInstanceOf(Sidebar::class)
        ->and($second)->toBe($first)
        ->and($component->buildCount)->toBe(1)
        ->and($first->getViewData()['source'])->toBe('method');
});

it('resolves sidebar from configured sidebar class', function () {
    $component = new class extends Component
    {
        use HasSidebar;

        protected string $sidebarClass = TestClassSidebar::class;

        protected function render(): string
        {
            return '';
        }
    };

    $sidebar = $component->getSidebar();

    expect($sidebar)->toBeInstanceOf(TestClassSidebar::class)
        ->and($sidebar->getViewData()['source'])->toBe('class');
});

it('resets sidebar cache on hydration', function () {
    $component = new class extends Component
    {
        use HasSidebar;

        public int $buildCount = 0;

        public function sidebar(Sidebar $sidebar): Sidebar
        {
            $this->buildCount++;

            return $sidebar;
        }

        protected function render(): string
        {
            return '';
        }
    };

    $first = $component->getSidebar();
    $component->hydrateHasSidebar();
    $second = $component->getSidebar();

    expect($second)->toBeInstanceOf(Sidebar::class)
        ->and($second)->not->toBe($first)
        ->and($component->buildCount)->toBe(2);
});
