<?php

use Primix\Forms\Components\Fields\TextInput;

it('has text type by default', function () {
    $field = TextInput::make('name');

    expect($field->getType())->toBe('text');
});

it('can set email type', function () {
    $field = TextInput::make('email')->email();

    expect($field->getType())->toBe('email');
    expect($field->getInputMode())->toBe('email');
});

it('can set password type', function () {
    $field = TextInput::make('password')->password();

    expect($field->getType())->toBe('password');
});

it('can set tel type', function () {
    $field = TextInput::make('phone')->tel();

    expect($field->getType())->toBe('tel');
    expect($field->getInputMode())->toBe('tel');
});

it('can set url type', function () {
    $field = TextInput::make('website')->url();

    expect($field->getType())->toBe('url');
    expect($field->getInputMode())->toBe('url');
});

it('can set numeric input mode', function () {
    $field = TextInput::make('price')->numeric();

    expect($field->getType())->toBe('text');
    expect($field->getInputMode())->toBe('decimal');
});

it('can set integer input mode', function () {
    $field = TextInput::make('quantity')->integer();

    expect($field->getType())->toBe('text');
    expect($field->getInputMode())->toBe('numeric');
});

it('can set mask', function () {
    $field = TextInput::make('phone')->mask('(999) 999-9999');

    expect($field->getMask())->toBe('(999) 999-9999');
});

it('has no mask by default', function () {
    $field = TextInput::make('name');

    expect($field->getMask())->toBeNull();
});

it('applies default ipv4 mask when using ipv4 rule', function () {
    $field = TextInput::make('address')->ipv4();

    expect($field->getMask())->toBe('999.999.999.999');
});

it('does not override custom mask when using ipv4 rule', function () {
    $field = TextInput::make('address')->mask('99-99')->ipv4();

    expect($field->getMask())->toBe('99-99');
});

it('removes default ipv4 mask when switching to ipv6 rule', function () {
    $field = TextInput::make('address')->ipv4()->ipv6();

    expect($field->getMask())->toBeNull();
});

it('can be revealable when password', function () {
    $field = TextInput::make('password')->password()->revealable();

    expect($field->isRevealable())->toBeTrue();
});

it('is not revealable when not password', function () {
    $field = TextInput::make('name')->revealable();

    expect($field->isRevealable())->toBeFalse();
});

it('is not revealable by default', function () {
    $field = TextInput::make('password')->password();

    expect($field->isRevealable())->toBeFalse();
});

it('returns default autocomplete for password', function () {
    $field = TextInput::make('password')->password();

    expect($field->getAutocomplete())->toBe('current-password');
});

it('returns default autocomplete for email', function () {
    $field = TextInput::make('email')->email();

    expect($field->getAutocomplete())->toBe('email');
});

it('returns default autocomplete for tel', function () {
    $field = TextInput::make('phone')->tel();

    expect($field->getAutocomplete())->toBe('tel');
});

it('returns null autocomplete for text', function () {
    $field = TextInput::make('name');

    expect($field->getAutocomplete())->toBeNull();
});

it('can set custom autocomplete', function () {
    $field = TextInput::make('name')->autocomplete('given-name');

    expect($field->getAutocomplete())->toBe('given-name');
});

it('custom autocomplete overrides default', function () {
    $field = TextInput::make('password')->password()->autocomplete('new-password');

    expect($field->getAutocomplete())->toBe('new-password');
});

it('can set prefix', function () {
    $field = TextInput::make('price')->prefix('$');

    expect($field->getPrefix())->toBe('$');
});

it('can set suffix', function () {
    $field = TextInput::make('weight')->suffix('kg');

    expect($field->getSuffix())->toBe('kg');
});

it('can set prefix icon', function () {
    $field = TextInput::make('email')->prefixIcon('heroicon-o-envelope');

    expect($field->getPrefixIcon())->toBe('heroicon-o-envelope');
});

it('can set suffix icon', function () {
    $field = TextInput::make('search')->suffixIcon('heroicon-o-magnifying-glass');

    expect($field->getSuffixIcon())->toBe('heroicon-o-magnifying-glass');
});

it('can set max length', function () {
    $field = TextInput::make('title')->maxLength(255);

    expect($field->getMaxLength())->toBe(255);
});

it('can set min length', function () {
    $field = TextInput::make('title')->minLength(3);

    expect($field->getMinLength())->toBe(3);
});

it('can be autofocused', function () {
    $field = TextInput::make('title')->autofocus();

    expect($field->isAutofocused())->toBeTrue();
});

it('can be readonly', function () {
    $field = TextInput::make('title')->readonly();

    expect($field->isReadOnly())->toBeTrue();
});

it('returns correct view', function () {
    $field = TextInput::make('title');

    expect($field->getView())->toBe('primix-forms::components.fields.text-input');
});

it('returns default variant view', function () {
    $field = TextInput::make('title');

    expect($field->getVariantView())->toBe('primix-forms::components.fields.text-input.default');
});

it('returns otp variant view', function () {
    $field = TextInput::make('code')->otp();

    expect($field->getVariantView())->toBe('primix-forms::components.fields.text-input.otp');
});

it('returns password-strength variant view', function () {
    $field = TextInput::make('password')->password()->passwordStrength();

    expect($field->getVariantView())->toBe('primix-forms::components.fields.text-input.password-strength');
});

it('returns spin-buttons variant view', function () {
    $field = TextInput::make('amount')->spinButtons();

    expect($field->getVariantView())->toBe('primix-forms::components.fields.text-input.spin-buttons');
});

it('returns complete vue props', function () {
    $field = TextInput::make('email')
        ->email()
        ->prefix('mailto:')
        ->suffixIcon('heroicon-o-envelope')
        ->maxLength(255)
        ->autofocus()
        ->readonly();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('type', 'email')
        ->toHaveKey('prefix', 'mailto:')
        ->toHaveKey('suffixIcon', 'heroicon-o-envelope')
        ->toHaveKey('maxLength', 255)
        ->toHaveKey('autofocus', true)
        ->toHaveKey('readonly', true)
        ->toHaveKey('inputMode', 'email')
        ->toHaveKey('autocomplete', 'email')
        ->toHaveKey('mask')
        ->toHaveKey('revealable');
});

it('can be otp', function () {
    $field = TextInput::make('code')->otp();

    expect($field->isOtp())->toBeTrue();
    expect($field->getOtpLength())->toBe(6);
});

it('can set otp length', function () {
    $field = TextInput::make('code')->otp(4);

    expect($field->isOtp())->toBeTrue();
    expect($field->getOtpLength())->toBe(4);
});

it('is not otp by default', function () {
    $field = TextInput::make('code');

    expect($field->isOtp())->toBeFalse();
});

it('can have password strength', function () {
    $field = TextInput::make('password')->password()->passwordStrength();

    expect($field->hasPasswordStrength())->toBeTrue();
});

it('does not have password strength by default', function () {
    $field = TextInput::make('password')->password();

    expect($field->hasPasswordStrength())->toBeFalse();
});

it('can have spin buttons', function () {
    $field = TextInput::make('quantity')->spinButtons();

    expect($field->hasSpinButtons())->toBeTrue();
});

it('does not have spin buttons by default', function () {
    $field = TextInput::make('quantity');

    expect($field->hasSpinButtons())->toBeFalse();
});

it('can set currency mode', function () {
    $field = TextInput::make('price')->currency('USD', 'en-US');

    expect($field->hasSpinButtons())->toBeTrue();
    expect($field->getNumberMode())->toBe('currency');
    expect($field->getCurrencyCode())->toBe('USD');
    expect($field->getCurrencyLocale())->toBe('en-US');
});

it('can set number step', function () {
    $field = TextInput::make('quantity')->spinButtons()->numberStep(5);

    expect($field->getNumberStep())->toBe(5);
});

it('can set button layout', function () {
    $field = TextInput::make('quantity')->spinButtons()->buttonLayout('horizontal');

    expect($field->getButtonLayout())->toBe('horizontal');
});

it('includes spin buttons props in vue props', function () {
    $field = TextInput::make('price')->currency('EUR', 'it-IT');

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('otp', false)
        ->toHaveKey('spinButtons', true)
        ->toHaveKey('numberMode', 'currency')
        ->toHaveKey('currencyCode', 'EUR')
        ->toHaveKey('currencyLocale', 'it-IT');
});

// === Auto-Validation Rules ===

it('adds email auto-rule', function () {
    $field = TextInput::make('email')->email();

    expect($field->getRules())->toBe('email');
});

it('adds url auto-rule', function () {
    $field = TextInput::make('website')->url();

    expect($field->getRules())->toBe('url');
});

it('adds numeric auto-rule', function () {
    $field = TextInput::make('price')->numeric();

    expect($field->getRules())->toBe('numeric');
});

it('adds integer auto-rule', function () {
    $field = TextInput::make('quantity')->integer();

    expect($field->getRules())->toBe('integer');
});

it('does not add auto-rule for password', function () {
    $field = TextInput::make('password')->password();

    expect($field->getRules())->toBeNull();
});

it('does not add auto-rule for tel', function () {
    $field = TextInput::make('phone')->tel();

    expect($field->getRules())->toBeNull();
});

it('adds maxLength auto-rule for text', function () {
    $field = TextInput::make('title')->maxLength(255);

    expect($field->getRules())->toBe('max:255');
});

it('adds minLength auto-rule for text', function () {
    $field = TextInput::make('title')->minLength(3);

    expect($field->getRules())->toBe('min:3');
});

it('adds both maxLength and minLength auto-rules', function () {
    $field = TextInput::make('title')->minLength(3)->maxLength(255);

    expect($field->getRules())->toBe('max:255|min:3');
});

it('does not add maxLength auto-rule for numeric field', function () {
    $field = TextInput::make('price')->numeric()->maxLength(10);

    expect($field->getRules())->toBe('numeric');
});

it('does not add minLength auto-rule for numeric field', function () {
    $field = TextInput::make('quantity')->integer()->minLength(1);

    expect($field->getRules())->toBe('integer');
});

it('does not add maxLength/minLength auto-rules for integer field', function () {
    $field = TextInput::make('quantity')->integer()->minLength(1)->maxLength(10);

    expect($field->getRules())->toBe('integer');
});

it('combines required + email auto-rule + custom rules', function () {
    $field = TextInput::make('email')->email()->required()->rules('max:255');

    expect($field->getRules())->toBe('required|email|max:255');
});

it('combines required + numeric auto-rule + maxLength ignored', function () {
    $field = TextInput::make('price')->numeric()->required()->maxLength(10);

    expect($field->getRules())->toBe('required|numeric');
});

it('combines email auto-rule + maxLength auto-rule', function () {
    $field = TextInput::make('email')->email()->maxLength(255);

    expect($field->getRules())->toBe('email|max:255');
});

it('withoutAutoRules disables email auto-rule', function () {
    $field = TextInput::make('email')->email()->withoutAutoRules();

    expect($field->getRules())->toBeNull();
});

it('withoutAutoRules disables numeric auto-rule but keeps dedicated rules', function () {
    $field = TextInput::make('price')->numeric()->withoutAutoRules()->nullable();

    expect($field->getRules())->toBe('nullable');
});
