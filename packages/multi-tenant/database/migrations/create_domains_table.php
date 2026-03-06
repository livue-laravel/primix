<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $tenantTable = config('multi-tenant.tenant_table', 'tenants');
        $domainTable = config('multi-tenant.domain_table', 'domains');

        Schema::create($domainTable, function (Blueprint $table) use ($tenantTable) {
            $table->id();
            $table->string('domain')->unique();
            $table->foreignId('tenant_id')->constrained($tenantTable)->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('multi-tenant.domain_table', 'domains'));
    }
};
