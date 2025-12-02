<?php

declare(strict_types=1);

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function createAdminUser(): User
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $adminRole = Role::create(['name' => 'Admin']);
        $user->assignRole($adminRole);

        return $user;
    }

    public function test_index_requires_admin_role(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($user)
            ->get('/admin/roles')
            ->assertForbidden();
    }

    public function test_admin_can_view_roles_index(): void
    {
        $admin = $this->createAdminUser();

        $this->actingAs($admin)
            ->get('/admin/roles')
            ->assertOk();
    }

    public function test_admin_can_create_update_and_delete_role(): void
    {
        $admin = $this->createAdminUser();
        $permA = Permission::create(['name' => 'perm a']);
        $permB = Permission::create(['name' => 'perm b']);

        // Create
        $this->actingAs($admin)
            ->post('/admin/roles', [
                'name' => 'Manager',
                'permission_ids' => [$permA->id, $permB->id],
            ])
            ->assertRedirect();

        $role = Role::where('name', 'Manager')->first();
        $this->assertNotNull($role);
        $this->assertTrue($role->hasPermissionTo('perm a'));
        $this->assertTrue($role->hasPermissionTo('perm b'));

        // Update
        $this->actingAs($admin)
            ->put("/admin/roles/{$role->id}", [
                'name' => 'Manager Updated',
                'permission_ids' => [$permA->id],
            ])
            ->assertRedirect();

        $role->refresh();
        $this->assertSame('Manager Updated', $role->name);
        $this->assertTrue($role->hasPermissionTo('perm a'));
        $this->assertFalse($role->hasPermissionTo('perm b'));

        // Delete
        $this->actingAs($admin)
            ->delete("/admin/roles/{$role->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing(config('permission.table_names.roles', 'roles'), [
            'id' => $role->id,
        ]);
    }
}
