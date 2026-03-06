<?php

namespace Primix\MultiTenant\Tests\Fixtures;

use Illuminate\Database\Eloquent\Model;
use Primix\MultiTenant\Concerns\BelongsToTenant;

class Post extends Model
{
    use BelongsToTenant;

    protected $guarded = [];
}
