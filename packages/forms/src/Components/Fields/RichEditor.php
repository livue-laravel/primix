<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class RichEditor extends Field
{
    protected array|Closure $toolbarButtons = [
        'bold', 'italic', 'underline', 'strike',
        '|',
        'heading',
        'bulletList', 'orderedList',
        '|',
        'link', 'blockquote', 'codeBlock',
        '|',
        'undo', 'redo',
    ];

    protected array|Closure $disabledToolbarButtons = [];

    protected int|Closure|null $maxLength = null;

    protected string|Closure|null $editorHeight = null;

    protected bool|Closure $markdown = false;

    public function toolbarButtons(array|Closure $buttons): static
    {
        $this->toolbarButtons = $buttons;

        return $this;
    }

    public function disableToolbarButtons(array|Closure $buttons): static
    {
        $this->disabledToolbarButtons = $buttons;

        return $this;
    }

    public function maxLength(int|Closure|null $length): static
    {
        $this->maxLength = $length;

        return $this;
    }

    public function editorHeight(string|Closure|null $height): static
    {
        $this->editorHeight = $height;

        return $this;
    }

    public function markdown(bool|Closure $condition = true): static
    {
        $this->markdown = $condition;

        return $this;
    }

    public function getToolbarButtons(): array
    {
        $buttons = $this->evaluate($this->toolbarButtons);

        if ($this->isMarkdown()) {
            $buttons = array_values(array_filter($buttons, fn (string $button): bool => $button !== 'underline'));
        }

        return $buttons;
    }

    public function getDisabledToolbarButtons(): array
    {
        return $this->evaluate($this->disabledToolbarButtons);
    }

    public function getMaxLength(): ?int
    {
        return $this->evaluate($this->maxLength);
    }

    public function getEditorHeight(): ?string
    {
        return $this->evaluate($this->editorHeight);
    }

    public function isMarkdown(): bool
    {
        return (bool) $this->evaluate($this->markdown);
    }

    protected function getAutoRules(): array
    {
        $rules = [];

        $maxLength = $this->getMaxLength();
        if ($maxLength !== null) {
            $rules[] = 'max:' . $maxLength;
        }

        return $rules;
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.rich-editor';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'toolbarButtons' => $this->getToolbarButtons(),
            'disabledToolbarButtons' => $this->getDisabledToolbarButtons(),
            'maxLength' => $this->getMaxLength(),
            'editorHeight' => $this->getEditorHeight(),
            'markdown' => $this->isMarkdown(),
        ]);
    }
}
