<?php

namespace Primix\RelationManagers;

use Primix\Forms\Form;
use Primix\Tables\Table;

abstract class RelationManager
{
    protected static string $relationship;

    protected static ?string $recordTitleAttribute = null;

    protected static ?string $title = null;

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

    public static function getTitle(): string
    {
        return static::$title ?? str(class_basename(static::class))
            ->beforeLast('RelationManager')
            ->plural()
            ->headline()
            ->toString();
    }
}
