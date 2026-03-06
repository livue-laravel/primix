<?php

namespace Primix\MultiTenant\Events\Tenancy;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TenancyEnded
{
    use Dispatchable, SerializesModels;
}
