<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        // ... (code inchangé)
        $users = User::with('roles')->latest()->paginate(5);
        $roles = Role::pluck('name', 'name')->all();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'roles' => 'required'
        ]);

        // --- SECURITE AJOUTÉE ---
        // Si on essaie de donner le role "Superadmin"...
        if (in_array('Superadmin', $request->input('roles'))) {
            // ... et que je ne suis PAS moi-même Superadmin...
            if (!auth()->user()->hasRole('Superadmin')) {
                // ... ALORS JE BLOQUE !
                return back()->with('error', 'Seul un Superadmin peut créer un autre Superadmin.');
            }
        }
        // ------------------------

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('roles'));

        return back()->with('success', 'Utilisateur créé avec succès');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'roles' => 'required'
        ]);

        // --- SECURITE AJOUTÉE ---
        if (in_array('Superadmin', $request->input('roles'))) {
            if (!auth()->user()->hasRole('Superadmin')) {
                return back()->with('error', 'Action non autorisée.');
            }
        }
        // ------------------------

        $input = $request->all();
        if(!empty($input['password'])){
            $input['password'] = Hash::make($input['password']);
        }else{
            unset($input['password']);
        }

        $user = User::find($id);
        $user->update($input);
        $user->syncRoles($request->input('roles'));

        return back()->with('success', 'Utilisateur mis à jour');
    }

    public function destroy($id)
    {
        $user = User::find($id);

        // Petite sécurité en plus : on ne supprime pas un Superadmin si on est juste Admin
        if ($user->hasRole('Superadmin') && !auth()->user()->hasRole('Superadmin')) {
            return back()->with('error', 'Vous ne pouvez pas supprimer un Superadmin.');
        }

        $user->delete();
        return back()->with('success', 'Utilisateur supprimé');
    }
}
