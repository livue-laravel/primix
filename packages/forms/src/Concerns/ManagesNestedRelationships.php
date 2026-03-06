<?php

namespace Primix\Forms\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait ManagesNestedRelationships
{
    public function getNestedRelationshipComponents(): array
    {
        return $this->collectNestedRelationships($this->getComponents());
    }

    protected function collectNestedRelationships(array $components): array
    {
        $result = [];

        foreach ($components as $component) {
            $hasRelationship = method_exists($component, 'hasNestedRelationship')
                && $component->hasNestedRelationship();
            $hasChildren = method_exists($component, 'getChildComponents');

            if ($hasRelationship) {
                $children = $hasChildren
                    ? $this->collectNestedRelationships($component->getChildComponents())
                    : [];

                $result[] = [
                    'relationship' => $component->getNestedRelationship(),
                    'component' => $component,
                    'children' => $children,
                ];
            } elseif ($hasChildren) {
                $result = array_merge(
                    $result,
                    $this->collectNestedRelationships($component->getChildComponents())
                );
            }
        }

        return $result;
    }

    public function fillWithNestedRelationships(array $data, Model $record): array
    {
        return $this->fillNestedRelationshipTree(
            $data,
            $record,
            $this->getNestedRelationshipComponents(),
            null
        );
    }

    protected function fillNestedRelationshipTree(array $data, Model $parentModel, array $nodes, ?string $prefix): array
    {
        foreach ($nodes as $node) {
            $relationshipName = $node['relationship'];
            $path = $prefix ? $prefix . '.' . $relationshipName : $relationshipName;

            if (! method_exists($parentModel, $relationshipName)) {
                continue;
            }

            $related = $parentModel->{$relationshipName};

            if ($related instanceof Model) {
                data_set($data, $path, $related->toArray());

                if (! empty($node['children'])) {
                    $data = $this->fillNestedRelationshipTree($data, $related, $node['children'], $path);
                }
            } else {
                data_set($data, $path, []);
            }
        }

        return $data;
    }

    public function saveNestedRelationships(Model $record, array $data): void
    {
        $this->saveNestedRelationshipTree(
            $record,
            $data,
            $this->getNestedRelationshipComponents(),
            null
        );
    }

    protected function saveNestedRelationshipTree(Model $parentModel, array $data, array $nodes, ?string $prefix): void
    {
        foreach ($nodes as $node) {
            $relationshipName = $node['relationship'];
            $path = $prefix ? $prefix . '.' . $relationshipName : $relationshipName;

            if (! method_exists($parentModel, $relationshipName)) {
                continue;
            }

            $relationshipData = data_get($data, $path, []);

            if (empty($relationshipData)) {
                continue;
            }

            $relation = $parentModel->{$relationshipName}();

            if (! ($relation instanceof HasOne || $relation instanceof MorphOne)) {
                continue;
            }

            $childRelationshipNames = array_map(
                fn ($child) => $child['relationship'],
                $node['children']
            );

            $ownData = collect($relationshipData)->except($childRelationshipNames)->toArray();

            $relatedModel = $relation->updateOrCreate([], $ownData);

            if (! empty($node['children'])) {
                $this->saveNestedRelationshipTree($relatedModel, $data, $node['children'], $path);
            }
        }
    }

    public function getNestedRelationshipKeys(): array
    {
        $keys = [];

        foreach ($this->getNestedRelationshipComponents() as $node) {
            $key = $node['relationship'];

            if (! in_array($key, $keys)) {
                $keys[] = $key;
            }
        }

        return $keys;
    }
}
