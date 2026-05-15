<?php

namespace Primix\Concerns;

use LiVue\Attributes\Fragment;

trait RerendersTableAfterAction
{
    #[Fragment('modal', 'table')]
    public function callAction(array $arguments): mixed
    {
        return $this->executeCallAction($arguments);
    }

    #[Fragment('modal', 'table')]
    public function submitMountedAction(): mixed
    {
        if ($this->mountedAction === null) {
            return null;
        }

        return $this->callAction(['name' => $this->mountedAction]);
    }
}
