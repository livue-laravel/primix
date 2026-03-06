<?php

namespace Primix\Forms\Concerns;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Relation;

trait HasRelationship
{
    protected ?string $relationship = null;

    protected ?string $relationshipTitleAttribute = null;

    protected ?Closure $relationshipQuery = null;

    public function relationship(
        string $name,
        string $titleAttribute,
        ?Closure $modifyQueryUsing = null,
    ): static {
        $this->relationship = $name;
        $this->relationshipTitleAttribute = $titleAttribute;
        $this->relationshipQuery = $modifyQueryUsing;

        return $this;
    }

    public function hasRelationship(): bool
    {
        return $this->relationship !== null;
    }

    public function getRelationshipName(): ?string
    {
        return $this->relationship;
    }

    public function getRelationshipTitleAttribute(): ?string
    {
        return $this->relationshipTitleAttribute;
    }

    public function getRelation(): ?Relation
    {
        $model = $this->getRelationshipModel();

        if (! $model) {
            return null;
        }

        $instance = $model instanceof Model ? $model : new $model;
        $relationshipName = $this->relationship;

        if (! method_exists($instance, $relationshipName)) {
            return null;
        }

        return $instance->{$relationshipName}();
    }

    public function getRelationshipType(): ?string
    {
        $relation = $this->getRelation();

        if (! $relation) {
            return null;
        }

        return match (true) {
            $relation instanceof BelongsTo => 'BelongsTo',
            $relation instanceof BelongsToMany => 'BelongsToMany',
            default => null,
        };
    }

    public function isBelongsTo(): bool
    {
        return $this->getRelationshipType() === 'BelongsTo';
    }

    public function isBelongsToMany(): bool
    {
        return $this->getRelationshipType() === 'BelongsToMany';
    }

    public function getRelationshipOptions(): array
    {
        if (! $this->hasRelationship()) {
            return [];
        }

        $relation = $this->getRelation();

        if (! $relation) {
            return [];
        }

        $query = $this->getRelationshipQuery();
        $titleAttribute = $this->relationshipTitleAttribute;
        $keyName = $relation->getRelated()->getKeyName();

        return $query->pluck($titleAttribute, $keyName)->toArray();
    }

    public function getRelationshipValues(Model $record): ?array
    {
        if (! $this->isBelongsToMany()) {
            return null;
        }

        $relationshipName = $this->relationship;

        return $record->{$relationshipName}()
            ->pluck($record->{$relationshipName}()->getRelated()->getKeyName())
            ->toArray();
    }

    public function saveRelationship(Model $record, mixed $state): void
    {
        if (! $this->isBelongsToMany()) {
            return;
        }

        $relationshipName = $this->relationship;
        $ids = is_array($state) ? $state : [];

        $record->{$relationshipName}()->sync($ids);
    }

    protected function getRelationshipModel(): mixed
    {
        $container = $this->container ?? null;

        if (! $container) {
            return null;
        }

        if (method_exists($container, 'getModel')) {
            return $container->getModel();
        }

        return null;
    }

    protected function getRelationshipQuery(): Builder
    {
        $relation = $this->getRelation();
        $query = $relation->getRelated()->query();

        if ($this->relationshipQuery) {
            ($this->relationshipQuery)($query);
        }

        return $query;
    }
}
