<?php

it('file upload template renders actions without native buttons', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/fields/file-upload.blade.php');

    expect($template)
        ->toContain("\\Primix\\Actions\\Action::make('editUploadedImage')")
        ->toContain("\\Primix\\Actions\\Action::make('downloadUploadedFile')")
        ->toContain("\\Primix\\Actions\\Action::make('removeUploadedFile')")
        ->toContain("\\Primix\\Actions\\Action::make('dismissUploadError')")
        ->not->toContain('<button');
});
