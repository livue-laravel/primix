<?php

namespace Primix\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class MakeUserCommand extends Command
{
    protected $signature = 'make:primix-user
                            {--name= : The name of the user}
                            {--email= : The email of the user}
                            {--password= : The password of the user}';

    protected $description = 'Create a new Primix panel user';

    protected $aliases = ['primix:user'];

    public function handle(): int
    {
        $userModel = $this->getUserModel();

        $name = $this->option('name') ?? $this->ask('Name');
        $email = $this->option('email') ?? $this->ask('Email');
        $password = $this->option('password') ?? $this->secret('Password');

        if (! $name || ! $email || ! $password) {
            $this->error('Name, email and password are required.');

            return self::FAILURE;
        }

        if ($userModel::where('email', $email)->exists()) {
            $this->error("A user with email [{$email}] already exists.");

            return self::FAILURE;
        }

        $user = $userModel::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $this->info("User [{$user->name}] created successfully.");

        return self::SUCCESS;
    }

    protected function getUserModel(): string
    {
        return config('auth.providers.users.model', \App\Models\User::class);
    }
}
