<?php

namespace Primix\Support\Components;

use Illuminate\Support\Traits\Conditionable;
use Illuminate\Support\Traits\Tappable;
use Primix\Support\Concerns\Configurable;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasExtraAttributes;

abstract class Component
{
    use Conditionable;
    use Configurable;
    use EvaluatesClosures;
    use HasExtraAttributes;
    use Tappable;
}
