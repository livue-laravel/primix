<?php

namespace Primix\Support\Components;

use Illuminate\Contracts\Support\Htmlable;

abstract class ViewComponent extends Component implements Htmlable
{
    abstract public function getView(): string;

    public function getWrapperView(): ?string
    {
        return null;
    }

    public function toVueProps(): array
    {
        return [];
    }

    public function toArray(): array
    {
        return $this->toVueProps();
    }


    public function toHtml(): string
    {
        $innerHtml = view($this->getView(), array_merge(
            $this->toVueProps(),
            ['component' => $this]
        ))->render();

        $wrapperView = $this->getWrapperView();

        if ($wrapperView) {
            return view($wrapperView, [
                'component' => $this,
                'slot' => $innerHtml,
            ])->render();
        }

        return $innerHtml;
    }
}
