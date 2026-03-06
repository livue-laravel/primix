<?php

namespace Primix\Widgets;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Primix\Tables\HasTable;
use Primix\Tables\Table;

abstract class TableWidget extends Widget
{
    use HasTable;

    protected ?string $heading = null;

    protected ?string $description = null;

    protected int|string|array|\Closure|null $columnSpan = 'full';

    protected function getTableRecordLimit(): ?int
    {
        return null;
    }

    public function getTableRecords(): LengthAwarePaginator
    {
        $table = $this->getTable();
        $query = $this->getFilteredTableQuery();

        if ($table->isGrouped()) {
            $query->orderBy($table->getGroup()->getColumn());
        }

        if ($this->tableSortColumn) {
            $query->orderBy($this->tableSortColumn, $this->tableSortDirection);
        } elseif ($table->isReorderable()) {
            $query->orderBy($table->getOrderColumn());
        }

        $limit = $this->getTableRecordLimit();

        if ($limit !== null) {
            $records = $query->limit($limit)->get();

            return new LengthAwarePaginator(
                $records, $records->count(), $limit, 1
            );
        }

        return $this->paginate($query, $this->tablePerPage);
    }

    protected function resolveActionRecord(mixed $key): ?Model
    {
        $table = $this->getTable();
        $query = clone $table->getQuery();

        return $query->where($table->getRecordKeyName(), $key)->first();
    }

    public function getHeading(): ?string
    {
        return $this->heading;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    protected function render(): string
    {
        return 'primix-widgets::table-widget';
    }
}
