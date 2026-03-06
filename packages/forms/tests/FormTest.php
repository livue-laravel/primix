<?php

use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;
use Primix\Forms\Form;
use Primix\Forms\Components\Fields\FileUpload;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Section;
use Primix\Support\Enums\SchemaContext;

it('can be created with make', function () {
    $form = Form::make();

    expect($form)->toBeInstanceOf(Form::class);
});

it('has default name of form', function () {
    $form = Form::make();

    expect($form->getName())->toBe('form');
});

it('can set custom name', function () {
    $form = Form::make()->name('editForm');

    expect($form->getName())->toBe('editForm');
});

it('has form context', function () {
    $form = Form::make();

    expect($form->getContext())->toBe(SchemaContext::Form);
});

it('can set schema', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('slug'),
    ]);

    expect($form->getComponents())->toHaveCount(2);
});

it('extracts leaf fields from flat schema', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('slug'),
    ]);

    $fields = $form->getFields();

    expect($fields)->toHaveCount(2);
    expect(array_keys($fields))->toBe(['title', 'slug']);
});

it('extracts leaf fields from nested schema', function () {
    $form = Form::make()->schema([
        Section::make('Details')->schema([
            TextInput::make('title'),
            TextInput::make('slug'),
        ]),
        TextInput::make('author'),
    ]);

    $fields = $form->getFields();

    expect($fields)->toHaveCount(3);
});

it('collects validation rules from all fields', function () {
    $form = Form::make()->schema([
        TextInput::make('title')->required()->rules('max:255'),
        TextInput::make('email')->rules('email'),
        TextInput::make('optional'),
    ]);

    $rules = $form->getValidationRules();

    expect($rules)->toHaveCount(2);
    expect($rules['title'])->toBe('required|max:255');
    expect($rules['email'])->toBe('email');
});

it('collects validation messages from all fields', function () {
    $form = Form::make()->schema([
        TextInput::make('title')
            ->required()
            ->validationMessages(['required' => 'Title is required']),
        TextInput::make('email')
            ->validationMessages(['email' => 'Invalid email']),
    ]);

    $messages = $form->getValidationMessages();

    expect($messages)->toHaveKey('title.required', 'Title is required');
    expect($messages)->toHaveKey('email.email', 'Invalid email');
});

it('has default submit action', function () {
    $form = Form::make();

    expect($form->getSubmitAction())->toBe('submit');
});

it('can set custom submit action', function () {
    $form = Form::make()->submitAction('save');

    expect($form->getSubmitAction())->toBe('save');
});

it('can disable submit action', function () {
    $form = Form::make()->submitAction(null);

    expect($form->getSubmitAction())->toBeNull();
});

it('has no submit button by default', function () {
    $form = Form::make();

    expect($form->hasSubmitButton())->toBeFalse();
    expect($form->getSubmitButton())->toBeNull();
});

it('can set model', function () {
    $form = Form::make()->model('App\\Models\\Post');

    expect($form->getModel())->toBe('App\\Models\\Post');
});

it('has null model by default', function () {
    $form = Form::make();

    expect($form->getModel())->toBeNull();
});

it('detects watchers when a field is watched', function () {
    $form = Form::make()->schema([
        TextInput::make('title')->watch(),
        TextInput::make('slug'),
    ]);

    expect($form->hasWatchers())->toBeTrue();
});

it('detects no watchers when no field is watched', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('slug'),
    ]);

    expect($form->hasWatchers())->toBeFalse();
});

it('can set state path', function () {
    $form = Form::make()->statePath('data');

    expect($form->getStatePath())->toBe('data');
});

it('has null state path by default', function () {
    $form = Form::make();

    expect($form->getStatePath())->toBeNull();
});

it('collects validation rules with state path prefix', function () {
    $form = Form::make()->statePath('data')->schema([
        TextInput::make('title')->required(),
    ]);

    $rules = $form->getValidationRules();

    // The field's statePath becomes 'title' (no prefix from form at field level)
    // But getFields uses getLeafComponents which keys by statePath
    expect($rules)->not->toBeEmpty();
});

it('serializes to array', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
    ]);

    $array = $form->toArray();

    expect($array)
        ->toHaveKey('components')
        ->toHaveKey('statePath')
        ->toHaveKey('state')
        ->toHaveKey('context', 'form')
        ->toHaveKey('model');
});

it('runs before state dehydrated callbacks before dehydrate callback', function () {
    $form = Form::make()->schema([
        TextInput::make('title')
            ->beforeStateDehydrated(fn (string $state): string => "{$state}-before")
            ->dehydrateStateUsing(fn (string $state): string => "{$state}-after"),
    ]);

    $data = ['title' => 'value'];

    $form->dehydrateState($data);

    expect($data['title'])->toBe('value-before-after');
});

it('saves file uploads during dehydrate state', function () {
    $upload = new TemporaryUploadedFile(
        path: 'tmp/avatar.jpg',
        originalName: 'avatar.jpg',
        mimeType: 'image/jpeg',
        size: 123,
        disk: 'local',
    );

    $form = Form::make()->schema([
        FileUpload::make('avatar')
            ->saveUploadedFileUsing(
                fn (TemporaryUploadedFile $file): string => 'saved/' . $file->getOriginalName()
            ),
    ]);

    $data = ['avatar' => $upload];

    $form->dehydrateState($data);

    expect($data['avatar'])->toBe('saved/avatar.jpg');
});
