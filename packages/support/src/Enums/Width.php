<?php

namespace Primix\Support\Enums;

enum Width: string
{
    case ExtraSmall = 'max-w-xs';
    case Small = 'max-w-sm';
    case Medium = 'max-w-md';
    case Large = 'max-w-lg';
    case ExtraLarge = 'max-w-xl';
    case TwoExtraLarge = 'max-w-2xl';
    case ThreeExtraLarge = 'max-w-3xl';
    case FourExtraLarge = 'max-w-4xl';
    case FiveExtraLarge = 'max-w-5xl';
    case SixExtraLarge = 'max-w-6xl';
    case SevenExtraLarge = 'max-w-7xl';
    case Full = 'max-w-full';
    case ScreenTwoExtraLarge = 'max-w-screen-2xl';
}
