<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'create_product',
            'edit_product',
            'delete_product',
            'view_product',

            'view_role',
            'create_role',
            'edit_role',
            'delete_role',

            'view_user',
            'create_user',
            'edit_user',
            'delete_user',

            'view_permission',
            'create_permission',
            'edit_permission',
            'delete_permission',

        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        $userRole = Role::firstOrCreate(['name' => 'user']);
        $userRole->givePermissionTo('view_product');

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(Permission::all());


    }
}
