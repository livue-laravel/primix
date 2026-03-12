<?php

namespace Primix\Navigation;

use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

class UserMenu
{
    use EvaluatesClosures;
    use Makeable;

    /** @var array<UserMenuItem> */
    protected array $items = [];

    protected ?string $userName = null;

    protected ?string $userEmail = null;

    protected ?string $avatarUrl = null;

    public function addItem(UserMenuItem $item): static
    {
        $this->items[] = $item;

        return $this;
    }

    /**
     * @return array<UserMenuItem>
     */
    public function getItems(): array
    {
        return collect($this->items)
            ->sortBy(fn (UserMenuItem $item) => $item->getSort() ?? PHP_INT_MAX)
            ->values()
            ->all();
    }

    public function userName(?string $name): static
    {
        $this->userName = $name;

        return $this;
    }

    public function getUserName(): ?string
    {
        return $this->userName;
    }

    public function userEmail(?string $email): static
    {
        $this->userEmail = $email;

        return $this;
    }

    public function getUserEmail(): ?string
    {
        return $this->userEmail;
    }

    public function avatarUrl(?string $url): static
    {
        $this->avatarUrl = $url;

        return $this;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function toArray(): array
    {
        return [
            'userName' => $this->getUserName(),
            'userEmail' => $this->getUserEmail(),
            'avatarUrl' => $this->getAvatarUrl(),
            'items' => array_map(
                fn (UserMenuItem $item) => $item->toArray(),
                $this->getItems()
            ),
        ];
    }
}
