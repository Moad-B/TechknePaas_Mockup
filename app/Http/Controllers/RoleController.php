<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
// J'utilise les modeles de Spatie
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    // Le gardien : je verifie les droits avant de laisser passer
    public function __construct()
    {
        // Il faut le droit "view_role" pour voir la liste
        $this->middleware('permission:view_role')->only(['index', 'show']);
        // Il faut le droit "create_role" pour ajouter
        $this->middleware('permission:create_role')->only(['create', 'store']);
        // Il faut le droit "edit_role" pour modifier
        $this->middleware('permission:edit_role')->only(['edit', 'update']);
        // Il faut le droit "delete_role" pour supprimer
        $this->middleware('permission:delete_role')->only(['destroy']);
    }

    // Page liste des roles
    public function index()
    {
        // Etape 1 : Je recupere les roles avec leurs permissions
        // Je prends les plus recents en premier
        $roles = Role::with('permissions')->latest('id')->paginate(10);

        // Etape 2 : Je recupere toutes les permissions pour le formulaire (les cases à cocher)
        $permissions = Permission::orderBy('name')->get();

        // Etape 3 : J'envoie tout ca a la page React
        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    // Les fonctions create et edit ne servent a rien car j'utilise des Modales (Popups)
    // Donc je renvoie juste vers l'index si on essaie d'y aller
    public function create()
    {
        return back();
    }

    public function edit($id)
    {
        return back();
    }

    public function show($id)
    {
        return back();
    }

    // Sauvegarder un nouveau role
    public function store(Request $request)
    {
        // Etape 1 : Je verifie le formulaire
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permission' => 'required|array', // Ca doit etre une liste
        ]);

        // Etape 2 : Je crée le role
        $role = Role::create(['name' => $request->name]);

        // Etape 3 : J'attache les permissions cochées
        // Si le tableau est vide, ca ne met rien, c'est géré
        $role->syncPermissions($request->permission);

        return back()->with('success', 'Rôle créé avec succès');
    }

    // Mettre a jour un role
    public function update(Request $request, $id)
    {
        // Etape 1 : Validation
        // L'astuce unique:roles,name,ID permet de garder le meme nom si on ne le change pas
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'permission' => 'required|array',
        ]);

        // Etape 2 : Je retrouve le role
        $role = Role::findOrFail($id);

        // Etape 3 : Je change le nom
        $role->name = $request->name;
        $role->save();

        // Etape 4 : Je mets a jour les permissions (ca remplace les anciennes)
        $role->syncPermissions($request->permission);

        return back()->with('success', 'Rôle mis à jour');
    }

    // Supprimer un role
    public function destroy($id)
    {
        // Je trouve et je supprime
        $role = Role::findOrFail($id);
        $role->delete();

        return back()->with('success', 'Rôle supprimé');
    }
}
