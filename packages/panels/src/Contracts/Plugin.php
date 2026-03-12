<?php

namespace Primix\Contracts;

use Primix\Panel;

interface Plugin
{
    public function getId(): string;

    public static function make(): static;

    public function register(Panel $panel): void;

    public function boot(Panel $panel): void;
}
