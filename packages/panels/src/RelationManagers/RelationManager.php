<?php

namespace Primix\RelationManagers;

use Primix\Forms\Form;
use Primix\Tables\Table;

abstract class RelationManager
{
    protected static string $relationship;

    protected static ?string $recordTitleAttribute = null;

    abstract public static function form(Form $form): Form;

    abstract public static function table(Table $table): Table;

    public static function getRelationshipName(): string
    {
        return static::$relationship;
    }

    public static function getRecordTitleAttribute(): ?string
    {
        return static::$recordTitleAttribute;
    }
}
