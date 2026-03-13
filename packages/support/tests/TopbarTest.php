<?php

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
