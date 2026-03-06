<?php

namespace Primix\Forms\Concerns;

trait HasTextValidationRules
{
    public function confirmed(): static
    {
        return $this->setDedicatedRule('confirmed', 'confirmed');
    }

    public function regex(string $pattern): static
    {
        return $this->setDedicatedRule('regex', 'regex:' . $pattern);
    }

    public function ip(): static
    {
        return $this->setDedicatedRule('ip', 'ip');
    }

    public function ipv4(): static
    {
        $this->applyDefaultIpv4Mask();

        return $this->setDedicatedRule('ip', 'ipv4');
    }

    public function ipv6(): static
    {
        $this->removeDefaultIpv4Mask();

        return $this->setDedicatedRule('ip', 'ipv6');
    }

    public function json(): static
    {
        return $this->setDedicatedRule('json', 'json');
    }

    public function uuid(): static
    {
        return $this->setDedicatedRule('uuid', 'uuid');
    }

    protected function applyDefaultIpv4Mask(): void
    {
        if (! method_exists($this, 'getMask') || ! method_exists($this, 'mask')) {
            return;
        }

        if ($this->getMask() !== null) {
            return;
        }

        $this->mask('999.999.999.999');
    }

    protected function removeDefaultIpv4Mask(): void
    {
        if (! method_exists($this, 'getMask') || ! method_exists($this, 'mask')) {
            return;
        }

        if ($this->getMask() !== '999.999.999.999') {
            return;
        }

        $this->mask(null);
    }
}
