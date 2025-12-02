<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

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

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $this->command->info('Creating permissions...');
        $this->permissionService->createPermissions();

}
}
