<?php

namespace Primix\Support\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Primix\Support\Concerns\HasPrimixCasts;
use Primix\Support\Concerns\HasPrimixColumnIntrospection;
use Primix\Support\Concerns\HasPrimixPolicyConventions;
use Primix\Support\Concerns\HasPrimixQueryScopes;
use Primix\Support\Concerns\HasPrimixSearchMetadata;
use Primix\Support\Concerns\HasPrimixTenancyScope;

abstract class Model extends EloquentModel
{
    use HasPrimixCasts;
    use HasPrimixColumnIntrospection;
    use HasPrimixPolicyConventions;
    use HasPrimixQueryScopes;
    use HasPrimixSearchMetadata;
    use HasPrimixTenancyScope;
}
