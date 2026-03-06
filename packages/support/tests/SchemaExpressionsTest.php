<?php

use Primix\Support\SchemaExpressions;

it('resolves "is" expression', function () {
    $closure = SchemaExpressions::resolve(['when' => 'status', 'is' => 'draft']);

    $get = fn (string $field) => $field === 'status' ? 'draft' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'status' ? 'published' : null;
    expect($closure($get))->toBeFalse();
});

it('resolves "isNot" expression', function () {
    $closure = SchemaExpressions::resolve(['when' => 'status', 'isNot' => 'published']);

    $get = fn (string $field) => $field === 'status' ? 'draft' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'status' ? 'published' : null;
    expect($closure($get))->toBeFalse();
});

it('resolves "in" expression', function () {
    $closure = SchemaExpressions::resolve(['when' => 'status', 'in' => ['draft', 'review']]);

    $get = fn (string $field) => $field === 'status' ? 'draft' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'status' ? 'review' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'status' ? 'published' : null;
    expect($closure($get))->toBeFalse();
});

it('resolves "notIn" expression', function () {
    $closure = SchemaExpressions::resolve(['when' => 'status', 'notIn' => ['archived', 'deleted']]);

    $get = fn (string $field) => $field === 'status' ? 'draft' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'status' ? 'archived' : null;
    expect($closure($get))->toBeFalse();
});

it('resolves "filled" true expression', function () {
    $closure = SchemaExpressions::resolve(['when' => 'email', 'filled' => true]);

    $get = fn (string $field) => $field === 'email' ? 'test@example.com' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'email' ? '' : null;
    expect($closure($get))->toBeFalse();

    $get = fn (string $field) => null;
    expect($closure($get))->toBeFalse();
});

it('resolves "filled" false expression', function () {
    $closure = SchemaExpressions::resolve(['when' => 'email', 'filled' => false]);

    $get = fn (string $field) => $field === 'email' ? '' : null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => null;
    expect($closure($get))->toBeTrue();

    $get = fn (string $field) => $field === 'email' ? 'test@example.com' : null;
    expect($closure($get))->toBeFalse();
});

it('throws on invalid expression', function () {
    SchemaExpressions::resolve(['when' => 'status']);
})->throws(InvalidArgumentException::class);

it('detects expressions correctly', function () {
    expect(SchemaExpressions::isExpression(['when' => 'status', 'is' => 'draft']))->toBeTrue();
    expect(SchemaExpressions::isExpression(['when' => 'email', 'filled' => true]))->toBeTrue();
    expect(SchemaExpressions::isExpression(['key' => 'value']))->toBeFalse();
    expect(SchemaExpressions::isExpression('string'))->toBeFalse();
    expect(SchemaExpressions::isExpression(42))->toBeFalse();
});
