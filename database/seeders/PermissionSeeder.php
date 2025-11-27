<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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
}
}
