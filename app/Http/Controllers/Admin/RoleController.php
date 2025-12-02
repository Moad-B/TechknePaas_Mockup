<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; // J'utilise la requete de base de Laravel
use Inertia\Inertia;
// J'importe les modeles de Spatie pour gérer les droits
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    // Affiche la liste des roles (Page RBAC)
    public function index()
    {
        // Je recupere tous les roles de la base de données
        // Je charge aussi les permissions associées (avec "with")
        // Et je compte combien d'utilisateurs ont ce role (avec "withCount")
        $roles = Role::with('permissions')->withCount('users')->get();

        // Je recupere la liste de toutes les permissions pour pouvoir les cocher dans le formulaire
        $permissions = Permission::orderBy('name')->get();

        // J'envoie tout ca a la vue React
        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    // Créer un nouveau role
    public function store(Request $request)
    {
        // Etape 1 : Je valide le formulaire
        // Le nom est obligatoire et doit etre unique dans la table roles
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permission_ids' => 'array' // Je verifie que c'est bien une liste
        ]);

        // Etape 2 : Je crée le role
        $role = Role::create([
            'name' => $request->name,
            'guard_name' => 'web' // C'est le guard par defaut
        ]);

        // Etape 3 : Si j'ai coché des permissions, je les attache au role
        if ($request->has('permission_ids')) {
            // La fonction syncPermissions de Spatie fait tout le travail
            $role->syncPermissions($request->permission_ids);
        }

        // Etape 4 : Je recharge la page avec un message
        return back()->with('success', 'Nouveau rôle créé !');
    }

    // Modifier un role existant
    public function update(Request $request, Role $role)
    {
        // Pareil, je valide.
        // L'astuce ici c'est "unique:roles,name," . $role->id pour dire "unique sauf pour moi-même"
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id,
            'permission_ids' => 'array'
        ]);

        // Je change le nom
        $role->update([
            'name' => $request->name,
        ]);

        // Je mets à jour les permissions (ca remplace les anciennes par les nouvelles)
        if ($request->has('permission_ids')) {
            $role->syncPermissions($request->permission_ids);
        }

        return back()->with('success', 'Rôle modifié avec succès');
    }

    // Supprimer un role
    public function destroy(Role $role)
    {
        // Je supprime le role de la base
        $role->delete();

        return back()->with('success', 'Rôle supprimé');
    }
}
