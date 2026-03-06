<?php

namespace Primix\Support\Components\Schema;

use LiVue\Component as LiVueComponent;
use Primix\Support\Concerns\BelongsToContainer;
use Primix\Support\Concerns\BelongsToLiVue;
use Primix\Support\Concerns\CanBeHidden;
use Primix\Support\Concerns\HasColumnSpan;
use Primix\Support\Concerns\HasContext;
use Primix\Support\Concerns\HasId;
use Primix\Support\Concerns\HasLabel;
use Primix\Support\Concerns\HasStyle;
use Primix\Support\Concerns\HasWidth;
use Primix\Support\Components\ViewComponent;
use Primix\Support\Enums\SchemaContext;

abstract class Component extends ViewComponent
{
    use BelongsToContainer;
    use BelongsToLiVue;
    use CanBeHidden;
    use HasColumnSpan;
    use HasContext;
    use HasId;
    use HasLabel;
    use HasStyle;
    use HasWidth;

    protected ?string $evaluationIdentifier = 'component';

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'context', 'operation' => [$this->getContext()],
            'record' => [$this->container?->getRecord()],
            'livue' => [$this->getLiVue()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    {
        return match (true) {
            is_a($parameterType, LiVueComponent::class, allow_string: true) => [$this->getLiVue()],
            is_a($parameterType, SchemaContext::class, allow_string: true) => [$this->getContext()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
        };
    }
}
