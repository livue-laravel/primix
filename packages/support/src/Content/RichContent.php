<?php

namespace Primix\Support\Content;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Str;
use Stringable;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;

class RichContent implements Htmlable, Stringable
{
    protected static ?HtmlSanitizer $sanitizer = null;

    protected bool $shouldSanitize = true;

    final protected function __construct(
        protected ?string $value,
        protected bool $isMarkdown = false,
    ) {
    }

    public static function html(?string $value): static
    {
        return new static($value);
    }

    public static function markdown(?string $value): static
    {
        return new static($value, isMarkdown: true);
    }

    public function sanitize(bool $condition = true): static
    {
        $this->shouldSanitize = $condition;

        return $this;
    }

    public function toHtml(): string
    {
        if ($this->value === null || $this->value === '') {
            return '';
        }

        if ($this->isMarkdown) {
            return Str::markdown($this->value, [
                'html_input' => $this->shouldSanitize ? 'strip' : 'allow',
                'allow_unsafe_links' => ! $this->shouldSanitize,
            ]);
        }

        if ($this->shouldSanitize) {
            return static::sanitizer()->sanitize($this->value);
        }

        return $this->value;
    }

    protected static function sanitizer(): HtmlSanitizer
    {
        // PHP_INT_MAX, not -1: Symfony truncates the input via substr()
        // with the configured length (default 20k would cut long content).
        return static::$sanitizer ??= new HtmlSanitizer(
            (new HtmlSanitizerConfig())
                ->allowSafeElements()
                ->withMaxInputLength(PHP_INT_MAX)
        );
    }

    public function __toString(): string
    {
        return $this->toHtml();
    }
}
