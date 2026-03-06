<?php

namespace Primix\Actions;

use Illuminate\Support\Collection;

class BulkAction extends Action
{
    protected ?Collection $records = null;

    public function records(Collection $records): static
    {
        $this->records = $records;

        return $this;
    }

    public function getRecords(): ?Collection
    {
        return $this->records;
    }

    public function getCallMethod(): string
    {
        return 'callBulkAction';
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'records' => [$this->getRecords()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    public function call(array $data = []): mixed
    {
        if ($this->action === null) {
            return null;
        }

        return $this->evaluate($this->action, [
            'data' => $data,
            'records' => $this->getRecords(),
        ]);
    }
}
