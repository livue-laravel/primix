<?php

namespace Primix\Details\Components\Entries;

use Closure;
use DateTimeInterface;
use Primix\Forms\Components\FormComponent;
use Primix\Forms\Concerns\HasName;
use Primix\Support\Concerns\HasDefaultValue;
use Primix\Support\Concerns\HasHelperText;
use Primix\Support\Concerns\HasPlaceholder;
use Primix\Support\Concerns\HasSchemaComponentIdentifier;
use Primix\Support\Concerns\HasStatePath;

abstract class Entry extends FormComponent
{
    use HasDefaultValue;
    use HasHelperText;
    use HasName;
    use HasPlaceholder;
    use HasSchemaComponentIdentifier;
    use HasStatePath;

    protected static ?string $schemaComponentCategory = 'entry';

    protected mixed $state = null;

    protected ?Closure $formatStateUsing = null;

    protected bool|Closure $isHtml = false;

    final public function __construct(string $name)
    {
        $this->name($name);
        $this->statePath($name);
    }

    public static function make(string $name): static
    {
        $static = app(static::class, ['name' => $name]);
        $static->configure();

        return $static;
    }

    public function getWrapperView(): ?string
    {
        return 'primix-details::components.entry-wrapper';
    }

    public function state(mixed $state): static
    {
        $this->state = $state;

        return $this;
    }

    public function formatStateUsing(?Closure $callback): static
    {
        $this->formatStateUsing = $callback;

        return $this;
    }

    public function html(bool|Closure $condition = true): static
    {
        $this->isHtml = $condition;

        return $this;
    }

    public function isHtml(): bool
    {
        return (bool) $this->evaluate($this->isHtml);
    }

    public function getStatePath(): ?string
    {
        $path = $this->statePath ?? $this->name;

        if ($path && $this->container && method_exists($this->container, 'getStatePath') && $this->container->getStatePath()) {
            return $this->container->getStatePath() . '.' . $path;
        }

        return $path;
    }

    public function getState(): mixed
    {
        $state = $this->resolveState();

        if ($state === null) {
            $state = $this->getDefaultValue();
        }

        if ($this->formatStateUsing !== null) {
            $state = $this->evaluate($this->formatStateUsing, [
                'state' => $state,
            ]);
        }

        return $state;
    }

    protected function resolveState(): mixed
    {
        if ($this->state !== null) {
            return $this->evaluate($this->state);
        }

        $statePath = $this->getStatePath();

        if ($statePath === null) {
            return null;
        }

        $livue = $this->getLiVue();

        if ($livue) {
            $missing = new \stdClass();
            $stateFromLiVue = data_get($livue, $statePath, $missing);

            if ($stateFromLiVue !== $missing) {
                return $stateFromLiVue;
            }
        }

        $record = $this->container?->getRecord();

        if ($record === null) {
            return null;
        }

        $containerStatePath = method_exists($this->container, 'getStatePath')
            ? $this->container->getStatePath()
            : null;

        $relativePath = $containerStatePath && str_starts_with($statePath, $containerStatePath . '.')
            ? substr($statePath, strlen($containerStatePath) + 1)
            : $statePath;

        return data_get($record, $relativePath);
    }

    public function toVueProps(): array
    {
        $statePath = $this->getStatePath();
        $state = $this->getState();

        if ($state instanceof DateTimeInterface) {
            $state = $state->format(DATE_ATOM);
        }

        return array_merge(parent::toVueProps(), [
            'id' => $this->getId(),
            'label' => $this->getLabel(),
            'name' => $this->getName(),
            'statePath' => $statePath ? static::toJsExpression($statePath) : null,
            'state' => $state,
            'placeholder' => $this->getPlaceholder(),
            'helperText' => $this->getHelperText(),
            'columnSpan' => $this->getColumnSpan(),
            'columnStart' => $this->getColumnStart(),
            'default' => $this->getDefaultValue(),
            'html' => $this->isHtml(),
            'context' => $this->getContext()?->value,
            'style' => $this->getStylePassThrough(),
        ]);
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'state' => [$this->resolveState()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }
}
