<?php

namespace Primix\Support\Contracts;

interface HasSchema extends HasChildComponents
{
    public function getSchema(): array;
}
