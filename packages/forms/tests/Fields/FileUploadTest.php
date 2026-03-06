<?php

use Primix\Forms\Components\Fields\FileUpload;

it('has null accepted file types by default', function () {
    $field = FileUpload::make('file');

    expect($field->getAcceptedFileTypes())->toBeNull();
});

it('can set accepted file types', function () {
    $field = FileUpload::make('file')->acceptedFileTypes(['image/jpeg', 'image/png']);

    expect($field->getAcceptedFileTypes())->toBe(['image/jpeg', 'image/png']);
});

it('can set accepted file types from string', function () {
    $field = FileUpload::make('file')->acceptedFileTypes('application/pdf');

    expect($field->getAcceptedFileTypes())->toBe(['application/pdf']);
});

it('can be set as image', function () {
    $field = FileUpload::make('file')->image();

    expect($field->getAcceptedFileTypes())->toContain('image/jpeg')
        ->toContain('image/png')
        ->toContain('image/gif')
        ->toContain('image/webp')
        ->toContain('image/svg+xml');
});

it('detects image mode', function () {
    $field = FileUpload::make('file')->image();

    expect($field->isImage())->toBeTrue();
});

it('is not image by default', function () {
    $field = FileUpload::make('file');

    expect($field->isImage())->toBeFalse();
});

it('is not image with mixed types', function () {
    $field = FileUpload::make('file')->acceptedFileTypes(['image/jpeg', 'application/pdf']);

    expect($field->isImage())->toBeFalse();
});

it('can be set as avatar', function () {
    $field = FileUpload::make('file')->avatar();

    expect($field->isImage())->toBeTrue()
        ->and($field->getDirectory())->toBe('avatars');
});

it('has null max size by default', function () {
    $field = FileUpload::make('file');

    expect($field->getMaxSize())->toBeNull();
});

it('can set max size', function () {
    $field = FileUpload::make('file')->maxSize(2048);

    expect($field->getMaxSize())->toBe(2048);
});

it('has null min size by default', function () {
    $field = FileUpload::make('file');

    expect($field->getMinSize())->toBeNull();
});

it('can set min size', function () {
    $field = FileUpload::make('file')->minSize(100);

    expect($field->getMinSize())->toBe(100);
});

it('formats max size in KB', function () {
    $field = FileUpload::make('file')->maxSize(512);

    expect($field->getMaxSizeForHumans())->toBe('512 KB');
});

it('formats max size in MB', function () {
    $field = FileUpload::make('file')->maxSize(2048);

    expect($field->getMaxSizeForHumans())->toBe('2 MB');
});

it('has null max size for humans by default', function () {
    $field = FileUpload::make('file');

    expect($field->getMaxSizeForHumans())->toBeNull();
});

it('is not multiple by default', function () {
    $field = FileUpload::make('file');

    expect($field->isMultiple())->toBeFalse();
});

it('can be multiple', function () {
    $field = FileUpload::make('file')->multiple();

    expect($field->isMultiple())->toBeTrue();
});

it('has null max files by default', function () {
    $field = FileUpload::make('file');

    expect($field->getMaxFiles())->toBeNull();
});

it('can set max files', function () {
    $field = FileUpload::make('file')->maxFiles(5);

    expect($field->getMaxFiles())->toBe(5)
        ->and($field->isMultiple())->toBeTrue();
});

it('has null min files by default', function () {
    $field = FileUpload::make('file');

    expect($field->getMinFiles())->toBeNull();
});

it('can set min files', function () {
    $field = FileUpload::make('file')->minFiles(2);

    expect($field->getMinFiles())->toBe(2)
        ->and($field->isMultiple())->toBeTrue();
});

it('is not reorderable by default', function () {
    $field = FileUpload::make('file');

    expect($field->isReorderable())->toBeFalse();
});

it('can be reorderable when multiple', function () {
    $field = FileUpload::make('file')->multiple()->reorderable();

    expect($field->isReorderable())->toBeTrue();
});

it('is not reorderable when single', function () {
    $field = FileUpload::make('file')->reorderable();

    expect($field->isReorderable())->toBeFalse();
});

it('is not downloadable by default', function () {
    $field = FileUpload::make('file');

    expect($field->isDownloadable())->toBeFalse();
});

it('can be downloadable', function () {
    $field = FileUpload::make('file')->downloadable();

    expect($field->isDownloadable())->toBeTrue();
});

it('is previewable by default', function () {
    $field = FileUpload::make('file');

    expect($field->isPreviewable())->toBeTrue();
});

it('can disable preview', function () {
    $field = FileUpload::make('file')->previewable(false);

    expect($field->isPreviewable())->toBeFalse();
});

it('is deletable by default', function () {
    $field = FileUpload::make('file');

    expect($field->isDeletable())->toBeTrue();
});

it('can disable delete', function () {
    $field = FileUpload::make('file')->deletable(false);

    expect($field->isDeletable())->toBeFalse();
});

it('has null directory by default', function () {
    $field = FileUpload::make('file');

    expect($field->getDirectory())->toBeNull();
});

it('can set directory', function () {
    $field = FileUpload::make('file')->directory('uploads/images');

    expect($field->getDirectory())->toBe('uploads/images');
});

it('has public disk by default', function () {
    $field = FileUpload::make('file');

    expect($field->getDisk())->toBe('public');
});

it('can set disk', function () {
    $field = FileUpload::make('file')->disk('s3');

    expect($field->getDisk())->toBe('s3');
});

it('has public visibility by default', function () {
    $field = FileUpload::make('file');

    expect($field->getVisibility())->toBe('public');
});

it('can set visibility', function () {
    $field = FileUpload::make('file')->visibility('private');

    expect($field->getVisibility())->toBe('private');
});

it('does not preserve filenames by default', function () {
    $field = FileUpload::make('file');

    expect($field->shouldPreserveFilenames())->toBeFalse();
});

it('can preserve filenames', function () {
    $field = FileUpload::make('file')->preserveFilenames();

    expect($field->shouldPreserveFilenames())->toBeTrue();
});

it('has null accept attribute by default', function () {
    $field = FileUpload::make('file');

    expect($field->getAcceptAttribute())->toBeNull();
});

it('returns accept attribute from file types', function () {
    $field = FileUpload::make('file')->acceptedFileTypes(['image/jpeg', 'image/png']);

    expect($field->getAcceptAttribute())->toBe('image/jpeg,image/png');
});

it('generates file validation rules for single image', function () {
    $field = FileUpload::make('file')->image()->maxSize(2048);

    expect($field->getFileValidationRules())->toContain('image')
        ->toContain('max:2048');
});

it('generates file validation rules with mimetypes', function () {
    $field = FileUpload::make('file')->acceptedFileTypes(['application/pdf'])->maxSize(1024);

    expect($field->getFileValidationRules())->toContain('file')
        ->toContain('max:1024')
        ->toContain('mimetypes:application/pdf');
});

it('generates array validation rules for multiple', function () {
    $field = FileUpload::make('file')->multiple()->minFiles(1)->maxFiles(5);

    expect($field->getArrayValidationRules())->toContain('array')
        ->toContain('min:1')
        ->toContain('max:5');
});

it('returns empty array validation rules for single', function () {
    $field = FileUpload::make('file');

    expect($field->getArrayValidationRules())->toBe([]);
});

it('does not have image editor by default', function () {
    $field = FileUpload::make('file');

    expect($field->hasImageEditor())->toBeFalse();
});

it('can enable image editor for images', function () {
    $field = FileUpload::make('file')->image()->imageEditor();

    expect($field->hasImageEditor())->toBeTrue();
});

it('image editor requires image mode', function () {
    $field = FileUpload::make('file')->imageEditor();

    expect($field->hasImageEditor())->toBeFalse();
});

it('returns empty image editor config when disabled', function () {
    $field = FileUpload::make('file');

    expect($field->getImageEditorConfig())->toBe([]);
});

it('returns image editor config when enabled', function () {
    $field = FileUpload::make('file')->image()->imageEditor();

    expect($field->getImageEditorConfig())->toHaveKey('enabled', true);
});

it('returns correct view', function () {
    $field = FileUpload::make('file');

    expect($field->getView())->toBe('primix-forms::components.fields.file-upload');
});

it('returns complete vue props', function () {
    $field = FileUpload::make('file')
        ->image()
        ->multiple()
        ->maxSize(2048)
        ->downloadable();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('multiple', true)
        ->toHaveKey('isImage', true)
        ->toHaveKey('maxSize', 2048)
        ->toHaveKey('downloadable', true)
        ->toHaveKey('previewable', true)
        ->toHaveKey('deletable', true);
});
