<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\CanBeAutofocused;
use Primix\Forms\Concerns\CanBeReadOnly;
use Primix\Forms\Concerns\HasMaxLength;
use Primix\Forms\Concerns\HasRows;

class Textarea extends Field
{
    use CanBeAutofocused;
    use CanBeReadOnly;
    use HasMaxLength;
    use HasRows;

    protected bool|Closure $autosize = false;

    protected function setUp(): void
    {
        parent::setUp();

        $this->rows(3);
    }

    public function autosize(bool|Closure $condition = true): static
    {
        $this->autosize = $condition;

        return $this;
    }

    public function isAutosize(): bool
    {
        return (bool) $this->evaluate($this->autosize);
    }

    protected function getUnwrappedStyle(): array
    {
        return [
            'textarea' => ['style' => 'border: 0; background: transparent; box-shadow: none;'],
        ];
    }

    protected function getAutoRules(): array
    {
        $rules = [];

        $maxLength = $this->getMaxLength();
        if ($maxLength !== null) {
            $rules[] = 'max:' . $maxLength;
        }

        $minLength = $this->getMinLength();
        if ($minLength !== null) {
            $rules[] = 'min:' . $minLength;
        }

        return $rules;
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.textarea';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'rows' => $this->getRows(),
            'maxLength' => $this->getMaxLength(),
            'minLength' => $this->getMinLength(),
            'autofocus' => $this->isAutofocused(),
            'readonly' => $this->isReadOnly(),
            'autosize' => $this->isAutosize(),
        ]);
    }
}
