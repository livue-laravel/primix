<?php

require_once dirname(__DIR__, 2) . '/src/Layouts/Shell.php';
require_once dirname(__DIR__, 2) . '/src/Concerns/HasLayout.php';

use LiVue\Component;
use Primix\Concerns\HasLayout;
use Primix\Layouts\Shell;

it('resolves and caches layout definitions from a component method', function () {
    $component = new class extends Component
    {
        use HasLayout;

        public int $buildCount = 0;

        public function layout(Shell $layout): Shell
        {
            $this->buildCount++;

            return $layout
                ->topbar()
                ->sidebar(false)
                ->panelSwitcher(false);
        }

        protected function render(): string
        {
            return '';
        }
    };

    $first = $component->getShellLayout();
    $second = $component->getShellLayout();

    expect($first)->toBeInstanceOf(Shell::class)
        ->and($second)->toBe($first)
        ->and($component->buildCount)->toBe(1)
        ->and($first->toArray()['showSidebar'])->toBeFalse();
});

it('throws when layout method does not return a shell instance', function () {
    $component = new class extends Component
    {
        use HasLayout;

        public function layout(Shell $layout): array
        {
            return [];
        }

        protected function render(): string
        {
            return '';
        }
    };

    $component->getShellLayout();
})->throws(\LogicException::class);
