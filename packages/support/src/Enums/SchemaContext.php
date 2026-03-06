<?php

namespace Primix\Support\Enums;

enum SchemaContext: string
{
    case Form = 'form';
    case Infolist = 'infolist';
    case Action = 'action';

    public function isEditable(): bool
    {
        return match ($this) {
            self::Form, self::Action => true,
            self::Infolist => false,
        };
    }

    public function isReadOnly(): bool
    {
        return ! $this->isEditable();
    }
}
