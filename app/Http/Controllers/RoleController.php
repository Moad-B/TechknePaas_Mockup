<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view_role')->only(['index', 'show']);
        $this->middleware('permission:create_role')->only(['create', 'store']);
        $this->middleware('permission:edit_role')->only(['edit', 'update']);
        $this->middleware('permission:delete_role')->only(['destroy']);
    }

    public function index(Request $request): Response
    {
        $roles = Role::query()
            ->with(['permissions:id,name'])
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        $permissions = Permission::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function create(): RedirectResponse
    {
        // The UI handles create in a dialog on the index page
        return redirect()->route('admin.roles.index');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permission' => ['required', 'array'],
            'permission.*' => ['integer'],
        ]);

        $permissionIds = collect($validated['permission'] ?? [])
            ->map(fn ($v) => (int) $v)
            ->filter()
            ->all();

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($permissionIds);

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully');
    }

    public function show(int $id): RedirectResponse
    {
        // We keep a single index page; redirect any show requests back
        return redirect()->route('admin.roles.index');
    }

    public function edit(int $id): RedirectResponse
    {
        // Edit is handled in a dialog on the index page
        return redirect()->route('admin.roles.index');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $id],
            'permission' => ['required', 'array'],
            'permission.*' => ['integer'],
        ]);

        $role = Role::findOrFail($id);
        $role->name = $validated['name'];
        $role->save();

        $permissionIds = collect($validated['permission'] ?? [])
            ->map(fn ($v) => (int) $v)
            ->filter()
            ->all();

        $role->syncPermissions($permissionIds);

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully');
    }

    public function destroy(int $id): RedirectResponse
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully');
    }
}


