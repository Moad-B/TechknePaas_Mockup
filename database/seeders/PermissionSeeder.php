<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use App\Services\PermissionService;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     */
    public function __construct(
        private readonly PermissionService $permissionService,

    ) {
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'dashboard.view']);
        Permission::create(['name' => 'profile.view']);
        Permission::create(['name' => 'profile.edit']);
        Permission::create(['name' => 'profile.update']);
        Permission::create(['name' => 'view_product']);


        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $this->command->info('Creating permissions...');
        $this->permissionService->createPermissions();


}
}
