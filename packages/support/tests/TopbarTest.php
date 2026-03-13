<?php

use Illuminate\Contracts\Support\Arrayable;
use LiVue\Component;
use Primix\Support\UI\HasTopbar;
use Primix\Support\UI\Topbar;

class TestClassTopbar extends Topbar
{
    protected function setUp(): void
    {
        $this->mergeViewData([
            'source' => 'class',
        ]);
    }
}

class TestArrayableNavigationItem implements Arrayable
{
    public function __construct(
        protected string $label,
        protected ?string $route = null,
        protected ?string $url = null,
        protected array|string $active = [],
    ) {}

    public function toArray(): array
    {
        return array_filter([
            'label' => $this->label,
            'route' => $this->route,
            'url' => $this->url,
            'active' => $this->active,
        ], static fn ($value) => $value !== null);
    }
}

class TestObjectNavigationGroup
{
    public function __construct(
        protected string $label,
        protected array $items,
    ) {}

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getItems(): array
    {
        return $this->items;
    }
}

it('uses the default topbar view', function () {
    $topbar = Topbar::make();

    expect($topbar->getView())->toBe('primix::ui.topbar');
});

it('resolves topbar with a topbar method and caches the instance', function () {
    $component = new class extends Component
    {
        use HasTopbar;

        public int $buildCount = 0;

        public function topbar(Topbar $topbar): Topbar
        {
            $this->buildCount++;

            return $topbar->mergeViewData([
                'source' => 'method',
            ]);
        }

        protected function render(): string
        {
            return '';
        }
    };

    $first = $component->getTopbar();
    $second = $component->topbar;

    expect($first)->toBeInstanceOf(Topbar::class)
        ->and($second)->toBe($first)
        ->and($component->buildCount)->toBe(1)
        ->and($first->getViewData()['source'])->toBe('method');
});

it('resolves topbar from configured topbar class', function () {
    $component = new class extends Component
    {
        use HasTopbar;

        protected string $topbarClass = TestClassTopbar::class;

        protected function render(): string
        {
            return '';
        }
    };

    $topbar = $component->getTopbar();

    expect($topbar)->toBeInstanceOf(TestClassTopbar::class)
        ->and($topbar->getViewData()['source'])->toBe('class');
});

it('resets topbar cache on hydration', function () {
    $component = new class extends Component
    {
        use HasTopbar;

        public int $buildCount = 0;

        public function topbar(Topbar $topbar): Topbar
        {
            $this->buildCount++;

            return $topbar;
        }

        protected function render(): string
        {
            return '';
        }
    };

    $first = $component->getTopbar();
    $component->hydrateHasTopbar();
    $second = $component->getTopbar();

    expect($second)->toBeInstanceOf(Topbar::class)
        ->and($second)->not->toBe($first)
        ->and($component->buildCount)->toBe(2);
});

it('normalizes link and grouped navigation payloads', function () {
    $topbar = Topbar::make()
        ->mergeViewData([
            'navigation' => [
                [
                    'url' => '/dashboard',
                    'label' => 'Dashboard',
                    'isActive' => true,
                ],
                [
                    'label' => 'Settings',
                    'items' => [
                        [
                            'type' => 'sub-group',
                            'label' => 'General',
                            'items' => [
                                [
                                    'url' => '/settings',
                                    'label' => 'Preferences',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);

    $navigation = $topbar->getViewData()['navigation'];

    expect($navigation)->toHaveCount(2)
        ->and($navigation[0]['type'])->toBe('link')
        ->and($navigation[0]['url'])->toBe('/dashboard')
        ->and($navigation[0]['isActive'])->toBeTrue()
        ->and($navigation[1]['type'])->toBe('group')
        ->and($navigation[1]['items'][0]['type'])->toBe('sub-group')
        ->and($navigation[1]['items'][0]['items'][0]['url'])->toBe('/settings');
});

it('normalizes object based navigation payloads', function () {
    $topbar = Topbar::make()
        ->mergeViewData([
            'navigation' => [
                new TestObjectNavigationGroup('Account', [
                    new TestArrayableNavigationItem(
                        label: 'Profile',
                        url: '/account',
                    ),
                ]),
            ],
        ]);

    $navigation = $topbar->getViewData()['navigation'];
    $html = $topbar->toHtml();

    expect($navigation)->toHaveCount(1)
        ->and($navigation[0]['type'])->toBe('group')
        ->and($navigation[0]['items'][0]['type'])->toBe('link')
        ->and($navigation[0]['items'][0]['url'])->toBe('/account')
        ->and($html)->toContain('Account')
        ->and($html)->toContain('Profile')
        ->and($html)->toContain('/account');
});
