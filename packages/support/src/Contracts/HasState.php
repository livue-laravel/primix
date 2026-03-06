<?php

namespace Primix\Support\Contracts;

interface HasState
{
    public function getState(): array;

    public function setState(array $state): static;
}
