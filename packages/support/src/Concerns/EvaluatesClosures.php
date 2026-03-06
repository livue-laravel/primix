<?php

namespace Primix\Support\Concerns;

use Closure;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Model;
use ReflectionFunction;
use ReflectionNamedType;
use ReflectionParameter;

trait EvaluatesClosures
{
    protected ?string $evaluationIdentifier = null;

    public function evaluate(mixed $value, array $namedInjections = [], array $typedInjections = []): mixed
    {
        if (! $value instanceof Closure) {
            return $value;
        }

        $dependencies = [];

        foreach ((new ReflectionFunction($value))->getParameters() as $parameter) {
            $dependencies[] = $this->resolveClosureDependencyForEvaluation(
                $parameter,
                $namedInjections,
                $typedInjections,
            );
        }

        return $value(...$dependencies);
    }

    protected function resolveClosureDependencyForEvaluation(
        ReflectionParameter $parameter,
        array $namedInjections,
        array $typedInjections,
    ): mixed {
        $parameterName = $parameter->getName();

        // 1. Named injections (explicitly passed)
        if (array_key_exists($parameterName, $namedInjections)) {
            return value($namedInjections[$parameterName]);
        }

        // 2. Typed injections (explicitly passed)
        $typedParameterClassName = $this->getTypedReflectionParameterClassName($parameter);

        if ($typedParameterClassName !== null && array_key_exists($typedParameterClassName, $typedInjections)) {
            return value($typedInjections[$typedParameterClassName]);
        }

        // 3. Default closure dependency by name (overridden in subclasses)
        $defaultByName = $this->resolveDefaultClosureDependencyForEvaluationByName($parameterName);

        if (count($defaultByName)) {
            return $defaultByName[0];
        }

        // 4. Default closure dependency by type (overridden in subclasses)
        if ($typedParameterClassName !== null) {
            $defaultByType = $this->resolveDefaultClosureDependencyForEvaluationByType($typedParameterClassName);

            if (count($defaultByType)) {
                return $defaultByType[0];
            }
        }

        // 5. Self-injection via evaluationIdentifier or type-hint
        if (
            $this->evaluationIdentifier !== null &&
            $parameterName === $this->evaluationIdentifier
        ) {
            return $this;
        }

        if ($typedParameterClassName !== null && $this instanceof $typedParameterClassName) {
            return $this;
        }

        // 6. Laravel container resolution (except Eloquent Models)
        if (
            $typedParameterClassName !== null &&
            (! is_a($typedParameterClassName, Model::class, allow_string: true) || app()->bound($typedParameterClassName))
        ) {
            try {
                return app()->make($typedParameterClassName);
            } catch (BindingResolutionException) {
                // Fall through to default/null
            }
        }

        // 7. Default value if available
        if ($parameter->isDefaultValueAvailable()) {
            return $parameter->getDefaultValue();
        }

        // 8. Null if optional/nullable
        if ($parameter->isOptional() || $parameter->allowsNull()) {
            return null;
        }

        // 9. Cannot resolve — return null as last resort
        return null;
    }

    /**
     * Override in subclasses to provide default values by parameter name.
     * Return a single-element array [$value] if found, or empty array [] if not.
     * The wrapping distinguishes "resolved to null" from "not found".
     *
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return [];
    }

    /**
     * Override in subclasses to provide default values by type-hint class name.
     * Return a single-element array [$value] if found, or empty array [] if not.
     *
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    {
        return [];
    }

    /**
     * Check if a value is a Closure that has a parameter with the given name.
     */
    public static function evaluationValueIsFunctionAndHasParameter(mixed $value, string $parameterName): bool
    {
        if (! $value instanceof Closure) {
            return false;
        }

        foreach ((new ReflectionFunction($value))->getParameters() as $parameter) {
            if ($parameter->getName() === $parameterName) {
                return true;
            }
        }

        return false;
    }

    /**
     * Extract the class name from a typed reflection parameter.
     */
    protected function getTypedReflectionParameterClassName(ReflectionParameter $parameter): ?string
    {
        $type = $parameter->getType();

        if (! $type instanceof ReflectionNamedType) {
            return null;
        }

        if ($type->isBuiltin()) {
            return null;
        }

        $name = $type->getName();

        $class = $parameter->getDeclaringClass();

        if ($class === null) {
            return $name;
        }

        if ($name === 'self') {
            return $class->getName();
        }

        if ($name === 'parent' && ($parent = $class->getParentClass())) {
            return $parent->getName();
        }

        return $name;
    }
}
