<?php

namespace Primix\MultiTenant\Tests\Fixtures;

use Illuminate\Database\Eloquent\Model;
use Primix\MultiTenant\Concerns\HasTenantRelationship;

class User extends Model
{
    use HasTenantRelationship;

    protected $guarded = [];
}
