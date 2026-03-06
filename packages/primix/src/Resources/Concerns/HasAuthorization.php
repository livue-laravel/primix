<?php

namespace Primix\Resources\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;

trait HasAuthorization
{
    public static function canCreate(): bool
    {
        if (Gate::getPolicyFor(static::getModel()) === null) {
            return true;
        }

        return Gate::allows('create', static::getModel());
    }

    public static function canEdit(Model $record): bool
    {
        if (Gate::getPolicyFor($record) === null) {
            return true;
        }

        return Gate::allows('update', $record);
    }

    public static function canDelete(Model $record): bool
    {
        if (Gate::getPolicyFor($record) === null) {
            return true;
        }

        return Gate::allows('delete', $record);
    }

    public static function canView(Model $record): bool
    {
        if (Gate::getPolicyFor($record) === null) {
            return true;
        }

        return Gate::allows('view', $record);
    }

    public static function canViewAny(): bool
    {
        if (Gate::getPolicyFor(static::getModel()) === null) {
            return true;
        }

        return Gate::allows('viewAny', static::getModel());
    }

    public static function canForceDelete(Model $record): bool
    {
        if (Gate::getPolicyFor($record) === null) {
            return true;
        }

        return Gate::allows('forceDelete', $record);
    }

    public static function canRestore(Model $record): bool
    {
        if (Gate::getPolicyFor($record) === null) {
            return true;
        }

        return Gate::allows('restore', $record);
    }

    public static function canForceDeleteAny(): bool
    {
        if (Gate::getPolicyFor(static::getModel()) === null) {
            return true;
        }

        return Gate::allows('forceDeleteAny', static::getModel());
    }

    public static function canRestoreAny(): bool
    {
        if (Gate::getPolicyFor(static::getModel()) === null) {
            return true;
        }

        return Gate::allows('restoreAny', static::getModel());
    }
}
