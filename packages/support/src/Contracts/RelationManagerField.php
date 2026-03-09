<?php

namespace Primix\Support\Contracts;

interface RelationManagerField
{
    public function getManagerClass(): string;

    public function getRelationshipName(): string;
}
