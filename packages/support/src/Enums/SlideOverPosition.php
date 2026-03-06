<?php

namespace Primix\Support\Enums;

enum SlideOverPosition: string
{
    case Top = 'top';
    case Right = 'right';
    case Bottom = 'bottom';
    case Left = 'left';

    /**
     * Get the PrimeVue Dialog position value.
     */
    public function getDialogPosition(): string
    {
        return $this->value;
    }

    /**
     * Whether the slide-over stretches vertically (left/right).
     */
    public function isVertical(): bool
    {
        return in_array($this, [self::Left, self::Right]);
    }

    /**
     * Whether the slide-over stretches horizontally (top/bottom).
     */
    public function isHorizontal(): bool
    {
        return in_array($this, [self::Top, self::Bottom]);
    }

    /**
     * Get the PrimeVue Dialog transition pass-through for slide animation.
     *
     * Uses Tailwind classes compatible with PrimeVue 4's pt.transition section,
     * which maps to Vue's <Transition> component class props.
     */
    public function getTransitionPt(): array
    {
        $translateClass = match ($this) {
            self::Right => 'translate-x-full',
            self::Left => '-translate-x-full',
            self::Bottom => 'translate-y-full',
            self::Top => '-translate-y-full',
        };

        return [
            'enterFromClass' => $translateClass,
            'enterActiveClass' => 'transition-transform duration-300 ease-[cubic-bezier(0,0,0.2,1)]',
            'enterToClass' => '',
            'leaveFromClass' => '',
            'leaveActiveClass' => 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
            'leaveToClass' => $translateClass,
        ];
    }
}
