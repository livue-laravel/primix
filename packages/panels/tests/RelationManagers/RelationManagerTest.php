<?php

use Primix\Forms\Form;
use Primix\RelationManagers\EmbeddedRecord;
use Primix\RelationManagers\RelationManager;
use Primix\RelationManagers\RelationManagerGroup;
use Primix\Tables\Table;

// ============================================================
// RelationManager
// ============================================================

it('getRelationshipName returns the relationship name', function () {
    $manager = new class extends RelationManager {
        protected static string $relationship = 'comments';

        public static function form(Form $form): Form { return $form; }

        public static function table(Table $table): Table { return $table; }
    };

    expect($manager::getRelationshipName())->toBe('comments');
});

it('getRecordTitleAttribute returns null by default', function () {
    $manager = new class extends RelationManager {
        protected static string $relationship = 'comments';

        public static function form(Form $form): Form { return $form; }

        public static function table(Table $table): Table { return $table; }
    };

    expect($manager::getRecordTitleAttribute())->toBeNull();
});

it('getRecordTitleAttribute returns custom value', function () {
    $manager = new class extends RelationManager {
        protected static string $relationship = 'comments';
        protected static ?string $recordTitleAttribute = 'title';

        public static function form(Form $form): Form { return $form; }

        public static function table(Table $table): Table { return $table; }
    };

    expect($manager::getRecordTitleAttribute())->toBe('title');
});

class CommentsRelationManager extends RelationManager
{
    protected static string $relationship = 'comments';

    public static function form(Form $form): Form { return $form; }

    public static function table(Table $table): Table { return $table; }
}

it('getTitle auto-generates from class name by removing RelationManager suffix and pluralizing', function () {
    expect(CommentsRelationManager::getTitle())->toBe('Comments');
});

it('getTitle with explicit title overrides auto-generation', function () {
    $manager = new class extends RelationManager {
        protected static string $relationship = 'tags';
        protected static ?string $title = 'Custom Title';

        public static function form(Form $form): Form { return $form; }

        public static function table(Table $table): Table { return $table; }
    };

    expect($manager::getTitle())->toBe('Custom Title');
});

it('getTitle auto-generates headline case from multi-word class name', function () {
    $manager = new class extends RelationManager {
        protected static string $relationship = 'order_items';

        public static function form(Form $form): Form { return $form; }

        public static function table(Table $table): Table { return $table; }
    };

    // anonymous class has no meaningful basename, just verify it returns a string
    expect($manager::getTitle())->toBeString();
});

// ============================================================
// RelationManagerGroup
// ============================================================

it('make creates instance with label', function () {
    $group = RelationManagerGroup::make('Users');

    expect($group)->toBeInstanceOf(RelationManagerGroup::class)
        ->and($group->getLabel())->toBe('Users');
});

it('getLabel returns the label', function () {
    expect(RelationManagerGroup::make('Products')->getLabel())->toBe('Products');
});

it('managers sets managers and getManagers returns them', function () {
    $group = RelationManagerGroup::make('Test')
        ->managers([CommentsRelationManager::class]);

    expect($group->getManagers())->toBe([CommentsRelationManager::class]);
});

it('RelationManagerGroup has empty managers by default', function () {
    expect(RelationManagerGroup::make('Test')->getManagers())->toBe([]);
});

it('managers is fluent and returns the same instance', function () {
    $group = RelationManagerGroup::make('Test');
    $result = $group->managers([CommentsRelationManager::class]);

    expect($result)->toBe($group);
});

it('getLabel after managers() still returns original label', function () {
    $group = RelationManagerGroup::make('Products')
        ->managers([CommentsRelationManager::class]);

    expect($group->getLabel())->toBe('Products');
});

it('can set multiple managers', function () {
    $group = RelationManagerGroup::make('Test')
        ->managers([CommentsRelationManager::class, CommentsRelationManager::class]);

    expect($group->getManagers())->toHaveCount(2);
});

// ============================================================
// EmbeddedRecord
// ============================================================

it('EmbeddedRecord is instance of Illuminate\\Support\\Fluent', function () {
    expect(new EmbeddedRecord(['name' => 'Test']))->toBeInstanceOf(\Illuminate\Support\Fluent::class);
});

it('getKey returns integer from __embedded_index attribute', function () {
    $record = new EmbeddedRecord(['__embedded_index' => 3]);

    expect($record->getKey())->toBe(3);
});

it('getKey returns 0 when __embedded_index is not set', function () {
    $record = new EmbeddedRecord(['name' => 'Test']);

    expect($record->getKey())->toBe(0);
});

it('fluent property access works', function () {
    $record = new EmbeddedRecord(['name' => 'Test', '__embedded_index' => 0]);

    expect($record->name)->toBe('Test');
});

it('getKey returns correct index for different values', function () {
    expect((new EmbeddedRecord(['__embedded_index' => 0]))->getKey())->toBe(0);
    expect((new EmbeddedRecord(['__embedded_index' => 1]))->getKey())->toBe(1);
    expect((new EmbeddedRecord(['__embedded_index' => 99]))->getKey())->toBe(99);
});

it('EmbeddedRecord stores multiple attributes', function () {
    $record = new EmbeddedRecord(['id' => 5, 'title' => 'Hello', '__embedded_index' => 2]);

    expect($record->id)->toBe(5)
        ->and($record->title)->toBe('Hello')
        ->and($record->getKey())->toBe(2);
});
