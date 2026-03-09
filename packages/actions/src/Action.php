<?php

namespace Primix\Actions;

use Closure;
use Primix\Actions\Concerns\BelongsToComponent;
use Primix\Actions\Concerns\CanNotify;
use Primix\Support\Concerns\BelongsToContainer;
use Primix\Actions\Concerns\CanOpenModal;
use Primix\Actions\Concerns\CanRedirect;
use Primix\Actions\Concerns\CanRequireConfirmation;
use Primix\Actions\Concerns\HasForm;
use Primix\Actions\Concerns\HasName;
use Primix\Actions\Concerns\InteractsWithRecord;
use Primix\Support\Components\ViewComponent;
use Primix\Support\Concerns\CanBeDisabled;
use Primix\Support\Concerns\CanBeHidden;
use Primix\Support\Concerns\HasColor;
use Primix\Support\Concerns\HasIcon;
use Primix\Support\Concerns\HasId;
use Primix\Support\Concerns\HasSchemaComponentIdentifier;
use Primix\Support\Concerns\HasSize;
use Primix\Support\Enums\TooltipPosition;
use Primix\Support\SchemaBuilder;

class Action extends ViewComponent
{
    public const HALT = '__halt__';
    use BelongsToComponent;
    use BelongsToContainer;
    use CanBeDisabled;
    use CanBeHidden;
    use CanNotify;
    use CanOpenModal;
    use CanRedirect;
    use CanRequireConfirmation;
    use HasColor;
    use HasForm;
    use HasIcon;
    use HasId;
    use HasName;
    use HasSchemaComponentIdentifier;
    use HasSize;
    use InteractsWithRecord;

    protected static ?string $schemaComponentCategory = 'action';

    protected ?string $evaluationIdentifier = 'action';

    protected ?Closure $action = null;

    protected string|Closure|null $url = null;

    protected bool $shouldOpenUrlInNewTab = false;

    protected ?string $resourceClass = null;

    protected ?string $keyboardShortcut = null;

    protected bool|Closure $isOutlined = false;

    protected bool|Closure $isLink = false;

    protected bool|Closure $isIconButton = false;

    protected bool|Closure $hasTooltip = false;

    protected TooltipPosition|Closure|null $tooltipPosition = null;

    protected bool $isSubmit = false;

    protected string|Closure|null $jsAction = null;

    protected array $afterCallbacks = [];

    public function __construct(?string $name)
    {
        $this->name($name);
    }

    public static function make(?string $name = null): static
    {
        $static = app(static::class, ['name' => $name ?? static::getDefaultName()]);

        $static->configure();

        return $static;
    }

    /**
     * Build an action instance from a schema definition.
     *
     * @param  array<string, mixed>  $definition
     * @param  array<string, \Closure>  $callbacks
     */
    public static function fromSchema(array $definition, array $callbacks = []): static
    {
        $builder = app(SchemaBuilder::class);
        $definition['type'] ??= static::getSchemaComponentType();

        $component = $builder->buildComponent($definition, 'action', $callbacks);

        if (! $component instanceof static) {
            $resolved = is_object($component) ? $component::class : 'null';

            throw new \InvalidArgumentException("Unable to build action schema as " . static::class . ", got {$resolved}.");
        }

        return $component;
    }

    public function action(?Closure $callback): static
    {
        $this->action = $callback;

        return $this;
    }

    public function url(string|Closure|null $url, bool $shouldOpenInNewTab = false): static
    {
        $this->url = $url;
        $this->shouldOpenUrlInNewTab = $shouldOpenInNewTab;

        return $this;
    }

    public function resource(?string $resourceClass): static
    {
        $this->resourceClass = $resourceClass;

        return $this;
    }

    public function getResourceClass(): ?string
    {
        return $this->resourceClass;
    }

    public function openUrlInNewTab(bool $condition = true): static
    {
        $this->shouldOpenUrlInNewTab = $condition;

        return $this;
    }

    public function keyboardShortcut(?string $shortcut): static
    {
        $this->keyboardShortcut = $shortcut;

        return $this;
    }

    public function outlined(bool|Closure $condition = true): static
    {
        $this->isOutlined = $condition;

        return $this;
    }

    public function link(bool|Closure $condition = true): static
    {
        $this->isLink = $condition;

        return $this;
    }

    public function getAction(): ?Closure
    {
        return $this->action;
    }

    public function getUrl(): ?string
    {
        return $this->evaluate($this->url);
    }

    public function shouldOpenUrlInNewTab(): bool
    {
        return $this->shouldOpenUrlInNewTab;
    }

    public function getKeyboardShortcut(): ?string
    {
        return $this->keyboardShortcut;
    }

    public function isOutlined(): bool
    {
        return (bool) $this->evaluate($this->isOutlined);
    }

    public function isLink(): bool
    {
        return (bool) $this->evaluate($this->isLink);
    }

    public function iconButton(
        bool|Closure $condition = true,
        bool|Closure $showTooltip = true,
        TooltipPosition|Closure|null $tooltipPosition = null
    ): static
    {
        $this->isIconButton = $condition;
        $this->tooltip(
            fn () => (bool) $this->evaluate($condition) && (bool) $this->evaluate($showTooltip),
            $tooltipPosition,
        );

        return $this;
    }

    public function isIconButton(): bool
    {
        return (bool) $this->evaluate($this->isIconButton);
    }

    public function tooltip(
        bool|Closure $condition = true,
        TooltipPosition|Closure|null $position = null
    ): static
    {
        $this->hasTooltip = $condition;
        $this->tooltipPosition = $position;

        return $this;
    }

    public function hasTooltip(): bool
    {
        return (bool) $this->evaluate($this->hasTooltip);
    }

    public function getTooltipPosition(): ?TooltipPosition
    {
        $position = $this->evaluate($this->tooltipPosition);

        if ($position instanceof TooltipPosition) {
            return $position;
        }

        if (is_string($position)) {
            return TooltipPosition::tryFrom($position);
        }

        return null;
    }

    public function submit(bool $condition = true): static
    {
        $this->isSubmit = $condition;

        return $this;
    }

    public function isSubmit(): bool
    {
        return $this->isSubmit;
    }

    public function jsAction(string|Closure|null $expression): static
    {
        $this->jsAction = $expression;

        return $this;
    }

    public function getJsAction(): ?string
    {
        return $this->evaluate($this->jsAction);
    }

    public function after(Closure $callback): static
    {
        $this->afterCallbacks[] = $callback;

        return $this;
    }

    public function success(): void
    {
        $this->sendSuccessNotification();
        $this->dispatchSuccessRedirect();
    }

    protected function runAfterCallbacks(): void
    {
        foreach ($this->afterCallbacks as $callback) {
            $this->evaluate($callback);
        }
    }

    public function call(array $data = []): mixed
    {
        if ($this->action === null) {
            return null;
        }

        $result = $this->evaluate($this->action, [
            'data' => $data,
        ]);

        $this->runAfterCallbacks();

        return $result;
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'record' => [$this->getRecord()],
            'data' => [$this->getFormData()],
            'component' => [$this->getComponent()],
            'container' => [$this->getContainer()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    public function getView(): string
    {
        return 'primix-actions::action';
    }

    public function getCallMethod(): string
    {
        return 'callAction';
    }

    public function toVueProps(): array
    {
        $record = $this->getRecord();
        $recordKey = $record !== null && method_exists($record, 'getKey') ? $record->getKey() : null;

        return array_merge(parent::toVueProps(), [
            'id' => $this->getId(),
            'label' => $this->getLabel(),
            'name' => $this->getName(),
            'callMethod' => $this->getCallMethod(),
            'recordKey' => $recordKey,
            'icon' => $this->getIcon(),
            'iconPosition' => $this->getIconPosition(),
            'color' => $this->getColor() ?? 'primary',
            'size' => $this->getSize() ?? 'md',
            'disabled' => $this->isDisabled(),
            'outlined' => $this->isOutlined(),
            'isLink' => $this->isLink(),
            'isIconButton' => $this->isIconButton(),
            'hasTooltip' => $this->hasTooltip(),
            'tooltipPosition' => $this->getTooltipPosition()?->value,
            'url' => $this->getUrl(),
            'openUrlInNewTab' => $this->shouldOpenUrlInNewTab(),
            'keyboardShortcut' => $this->getKeyboardShortcut(),
            'requiresConfirmation' => $this->doesRequireConfirmation(),
            'confirmationHeading' => $this->getConfirmationHeading(),
            'confirmationDescription' => $this->getConfirmationDescription(),
            'confirmationButtonLabel' => $this->getConfirmationButtonLabel(),
            'cancelButtonLabel' => $this->getCancelButtonLabel(),
            'isModal' => $this->isModal(),
            'modalHeading' => $this->getModalHeading(),
            'modalDescription' => $this->getModalDescription(),
            'modalWidth' => $this->getModalWidth(),
            'hasForm' => $this->hasForm(),
            'modalFooterHidden' => $this->isModalFooterHidden(),
            'isSubmit' => $this->isSubmit(),
            'jsAction' => $this->getJsAction(),
        ]);
    }
}
