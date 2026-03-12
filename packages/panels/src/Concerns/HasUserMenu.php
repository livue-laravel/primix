<?php

namespace Primix\Concerns;

use Primix\Navigation\UserMenu;
use Primix\Navigation\UserMenuItem;

trait HasUserMenu
{
    /** @var array<UserMenuItem> */
    protected array $userMenuItems = [];

    /**
     * @param  array<UserMenuItem>  $items
     */
    public function userMenuItems(array $items): static
    {
        $this->userMenuItems = $items;

        return $this;
    }

    /**
     * @return array<UserMenuItem>
     */
    public function getUserMenuItems(): array
    {
        return $this->userMenuItems;
    }

    public function buildUserMenu(): UserMenu
    {
        $menu = UserMenu::make();

        $guard = auth()->guard($this->getAuthGuard());
        $user = $guard->user();

        if ($user) {
            $menu->userName($user->name ?? null);
            $menu->userEmail($user->email ?? null);
        }

        // Profile link (if configured)
        if ($this->profilePage) {
            $profileClass = $this->getProfilePage();
            $menu->addItem(
                UserMenuItem::make()
                    ->label(__('primix::panel.actions.profile'))
                    ->icon('heroicon-o-user-circle')
                    ->url(route("primix.{$this->getId()}.{$profileClass::getSlug()}"))
                    ->sort(-100)
            );
        }

        // Custom items
        foreach ($this->userMenuItems as $item) {
            $menu->addItem($item);
        }

        // Logout (always last)
        if ($this->hasLogin()) {
            $menu->addItem(
                UserMenuItem::make()
                    ->label(__('primix::panel.actions.sign_out'))
                    ->icon('heroicon-o-arrow-left-on-rectangle')
                    ->url(url($this->getPath() . '/logout'))
                    ->color('danger')
                    ->sort(PHP_INT_MAX)
                    ->postAction()
            );
        }

        return $menu;
    }
}
