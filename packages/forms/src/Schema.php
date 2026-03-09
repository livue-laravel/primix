<?php

namespace Primix\Forms;

use Primix\Forms\Concerns\HasColumns;
use Primix\Support\Components\ComponentContainer;
use Primix\Support\Contracts\SchemaContainer;
use Primix\Support\Enums\SchemaContext;

abstract class Schema extends ComponentContainer implements SchemaContainer
{
    use HasColumns;

    protected array $components = [];

    protected ?string $statePath = null;

    protected mixed $record = null;

    protected array $state = [];

    abstract public function getContext(): SchemaContext;

    public function getRecord(): mixed
    {
        return $this->record;
    }

    public function getStatePath(): ?string
    {
        return $this->statePath;
    }

    public function schema(array $components): static
    {
        $this->components = $components;

        $this->configureComponents($this->components);

        return $this;
    }

    protected function configureComponents(array $components, ?string $statePathPrefix = null): void
    {
        foreach ($components as $component) {
            // Apply state path prefix from parent nested relationship
            if ($statePathPrefix !== null && method_exists($component, 'getStatePath')) {
                $currentPath = $component->getStatePath();

                if ($currentPath !== null) {
                    $component->statePath($statePathPrefix . '.' . $currentPath);
                }
            }

            if (method_exists($component, 'livue') && $this->getLiVue()) {
                $component->livue($this->getLiVue());
            }

            if (method_exists($component, 'container')) {
                $component->container($this);
            }

            if (method_exists($component, 'context')) {
                $component->context($this->getContext());
            }

            if (method_exists($component, 'getChildComponents')) {
                $childPrefix = $statePathPrefix;

                if (method_exists($component, 'hasNestedRelationship') && $component->hasNestedRelationship()) {
                    $relationshipName = $component->getNestedRelationship();
                    $childPrefix = $statePathPrefix
                        ? $statePathPrefix . '.' . $relationshipName
                        : $relationshipName;
                }

                // Propagate inlineLabel from parent layout to children recursively
                if (method_exists($component, 'isLabelInline') && $component->isLabelInline()) {
                    foreach ($component->getChildComponents() as $child) {
                        if (method_exists($child, 'inlineLabel')) {
                            $child->inlineLabel(true);
                        }
                    }
                }

                $this->configureComponents($component->getChildComponents(), $childPrefix);
            }
        }
    }

    public function getComponents(): array
    {
        return $this->components;
    }

    public function statePath(?string $path): static
    {
        $this->statePath = $path;

        return $this;
    }

    public function record(mixed $record): static
    {
        $this->record = $record;

        return $this;
    }

    public function fill(array $state = []): static
    {
        $this->state = $state;

        return $this;
    }

    public function getState(): array
    {
        return $this->state;
    }

    public function getLeafComponents(): array
    {
        return $this->flattenComponents($this->components);
    }

    protected function flattenComponents(array $components): array
    {
        $leaves = [];

        foreach ($components as $component) {
            if (method_exists($component, 'getStatePath')) {
                $path = $component->getStatePath();
                if ($path) {
                    $leaves[$path] = $component;
                }
            }

            if (method_exists($component, 'getChildComponents')) {
                $leaves = array_merge(
                    $leaves,
                    $this->flattenComponents($component->getChildComponents())
                );
            }
        }

        return $leaves;
    }

    public function toArray(): array
    {
        return [
            'components' => array_map(fn ($c) => $c->toVueProps(), $this->components),
            'statePath' => $this->statePath,
            'state' => $this->state,
            'context' => $this->getContext()->value,
        ];
    }
}
