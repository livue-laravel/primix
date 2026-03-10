<?php

use Illuminate\Database\Eloquent\Model;

// ── Test doubles ────────────────────────────────────────────

class AuthTestModel extends Model
{
    protected $table = 'auth_test_models';
}

class AuthTestResource extends \Primix\Resources\Resource
{
    protected static ?string $model = AuthTestModel::class;

    public static function getPages(): array
    {
        return [];
    }
}

// ============================================================
// Authorization without Policy (all return true)
// ============================================================

it('canCreate returns true without policy', function () {
    expect(AuthTestResource::canCreate())->toBeTrue();
});

it('canViewAny returns true without policy', function () {
    expect(AuthTestResource::canViewAny())->toBeTrue();
});

it('canEdit returns true without policy', function () {
    expect(AuthTestResource::canEdit(new AuthTestModel()))->toBeTrue();
});

it('canDelete returns true without policy', function () {
    expect(AuthTestResource::canDelete(new AuthTestModel()))->toBeTrue();
});

it('canView returns true without policy', function () {
    expect(AuthTestResource::canView(new AuthTestModel()))->toBeTrue();
});

it('canForceDelete returns true without policy', function () {
    expect(AuthTestResource::canForceDelete(new AuthTestModel()))->toBeTrue();
});

it('canRestore returns true without policy', function () {
    expect(AuthTestResource::canRestore(new AuthTestModel()))->toBeTrue();
});

it('canForceDeleteAny returns true without policy', function () {
    expect(AuthTestResource::canForceDeleteAny())->toBeTrue();
});

it('canRestoreAny returns true without policy', function () {
    expect(AuthTestResource::canRestoreAny())->toBeTrue();
});

it('all 9 authorization methods return true without policy', function () {
    $record = new AuthTestModel();

    expect(AuthTestResource::canCreate())->toBeTrue()
        ->and(AuthTestResource::canViewAny())->toBeTrue()
        ->and(AuthTestResource::canEdit($record))->toBeTrue()
        ->and(AuthTestResource::canDelete($record))->toBeTrue()
        ->and(AuthTestResource::canView($record))->toBeTrue()
        ->and(AuthTestResource::canForceDelete($record))->toBeTrue()
        ->and(AuthTestResource::canRestore($record))->toBeTrue()
        ->and(AuthTestResource::canForceDeleteAny())->toBeTrue()
        ->and(AuthTestResource::canRestoreAny())->toBeTrue();
});
