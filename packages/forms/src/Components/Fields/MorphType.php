<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Illuminate\Database\Eloquent\Model;

class MorphType
{
    protected string $modelClass;

    protected string|Closure $titleAttribute = 'id';

    protected string|Closure|null $label = null;

    protected ?Closure $modifyQueryUsing = null;

    public static function make(string $modelClass): static
    {
        $instance = new static();
        $instance->modelClass = $modelClass;

        return $instance;
    }

    public function titleAttribute(string|Closure $attribute): static
    {
        $this->titleAttribute = $attribute;

        return $this;
    }

    public function label(string|Closure $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function modifyQueryUsing(Closure $callback): static
    {
        $this->modifyQueryUsing = $callback;

        return $this;
    }

    public function getModelClass(): string
    {
        return $this->modelClass;
    }

    public function getTitleAttribute(): string|Closure
    {
        return $this->titleAttribute;
    }

    public function getLabel(): string
    {
        if ($this->label !== null) {
            return value($this->label);
        }

        return $this->generateLabel($this->modelClass);
    }

    public function getModifyQueryUsing(): ?Closure
    {
        return $this->modifyQueryUsing;
    }

    /**
     * Resolve the display title for a model record.
     * When titleAttribute is a Closure, calls it with the record.
     * When it's a string, returns the attribute value directly.
     */
    public function resolveTitle(Model $record): string
    {
        $attr = $this->titleAttribute;

        if ($attr instanceof Closure) {
            return $attr($record);
        }

        return (string) $record->{$attr};
    }

    protected function generateLabel(string $modelClass): string
    {
        $basename = class_basename($modelClass);
        $words = preg_replace('/([a-z])([A-Z])/', '$1 $2', $basename);

        return str($words)->plural()->toString();
    }
}
