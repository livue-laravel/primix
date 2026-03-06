<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\CanBeAutofocused;
use Primix\Forms\Concerns\CanBeReadOnly;
use Primix\Forms\Concerns\HasAffixes;
use Primix\Forms\Concerns\HasInputMode;
use Primix\Forms\Concerns\HasMaxLength;
use Primix\Forms\Concerns\HasTextValidationRules;

class TextInput extends Field
{
    use CanBeAutofocused;
    use CanBeReadOnly;
    use HasAffixes;
    use HasInputMode;
    use HasMaxLength;
    use HasTextValidationRules;

    protected string $type = 'text';

    protected ?string $mask = null;

    protected ?string $datalistOptions = null;

    protected bool $isRevealable = false;

    protected ?string $autocomplete = null;

    protected bool|Closure $isOtp = false;

    protected int|Closure $otpLength = 6;

    protected bool|Closure $hasPasswordStrength = false;

    protected bool|Closure $hasSpinButtons = false;

    protected string|Closure|null $numberMode = null;

    protected string|Closure|null $currencyCode = null;

    protected string|Closure|null $currencyLocale = null;

    protected int|float|Closure|null $numberStep = null;

    protected string|Closure|null $buttonLayout = null;

    public function email(): static
    {
        $this->type = 'email';
        $this->inputMode('email');

        return $this;
    }

    public function password(): static
    {
        $this->type = 'password';

        return $this;
    }

    public function revealable(bool $condition = true): static
    {
        $this->isRevealable = $condition;

        return $this;
    }

    public function isRevealable(): bool
    {
        return $this->isRevealable && $this->type === 'password';
    }

    public function tel(): static
    {
        $this->type = 'tel';
        $this->inputMode('tel');

        return $this;
    }

    public function url(): static
    {
        $this->type = 'url';
        $this->inputMode('url');

        return $this;
    }

    public function numeric(): static
    {
        $this->type = 'text';
        $this->inputMode('decimal');

        return $this;
    }

    public function integer(): static
    {
        $this->type = 'text';
        $this->inputMode('numeric');

        return $this;
    }

    public function autocomplete(?string $autocomplete): static
    {
        $this->autocomplete = $autocomplete;

        return $this;
    }

    public function getAutocomplete(): ?string
    {
        if ($this->autocomplete !== null) {
            return $this->autocomplete;
        }

        return match ($this->type) {
            'password' => 'current-password',
            'email' => 'email',
            'tel' => 'tel',
            default => null,
        };
    }

    public function otp(int|Closure $length = 6): static
    {
        $this->isOtp = true;
        $this->otpLength = $length;

        return $this;
    }

    public function isOtp(): bool
    {
        return (bool) $this->evaluate($this->isOtp);
    }

    public function getOtpLength(): int
    {
        return (int) $this->evaluate($this->otpLength);
    }

    public function passwordStrength(bool|Closure $condition = true): static
    {
        $this->hasPasswordStrength = $condition;

        return $this;
    }

    public function hasPasswordStrength(): bool
    {
        return (bool) $this->evaluate($this->hasPasswordStrength);
    }

    public function spinButtons(bool|Closure $condition = true): static
    {
        $this->hasSpinButtons = $condition;

        return $this;
    }

    public function currency(string $code, ?string $locale = null): static
    {
        $this->hasSpinButtons = true;
        $this->numberMode = 'currency';
        $this->currencyCode = $code;
        $this->currencyLocale = $locale;

        return $this;
    }

    public function numberStep(int|float|Closure $step): static
    {
        $this->numberStep = $step;

        return $this;
    }

    public function buttonLayout(string|Closure $layout): static
    {
        $this->buttonLayout = $layout;

        return $this;
    }

    public function hasSpinButtons(): bool
    {
        return (bool) $this->evaluate($this->hasSpinButtons);
    }

    public function getNumberMode(): ?string
    {
        return $this->evaluate($this->numberMode);
    }

    public function getCurrencyCode(): ?string
    {
        return $this->evaluate($this->currencyCode);
    }

    public function getCurrencyLocale(): ?string
    {
        return $this->evaluate($this->currencyLocale);
    }

    public function getNumberStep(): int|float|null
    {
        $step = $this->evaluate($this->numberStep);

        return $step !== null ? $step : null;
    }

    public function getButtonLayout(): ?string
    {
        return $this->evaluate($this->buttonLayout);
    }

    public function mask(?string $mask): static
    {
        $this->mask = $mask;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getMask(): ?string
    {
        return $this->mask;
    }

    protected function getUnwrappedStyle(): array
    {
        $reset = ['style' => 'border: 0; background: transparent; box-shadow: none;'];

        return [
            'input' => $reset,
            'prefix' => $reset,
            'suffix' => $reset,
        ];
    }

    protected function getAutoRules(): array
    {
        $rules = [];

        if ($this->type === 'email') {
            $rules[] = 'email';
        }

        if ($this->type === 'url') {
            $rules[] = 'url';
        }

        $inputMode = $this->getInputMode();

        if ($inputMode === 'decimal' && $this->type === 'text') {
            $rules[] = 'numeric';
        }

        if ($inputMode === 'numeric' && $this->type === 'text') {
            $rules[] = 'integer';
        }

        $isNumericField = in_array($inputMode, ['decimal', 'numeric']);

        if (! $isNumericField) {
            $maxLength = $this->getMaxLength();
            if ($maxLength !== null) {
                $rules[] = 'max:' . $maxLength;
            }

            $minLength = $this->getMinLength();
            if ($minLength !== null) {
                $rules[] = 'min:' . $minLength;
            }
        }

        return $rules;
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.text-input';
    }

    public function getVariantView(): string
    {
        return match (true) {
            $this->isOtp() => 'primix-forms::components.fields.text-input.otp',
            $this->hasPasswordStrength() => 'primix-forms::components.fields.text-input.password-strength',
            $this->hasSpinButtons() => 'primix-forms::components.fields.text-input.spin-buttons',
            default => 'primix-forms::components.fields.text-input.default',
        };
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'type' => $this->type,
            'mask' => $this->mask,
            'prefix' => $this->getPrefix(),
            'prefixIcon' => $this->getPrefixIcon(),
            'prefixActions' => $this->getPrefixActions(),
            'suffix' => $this->getSuffix(),
            'suffixIcon' => $this->getSuffixIcon(),
            'suffixActions' => $this->getSuffixActions(),
            'maxLength' => $this->getMaxLength(),
            'minLength' => $this->getMinLength(),
            'inputMode' => $this->getInputMode(),
            'autofocus' => $this->isAutofocused(),
            'readonly' => $this->isReadOnly(),
            'revealable' => $this->isRevealable(),
            'autocomplete' => $this->getAutocomplete(),
            'otp' => $this->isOtp(),
            'otpLength' => $this->getOtpLength(),
            'passwordStrength' => $this->hasPasswordStrength(),
            'spinButtons' => $this->hasSpinButtons(),
            'numberMode' => $this->getNumberMode(),
            'currencyCode' => $this->getCurrencyCode(),
            'currencyLocale' => $this->getCurrencyLocale(),
            'numberStep' => $this->getNumberStep(),
            'buttonLayout' => $this->getButtonLayout(),
        ]);
    }
}
