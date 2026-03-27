<?php

namespace Primix\RelationManagers;

use Primix\Forms\Form;
use Primix\PanelRegistry;
use Primix\Tables\Table;

abstract class RelationManager
{
    protected static string $relationship;

    protected static ?string $recordTitleAttribute = null;

    protected static ?string $title = null;

    protected static ?bool $shouldTranslateLabels = null;

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
        $title = static::$title ?? str(class_basename(static::class))
            ->beforeLast('RelationManager')
            ->plural()
            ->headline()
            ->toString();

        return static::shouldTranslateLabels() ? __($title) : $title;
    }

    public static function shouldTranslateLabels(): bool
    {
        if (static::$shouldTranslateLabels !== null) {
            return static::$shouldTranslateLabels;
        }

        $panel = app(PanelRegistry::class)->getCurrentPanel();

        if ($panel !== null && method_exists($panel, 'shouldTranslateLabels')) {
            return $panel->shouldTranslateLabels();
        }

        return app(PanelRegistry::class)->shouldTranslateLabels();
    }
}
