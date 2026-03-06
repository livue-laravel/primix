<?php

use Primix\Forms\Components\Fields\TextInput;

// We use TextInput as a concrete implementation of the abstract Field class

it('can be created with make', function () {
    $field = TextInput::make('title');

    expect($field)->toBeInstanceOf(TextInput::class);
    expect($field->getName())->toBe('title');
});

it('sets state path from name', function () {
    $field = TextInput::make('title');

    expect($field->getStatePath())->toBe('title');
});

it('can set a custom label', function () {
    $field = TextInput::make('title')->label('Post Title');

    expect($field->getLabel())->toBe('Post Title');
});

it('auto-generates label from name', function () {
    $field = TextInput::make('first_name');

    // HasName::getLabel() uses kebab→replace→ucfirst
    expect($field->getLabel())->toBe('First name');
});

it('can set placeholder', function () {
    $field = TextInput::make('title')->placeholder('Enter title...');

    expect($field->getPlaceholder())->toBe('Enter title...');
});

it('can set helper text', function () {
    $field = TextInput::make('title')->helperText('Max 255 characters');

    expect($field->getHelperText())->toBe('Max 255 characters');
});

it('can set hint', function () {
    $field = TextInput::make('title')->hint('Optional');

    expect($field->getHint())->toBe('Optional');
});

it('can be required', function () {
    $field = TextInput::make('title')->required();

    expect($field->isRequired())->toBeTrue();
    expect($field->getRules())->toBe('required');
});

it('is not required by default', function () {
    $field = TextInput::make('title');

    expect($field->isRequired())->toBeFalse();
});

it('can be disabled', function () {
    $field = TextInput::make('title')->disabled();

    expect($field->isDisabled())->toBeTrue();
});

it('is not disabled by default', function () {
    $field = TextInput::make('title');

    expect($field->isDisabled())->toBeFalse();
});

it('can be hidden', function () {
    $field = TextInput::make('title')->hidden();

    expect($field->isHidden())->toBeTrue();
});

it('can set string rules', function () {
    $field = TextInput::make('email')->rules('email|max:255');

    expect($field->getRules())->toBe('email|max:255');
});

it('can set array rules', function () {
    $field = TextInput::make('email')->rules(['email', 'max:255']);

    expect($field->getRules())->toBe('email|max:255');
});

it('combines required with custom rules', function () {
    $field = TextInput::make('email')->required()->rules('email|max:255');

    expect($field->getRules())->toBe('required|email|max:255');
});

it('returns null rules when none set', function () {
    $field = TextInput::make('title');

    expect($field->getRules())->toBeNull();
});

it('can set validation messages', function () {
    $messages = ['required' => 'Title is required'];
    $field = TextInput::make('title')->validationMessages($messages);

    expect($field->getValidationMessages())->toBe($messages);
});

it('can set default value', function () {
    $field = TextInput::make('status')->default('draft');

    expect($field->getDefaultValue())->toBe('draft');
});

it('can set column span', function () {
    $field = TextInput::make('title')->columnSpan(2);

    expect($field->getColumnSpan())->toBe(2);
});

it('can set column span full', function () {
    $field = TextInput::make('title')->columnSpanFull();

    expect($field->getColumnSpan())->toBe('full');
    expect($field->isColumnSpanFull())->toBeTrue();
});

it('can set id', function () {
    $field = TextInput::make('title')->id('custom-id');

    expect($field->getId())->toBe('custom-id');
});

it('can set watch immediate', function () {
    $field = TextInput::make('title')->watch();

    expect($field->isWatched())->toBeTrue();
    expect($field->getWatchMode())->toBe('immediate');
    expect($field->getWatchCallback())->toBeNull();
});

it('can set watch with callback', function () {
    $callback = fn () => null;
    $field = TextInput::make('title')->watch($callback);

    expect($field->isWatched())->toBeTrue();
    expect($field->getWatchCallback())->toBe($callback);
});

it('can set watch debounce', function () {
    $field = TextInput::make('title')->watchDebounce(ms: 500);

    expect($field->isWatched())->toBeTrue();
    expect($field->getWatchMode())->toBe('debounce');
    expect($field->getWatchDebounceMs())->toBe(500);
});

it('can set watch blur', function () {
    $field = TextInput::make('title')->watchBlur();

    expect($field->isWatched())->toBeTrue();
    expect($field->getWatchMode())->toBe('blur');
});

it('is not watched by default', function () {
    $field = TextInput::make('title');

    expect($field->isWatched())->toBeFalse();
});

it('generates correct watch directive for immediate', function () {
    $field = TextInput::make('title')->watch();

    expect($field->getWatchDirective())->toBe('data-watch-path="title" v-watch');
});

it('generates correct watch directive for debounce', function () {
    $field = TextInput::make('title')->watchDebounce(ms: 500);

    expect($field->getWatchDirective())->toBe('data-watch-path="title" v-watch.debounce.500ms');
});

it('generates correct watch directive for blur', function () {
    $field = TextInput::make('title')->watchBlur();

    expect($field->getWatchDirective())->toBe('data-watch-path="title" v-watch.blur');
});

it('returns empty watch directive when not watched', function () {
    $field = TextInput::make('title');

    expect($field->getWatchDirective())->toBe('');
});

it('returns correct wrapper view', function () {
    $field = TextInput::make('title');

    expect($field->getWrapperView())->toBe('primix-forms::components.field-wrapper');
});

it('returns base vue props', function () {
    $field = TextInput::make('title')
        ->label('Title')
        ->placeholder('Enter...')
        ->required()
        ->disabled();

    $props = $field->toVueProps();

    expect($props)->toHaveKey('name', 'title')
        ->toHaveKey('statePath', 'title')
        ->toHaveKey('label', 'Title')
        ->toHaveKey('placeholder', 'Enter...')
        ->toHaveKey('required', true)
        ->toHaveKey('disabled', true);
});

it('can use fluent chaining', function () {
    $field = TextInput::make('title')
        ->label('Title')
        ->placeholder('Enter...')
        ->helperText('Help')
        ->hint('Hint')
        ->required()
        ->rules('max:255')
        ->columnSpan(2)
        ->id('my-field');

    expect($field->getName())->toBe('title');
    expect($field->getLabel())->toBe('Title');
    expect($field->getPlaceholder())->toBe('Enter...');
    expect($field->getHelperText())->toBe('Help');
    expect($field->getHint())->toBe('Hint');
    expect($field->isRequired())->toBeTrue();
    expect($field->getRules())->toBe('required|max:255');
    expect($field->getColumnSpan())->toBe(2);
    expect($field->getId())->toBe('my-field');
});

// === Auto-Validation Rules ===

it('can set nullable rule', function () {
    $field = TextInput::make('name')->nullable();

    expect($field->getRules())->toBe('nullable');
});

it('can remove nullable rule', function () {
    $field = TextInput::make('name')->nullable()->nullable(false);

    expect($field->getRules())->toBeNull();
});

it('can set unique rule', function () {
    $field = TextInput::make('email')->unique('users');

    expect($field->getRules())->toBe('unique:users');
});

it('can set unique rule with column', function () {
    $field = TextInput::make('email')->unique('users', 'email_address');

    expect($field->getRules())->toBe('unique:users,email_address');
});

it('can set unique rule with ignore', function () {
    $field = TextInput::make('email')->unique('users', 'email', 1);

    expect($field->getRules())->toBe('unique:users,email,1');
});

it('can set exists rule', function () {
    $field = TextInput::make('category_id')->exists('categories');

    expect($field->getRules())->toBe('exists:categories');
});

it('can set exists rule with column', function () {
    $field = TextInput::make('category_id')->exists('categories', 'id');

    expect($field->getRules())->toBe('exists:categories,id');
});

it('can set confirmed rule', function () {
    $field = TextInput::make('password')->confirmed();

    expect($field->getRules())->toBe('confirmed');
});

it('can set regex rule', function () {
    $field = TextInput::make('code')->regex('/^[A-Z]{3}$/');

    expect($field->getRules())->toBe('regex:/^[A-Z]{3}$/');
});

it('can set ip rule', function () {
    $field = TextInput::make('address')->ip();

    expect($field->getRules())->toBe('ip');
});

it('can set ipv4 rule', function () {
    $field = TextInput::make('address')->ipv4();

    expect($field->getRules())->toBe('ipv4');
});

it('can set ipv6 rule', function () {
    $field = TextInput::make('address')->ipv6();

    expect($field->getRules())->toBe('ipv6');
});

it('ipv6 overrides ipv4 dedicated rule', function () {
    $field = TextInput::make('address')->ipv4()->ipv6();

    expect($field->getRules())->toBe('ipv6');
});

it('can set json rule', function () {
    $field = TextInput::make('data')->json();

    expect($field->getRules())->toBe('json');
});

it('can set uuid rule', function () {
    $field = TextInput::make('token')->uuid();

    expect($field->getRules())->toBe('uuid');
});

it('does not expose inclusion rules on text input', function () {
    expect(method_exists(TextInput::class, 'in'))->toBeFalse()
        ->and(method_exists(TextInput::class, 'notIn'))->toBeFalse();
});

it('can set minValue rule', function () {
    $field = TextInput::make('age')->minValue(18);

    expect($field->getRules())->toBe('min:18');
});

it('can set maxValue rule', function () {
    $field = TextInput::make('age')->maxValue(120);

    expect($field->getRules())->toBe('max:120');
});

it('can set length rule', function () {
    $field = TextInput::make('code')->length(6);

    expect($field->getRules())->toBe('size:6');
});

it('can disable auto rules with withoutAutoRules', function () {
    $field = TextInput::make('email')->email()->withoutAutoRules();

    expect($field->getRules())->toBeNull();
});

it('can re-enable auto rules with withoutAutoRules(false)', function () {
    $field = TextInput::make('email')->email()->withoutAutoRules()->withoutAutoRules(false);

    expect($field->getRules())->toBe('email');
});

it('deduplicates rules', function () {
    $field = TextInput::make('email')->email()->rules('email');

    expect($field->getRules())->toBe('email');
});

it('combines required + dedicated + custom rules', function () {
    $field = TextInput::make('email')
        ->required()
        ->nullable()
        ->unique('users')
        ->rules('max:255');

    expect($field->getRules())->toBe('required|nullable|unique:users|max:255');
});

it('combines required + auto + dedicated + custom rules', function () {
    $field = TextInput::make('email')
        ->email()
        ->required()
        ->unique('users')
        ->rules('max:255');

    expect($field->getRules())->toBe('required|email|unique:users|max:255');
});
