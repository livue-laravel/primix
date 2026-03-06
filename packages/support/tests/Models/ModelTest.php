<?php

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Primix\Support\Models\Model as PrimixModel;

it('defines an abstract primix base model that extends eloquent model', function () {
    $reflection = new ReflectionClass(PrimixModel::class);

    expect($reflection->isAbstract())->toBeTrue()
        ->and($reflection->isSubclassOf(EloquentModel::class))->toBeTrue();
});
