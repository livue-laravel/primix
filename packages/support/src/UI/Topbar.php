<?php

namespace Primix\Support\UI;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\View;
use Primix\Support\Components\Component;
use Primix\Support\Concerns\BelongsToLiVue;

class Topbar extends Component implements Htmlable
{
    use BelongsToLiVue;

    protected string $name = 'topbar';

    protected ?string $view = 'primix::ui.topbar';

    protected array $viewData = [];

    public static function make(): static
    {
        $instance = new static();
        $instance->configure();

        return $instance;
    }

    public function name(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function view(?string $view): static
    {
        $this->view = $view;

        return $this;
    }

    public function getView(): ?string
    {
        return $this->view;
    }

    public function viewData(array $data): static
    {
        $this->viewData = $data;

        return $this;
    }

    public function mergeViewData(array $data): static
    {
        $this->viewData = array_merge($this->viewData, $data);

        return $this;
    }

    public function getViewData(): array
    {
        return $this->viewData;
    }

    public function toHtml(): string
    {
        $view = $this->getView();

        if ($view === null || $view === '') {
            return '';
        }

        return View::make($view, array_merge(
            $this->getViewData(),
            ['topbar' => $this]
        ))->render();
    }
}
