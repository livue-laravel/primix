<?php

use Illuminate\Support\Facades\Blade;
use Primix\Support\Content\RichContent;

it('renders empty string for null and empty values', function () {
    expect(RichContent::html(null)->toHtml())->toBe('')
        ->and(RichContent::markdown('')->toHtml())->toBe('');
});

it('converts markdown to html', function () {
    expect(RichContent::markdown('# Title')->toHtml())->toContain('<h1>Title</h1>');
});

it('strips raw html from markdown by default', function () {
    $result = RichContent::markdown('**bold** <script>alert(1)</script>')->toHtml();

    expect($result)->not->toContain('<script>')
        ->and($result)->toContain('<strong>bold</strong>');
});

it('allows raw html in markdown when sanitization is disabled', function () {
    expect(RichContent::markdown('hello <em>world</em>')->sanitize(false)->toHtml())->toContain('<em>world</em>');
});

it('sanitizes html content by default', function () {
    $result = RichContent::html('<p>ok</p><script>alert(1)</script>')->toHtml();

    expect($result)->not->toContain('<script>')
        ->and($result)->toContain('<p>ok</p>');
});

it('removes event handler attributes from html', function () {
    $result = RichContent::html('<p onclick="x()">ok</p>')->toHtml();

    expect($result)->not->toContain('onclick')
        ->and($result)->toContain('ok');
});

it('keeps html untouched when sanitization is disabled', function () {
    expect(RichContent::html('<p onclick="x()">ok</p>')->sanitize(false)->toHtml())->toBe('<p onclick="x()">ok</p>');
});

it('casts to string', function () {
    expect((string) RichContent::markdown('*hi*'))->toContain('<em>hi</em>');
});

it('renders via the blade component', function () {
    $result = Blade::render('<x-primix::content :value="$value" markdown class="prose" />', ['value' => '# Hello']);

    expect($result)->toContain('<h1>Hello</h1>')
        ->and($result)->toContain('prose')
        ->and($result)->toContain('primix-rich-content');
});
