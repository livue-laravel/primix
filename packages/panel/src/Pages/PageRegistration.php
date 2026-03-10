<?php

namespace Primix\Pages;

class PageRegistration
{
    public function __construct(
        protected string $page,
        protected string $route,
    ) {}

    public function getPage(): string
    {
        return $this->page;
    }

    public function getRoute(): string
    {
        return $this->route;
    }
}
