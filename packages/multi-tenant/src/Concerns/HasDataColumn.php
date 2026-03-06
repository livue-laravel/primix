<?php

namespace Primix\MultiTenant\Concerns;

trait HasDataColumn
{
    public function getInternal(string $key): mixed
    {
        $data = $this->getAttribute('data') ?? [];

        return $data[$key] ?? null;
    }

    public function setInternal(string $key, mixed $value): static
    {
        $data = $this->getAttribute('data') ?? [];
        $data[$key] = $value;
        $this->setAttribute('data', $data);

        return $this;
    }

    /**
     * Proxy attribute access to the data column if no real attribute exists.
     */
    public function getAttribute($key)
    {
        if ($key === 'data') {
            return parent::getAttribute('data');
        }

        $value = parent::getAttribute($key);

        if ($value === null && ! array_key_exists($key, $this->attributes) && ! $this->hasGetMutator($key) && ! $this->isRelation($key)) {
            return $this->getInternal($key);
        }

        return $value;
    }

    /**
     * Proxy attribute setting to the data column if no real column exists.
     */
    public function setAttribute($key, $value)
    {
        if ($key === 'data' || in_array($key, $this->getDataColumnExcludedKeys())) {
            return parent::setAttribute($key, $value);
        }

        $columns = $this->getDataColumnExcludedKeys();

        if (in_array($key, $columns)) {
            return parent::setAttribute($key, $value);
        }

        // If it's a real column, use default behavior
        if ($this->getConnection()->getSchemaBuilder()->hasColumn($this->getTable(), $key)) {
            return parent::setAttribute($key, $value);
        }

        // Otherwise store in the data JSON column
        return $this->setInternal($key, $value);
    }

    /**
     * Keys that should NOT be stored in the data column.
     */
    protected function getDataColumnExcludedKeys(): array
    {
        return ['id', 'data', 'created_at', 'updated_at'];
    }

    /**
     * Initialize the HasDataColumn trait for the model.
     */
    public function initializeHasDataColumn(): void
    {
        $this->casts['data'] = 'array';
    }
}
