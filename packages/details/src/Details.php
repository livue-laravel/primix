<?php

namespace Primix\Details;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\View;
use Primix\Details\Components\Entries\Entry;
use Primix\Forms\Schema;
use Primix\Support\Enums\SchemaContext;
use Primix\Support\SchemaBuilder;

class Details extends Schema implements Htmlable
{
    public static function configure(Details $details): Details
    {
        return $details;
    }

    protected mixed $model = null;

    protected ?string $name = 'details';

    protected bool $isWrapped = false;

    public function name(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): string
    {
        return $this->name ?? 'details';
    }

    public function getContext(): SchemaContext
    {
        return SchemaContext::Infolist;
    }

    public function model(mixed $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getModel(): mixed
    {
        return $this->model;
    }

    public function wrapped(bool $condition = true): static
    {
        $this->isWrapped = $condition;

        return $this;
    }

    public function isWrapped(): bool
    {
        return $this->isWrapped;
    }

    /**
     * Build the details schema from an array of definitions.
     *
     * @param  array<array>  $definitions
     * @param  array<string, \Closure>  $callbacks
     */
    public function fromSchema(array $definitions, array $callbacks = []): static
    {
        $builder = app(SchemaBuilder::class);
        $components = $builder->build($definitions, 'entry', $callbacks);

        return $this->schema($components);
    }

    public function getEntries(): array
    {
        return array_filter(
            $this->getLeafComponents(),
            fn ($component) => $component instanceof Entry
        );
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'model' => $this->model ? get_class($this->model) : null,
        ]);
    }

    public function toHtml(): string
    {
        return View::make('primix-details::details', [
            'details' => $this,
        ])->render();
    }
}
