<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Components\FormComponent;
use Primix\Forms\Components\Utilities\Get;
use Primix\Forms\Components\Utilities\Set;
use Primix\Forms\Concerns\HasDatabaseValidationRules;
use Primix\Forms\Concerns\HasNullableValidationRule;
use Primix\Forms\Concerns\HasName;
use Primix\Forms\Concerns\HasSizeValidationRules;
use Primix\Support\Concerns\CanBeDisabled;
use Primix\Support\Concerns\CanBeRequired;
use Primix\Support\Concerns\HasContentSlots;
use Primix\Support\Concerns\HasDefaultValue;
use Primix\Support\Concerns\HasHelperText;
use Primix\Support\Concerns\HasHint;
use Primix\Support\Concerns\HasPlaceholder;
use Primix\Support\Concerns\HasSchemaComponentIdentifier;
use Primix\Support\Concerns\HasStatePath;

abstract class Field extends FormComponent
{
    use CanBeDisabled;
    use CanBeRequired;
    use HasDatabaseValidationRules;
    use HasContentSlots;
    use HasDefaultValue;
    use HasHelperText;
    use HasHint;
    use HasName;
    use HasNullableValidationRule;
    use HasPlaceholder;
    use HasSchemaComponentIdentifier;
    use HasSizeValidationRules;
    use HasStatePath;

    protected static ?string $schemaComponentCategory = 'field';

    protected string|array|null $rules = null;

    protected array $validationMessages = [];

    protected bool $autoRulesDisabled = false;

    protected array $dedicatedRules = [];

    protected Closure|bool $isDehydrated = true;

    protected array $beforeStateDehydratedCallbacks = [];

    protected ?Closure $dehydrateStateCallback = null;

    protected bool $isWatched = false;

    protected ?Closure $watchCallback = null;

    protected string $watchMode = 'immediate';

    protected int $watchDebounceMs = 300;

    public function getWrapperView(): ?string
    {
        return 'primix-forms::components.field-wrapper';
    }

    public function getChildComponents(): array
    {
        return $this->getSlotComponents();
    }

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

    public function rules(string|array $rules): static
    {
        $this->rules = $rules;

        return $this;
    }

    public function validationMessages(array $messages): static
    {
        $this->validationMessages = $messages;

        return $this;
    }

    protected function getAutoRules(): array
    {
        return [];
    }

    public function withoutAutoRules(bool $condition = true): static
    {
        $this->autoRulesDisabled = $condition;

        return $this;
    }

    protected function setDedicatedRule(string $key, string $rule): static
    {
        $this->dedicatedRules[$key] = $rule;

        return $this;
    }

    protected function removeDedicatedRule(string $key): static
    {
        unset($this->dedicatedRules[$key]);

        return $this;
    }

    public function getRules(): ?string
    {
        $rules = [];

        if ($this->isRequired()) {
            $rules[] = 'required';
        }

        if (! $this->autoRulesDisabled) {
            $autoRules = $this->getAutoRules();
            foreach ($autoRules as $rule) {
                $rules[] = $rule;
            }
        }

        foreach ($this->dedicatedRules as $rule) {
            $rules[] = $rule;
        }

        if ($this->rules) {
            $customRules = is_array($this->rules) ? implode('|', $this->rules) : $this->rules;
            $rules[] = $customRules;
        }

        $rules = array_unique($rules);

        return empty($rules) ? null : implode('|', $rules);
    }

    public function getValidationMessages(): array
    {
        return $this->validationMessages;
    }

    public function dehydrateStateUsing(?Closure $callback): static
    {
        $this->dehydrateStateCallback = $callback;

        return $this;
    }

    public function beforeStateDehydrated(?Closure $callback): static
    {
        if ($callback !== null) {
            $this->beforeStateDehydratedCallbacks[] = $callback;
        }

        return $this;
    }

    /**
     * @return array<Closure>
     */
    public function getBeforeStateDehydratedCallbacks(): array
    {
        return $this->beforeStateDehydratedCallbacks;
    }

    public function getDehydrateStateCallback(): ?Closure
    {
        return $this->dehydrateStateCallback;
    }

    public function dehydrated(Closure|bool $condition = true): static
    {
        $this->isDehydrated = $condition;

        return $this;
    }

    public function isDehydrated(): bool
    {
        return (bool) $this->evaluate($this->isDehydrated);
    }

    /**
     * Watch immediately on change (no debounce).
     * If no callback is provided, just triggers a re-render.
     */
    public function watch(?Closure $callback = null): static
    {
        $this->isWatched = true;
        $this->watchCallback = $callback;
        $this->watchMode = 'immediate';

        return $this;
    }

    /**
     * Watch with debounce.
     * If no callback is provided, just triggers a re-render after debounce.
     */
    public function watchDebounce(?Closure $callback = null, int $ms = 300): static
    {
        $this->isWatched = true;
        $this->watchCallback = $callback;
        $this->watchMode = 'debounce';
        $this->watchDebounceMs = $ms;

        return $this;
    }

    /**
     * Watch on blur only.
     * If no callback is provided, just triggers a re-render on blur.
     */
    public function watchBlur(?Closure $callback = null): static
    {
        $this->isWatched = true;
        $this->watchCallback = $callback;
        $this->watchMode = 'blur';

        return $this;
    }

    public function isWatched(): bool
    {
        return $this->isWatched;
    }

    public function getWatchCallback(): ?Closure
    {
        return $this->watchCallback;
    }

    public function getWatchMode(): string
    {
        return $this->watchMode;
    }

    public function getWatchDebounceMs(): int
    {
        return $this->watchDebounceMs;
    }

    public function getWatchDirective(): string
    {
        if (! $this->isWatched) {
            return '';
        }

        $path = $this->getStatePath();
        $modifier = match ($this->watchMode) {
            'blur' => 'v-watch.blur',
            'debounce' => "v-watch.debounce.{$this->watchDebounceMs}ms",
            default => 'v-watch',
        };

        return "data-watch-path=\"{$path}\" {$modifier}";
    }


    public function getStatePath(): ?string
    {
        $path = $this->statePath ?? $this->name;

        if ($path && $this->container && $this->container->getStatePath()) {
            return $this->container->getStatePath() . '.' . $path;
        }

        return $path;
    }

    public function toVueProps(): array
    {
        $statePath = $this->getStatePath();

        return array_merge(parent::toVueProps(), [
            'id' => $this->getId(),
            'label' => $this->getLabel(),
            'name' => $this->getName(),
            'statePath' => $statePath ? static::toJsExpression($statePath) : null,
            'placeholder' => $this->getPlaceholder(),
            'hint' => $this->getHint(),
            'helperText' => $this->getHelperText(),
            'disabled' => $this->isDisabled(),
            'required' => $this->isRequired(),
            'columnSpan' => $this->getColumnSpan(),
            'columnStart' => $this->getColumnStart(),
            'default' => $this->getDefaultValue(),
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
            'get' => [$this->makeGetUtility()],
            'set' => [$this->makeSetUtility()],
            'state' => [$this->getStateValue()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    {
        return match ($parameterType) {
            Get::class => [$this->makeGetUtility()],
            Set::class => [$this->makeSetUtility()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
        };
    }

    protected function makeGetUtility(): ?Get
    {
        $livue = $this->getLiVue();

        if (! $livue) {
            return null;
        }

        return new Get(
            livue: $livue,
            containerStatePath: $this->container?->getStatePath(),
        );
    }

    protected function makeSetUtility(): ?Set
    {
        $livue = $this->getLiVue();

        if (! $livue) {
            return null;
        }

        return new Set(
            livue: $livue,
            containerStatePath: $this->container?->getStatePath(),
        );
    }

    protected function getStateValue(): mixed
    {
        $livue = $this->getLiVue();

        if (! $livue) {
            return null;
        }

        return data_get($livue, $this->getStatePath());
    }
}
