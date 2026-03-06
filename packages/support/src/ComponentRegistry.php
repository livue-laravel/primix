<?php

namespace Primix\Support;

use Closure;
use Primix\Support\Components\Component;
use ReflectionMethod;

class ComponentRegistry
{
    /**
     * @var array<class-string, array<Closure>>
     */
    protected array $configurations = [];

    /**
     * @var array<class-string, array<Closure>>
     */
    protected array $importantConfigurations = [];

    public function configureUsing(string $component, Closure $modifyUsing, ?Closure $during = null, bool $isImportant = false): mixed
    {
        if ($isImportant) {
            $this->importantConfigurations[$component] ??= [];
            $this->importantConfigurations[$component][] = $modifyUsing;
        } else {
            $this->configurations[$component] ??= [];
            $this->configurations[$component][] = $modifyUsing;
        }

        if (! $during) {
            $configurationKey = $isImportant
                ? array_key_last($this->importantConfigurations[$component])
                : array_key_last($this->configurations[$component]);

            return function () use ($component, $configurationKey, $isImportant): void {
                if ($isImportant) {
                    unset($this->importantConfigurations[$component][$configurationKey]);

                    return;
                }

                unset($this->configurations[$component][$configurationKey]);
            };
        }

        try {
            return $during();
        } finally {
            if ($isImportant) {
                array_pop($this->importantConfigurations[$component]);
            } else {
                array_pop($this->configurations[$component]);
            }
        }
    }

    public function configure(Component $component, Closure $setUp): void
    {
        $classesToConfigure = [...array_reverse(class_parents($component)), $component::class];
        $setUpMethodClass = (new ReflectionMethod($component, 'setUp'))->getDeclaringClass()->getName();

        foreach ($classesToConfigure as $classToConfigure) {
            if ($classToConfigure === $setUpMethodClass) {
                $setUp();
            }

            if (array_key_exists($classToConfigure, $this->configurations)) {
                foreach ($this->configurations[$classToConfigure] as $configure) {
                    $configure($component);
                }
            }
        }

        foreach ($classesToConfigure as $classToConfigure) {
            if (array_key_exists($classToConfigure, $this->importantConfigurations)) {
                foreach ($this->importantConfigurations[$classToConfigure] as $configure) {
                    $configure($component);
                }
            }
        }
    }
}
