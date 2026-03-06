<?php

namespace Primix\MultiTenant\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

interface DomainContract
{
    /**
     * Get the tenant that owns this domain.
     */
    public function tenant(): BelongsTo;
}
