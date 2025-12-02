<?php

namespace Database\Seeders;


use App\Services\RolesService;
use Illuminate\Database\Seeder;

use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    public function __construct(
        private readonly RolesService $rolesService
    ) {
    }

    public function run(): void
    {
        // 1. Nettoyer le cache
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 2. Créer les permissions de base (ex: via un PermissionSeeder ou un Service)

        $this->command->info('role predefinie');
        $this->rolesService->createPredefinedRoles();


    }
}
