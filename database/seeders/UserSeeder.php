<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role; // On garde ça ici

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Créer l'utilisateur Admin
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'admin',
                'password' => bcrypt('admin'),
                'email_verified_at' => now(),
            ]
        );


        $adminUser->assignRole('admin');


        // 3. Créer un utilisateur standard
        $testUser = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $testUser->assignRole('user');
    }
}
