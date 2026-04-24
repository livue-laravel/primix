<?php

namespace Primix\Resources\Pages;

use Illuminate\Database\Eloquent\Model;
use Primix\Actions\Action;
use Primix\Details\Components\Entries\BooleanEntry;
use Primix\Details\Components\Entries\ColorEntry;
use Primix\Details\Components\Entries\Entry as DetailEntry;
use Primix\Details\Components\Entries\HtmlEntry;
use Primix\Details\Components\Entries\ListEntry;
use Primix\Details\Components\Entries\LongTextEntry;
use Primix\Details\Components\Entries\TextEntry;
use Primix\Details\Details;
use Primix\Details\HasDetails;
use Primix\Forms\Components\Fields\Checkbox;
use Primix\Forms\Components\Fields\CheckboxList;
use Primix\Forms\Components\Fields\ColorPicker;
use Primix\Forms\Components\Fields\Field;
use Primix\Forms\Components\Fields\OrderList;
use Primix\Forms\Components\Fields\PickList;
use Primix\Forms\Components\Fields\Repeater;
use Primix\Forms\Components\Fields\RichEditor;
use Primix\Forms\Components\Fields\TagsInput;
use Primix\Forms\Components\Fields\Textarea;
use Primix\Forms\Components\Fields\Toggle;
use Primix\Forms\Form;
use Primix\Resources\Resource;
use Primix\Resources\Actions\DeleteAction;
use Primix\Resources\Actions\ForceDeleteAction;
use Primix\Resources\Actions\RestoreAction;
use Primix\Resources\Concerns\HasRelationManagers;

class ViewRecord extends Page
{
    use HasDetails;
    use HasRelationManagers;

    protected function getHeaderActions(): array
    {
        $resource = $this->resolveResource();

        return [
            Action::make('edit')
                ->label(__('primix::panel.actions.edit'))
                ->url(fn () => $resource::getUrl('edit', ['record' => $this->record])),
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }

    protected function configureAction(Action $action): void
    {
        match (true) {
            $action instanceof DeleteAction,
            $action instanceof ForceDeleteAction => $action->successRedirectUrl(
                fn () => $this->resolveResource()::getUrl('index')
            ),
            $action instanceof RestoreAction => $action->after(function () {
                $this->record->refresh();
                $this->data = $this->record->toArray();
            }),
            default => null,
        };
    }

    public ?Model $record = null;

    public array $data = [];

    public function mount(int|string $record): void
    {
        $this->resourceClass = static::getResource();
        $resource = $this->resourceClass;

        $routeKeyName = (new ($resource::getModel()))->getRouteKeyName();
        $this->record = $resource::getEloquentQuery()->where($routeKeyName, $record)->firstOrFail();

        if (! $resource::canView($this->record)) {
            abort(403);
        }

        $this->data = $this->record->toArray();
    }

    protected function details(Details $details): Details
    {
        $resource = $this->resolveResource();

        $details = $resource::details($details)
            ->statePath('data')
            ->record($this->record)
            ->model($this->record);

        if ($this->resourceDefinesCustomDetails($resource) || ! empty($details->getComponents())) {
            return $details;
        }

        $form = $resource::form(Form::make())
            ->statePath('data')
            ->model($this->record);

        $entries = [];

        foreach ($form->getLeafComponents() as $component) {
            if (! $component instanceof Field) {
                continue;
            }

            $statePath = $component->getStatePath();

            if ($statePath === null) {
                continue;
            }

            $entries[] = $this->makeEntryFromField($component, $statePath);
        }

        return $details->schema($entries);
    }

    protected function makeEntryFromField(Field $field, string $statePath): DetailEntry
    {
        $entry = match (true) {
            $this->fieldReturnsMultipleValues($field) => ListEntry::make($field->getName()),
            $field instanceof RichEditor => HtmlEntry::make($field->getName()),
            $field instanceof Textarea => LongTextEntry::make($field->getName()),
            $field instanceof Checkbox,
            $field instanceof Toggle => BooleanEntry::make($field->getName()),
            $field instanceof ColorPicker => ColorEntry::make($field->getName()),
            default => TextEntry::make($field->getName()),
        };

        $entry
            ->statePath($statePath)
            ->label($field->getLabel());

        if ($entry instanceof ListEntry && method_exists($field, 'getFilteredOptions')) {
            $entry->options($field->getFilteredOptions());
        }

        if ($entry instanceof TextEntry && method_exists($field, 'getFilteredOptions')) {
            $options = $field->getFilteredOptions();

            if (! empty($options)) {
                $entry->formatStateUsing(function (mixed $state) use ($options): mixed {
                    if ($state === null || $state === '') {
                        return $state;
                    }

                    if (array_key_exists($state, $options)) {
                        return $options[$state];
                    }

                    $stringKey = (string) $state;

                    return $options[$stringKey] ?? $state;
                });
            }
        }

        return $entry;
    }

    protected function fieldReturnsMultipleValues(Field $field): bool
    {
        if ($field instanceof CheckboxList
            || $field instanceof TagsInput
            || $field instanceof OrderList
            || $field instanceof PickList
            || $field instanceof Repeater) {
            return true;
        }

        return method_exists($field, 'isMultiple') && (bool) $field->isMultiple();
    }

    protected function resourceDefinesCustomDetails(string $resource): bool
    {
        $method = new \ReflectionMethod($resource, 'details');

        return $method->getDeclaringClass()->getName() !== Resource::class;
    }

    public function getTitle(): string
    {
        $resource = $this->resolveResource();
        $recordTitle = $resource::getRecordTitle($this->record);

        if (filled($recordTitle)) {
            return __('primix::panel.page_titles.view_record', ['record' => $recordTitle]);
        }

        return __('primix::panel.page_titles.view', ['model' => $resource::getModelLabel()]);
    }

    protected function render(): string
    {
        return 'primix::pages.view-record';
    }
}
