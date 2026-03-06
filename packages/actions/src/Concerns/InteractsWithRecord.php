<?php

namespace Primix\Actions\Concerns;

use Illuminate\Database\Eloquent\Model;

trait InteractsWithRecord
{
    protected mixed $record = null;

    protected ?string $recordTitle = null;

    public function record(mixed $record): static
    {
        $this->record = $record;

        return $this;
    }

    public function getRecord(): mixed
    {
        return $this->record;
    }

    public function recordTitle(?string $title): static
    {
        $this->recordTitle = $title;

        return $this;
    }

    public function getRecordTitle(): ?string
    {
        if ($this->recordTitle !== null) {
            return $this->recordTitle;
        }

        $record = $this->getRecord();

        if ($record instanceof Model) {
            return $record->getKey();
        }

        return null;
    }
}
