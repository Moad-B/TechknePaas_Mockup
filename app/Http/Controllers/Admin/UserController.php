<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request; // La requete de base
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    // Affiche la liste des utilisateurs
    public function index()
    {
        // Je recupere les utilisateurs avec leurs roles (pour eviter de faire trop de requetes SQL)
        // Je trie du plus recent au plus vieux
        $users = User::with('roles')->orderBy('id', 'desc')->paginate(10);

        // Je recupere aussi la liste des roles pour pouvoir les choisir dans le formulaire (select)
        $rolesAvailable = Role::orderBy('name')->get();

        // J'envoie tout ca a la page React
        return Inertia::render('admin/users/index', [
            'users' => $users,
            'rolesAvailable' => $rolesAvailable,
        ]);
    }

    // Créer un nouvel utilisateur
    public function store(Request $request)
    {
        // Etape 1 : Validation des champs
        $request->validate([
            'name' => 'required|string|max:255',
            // unique:users veut dire "verifie que l'email n'existe pas deja dans la table users"
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role_ids' => 'array' // Doit etre une liste d'IDs
        ]);

        // Etape 2 : Création de l'user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Laravel le hash automatiquement normalement
        ]);

        // Etape 3 : Attribution des roles
        if ($request->has('role_ids')) {
            // J'utilise la relation standard de Laravel pour lier les roles cochés
            $user->roles()->sync($request->role_ids);
        }

        return back()->with('success', 'Utilisateur créé avec succès');
    }

    // Modifier un utilisateur existant
    public function update(Request $request, User $user)
    {
        // Etape 1 : Validation
        $request->validate([
            'name' => 'required|string|max:255',
            // L'astuce ici : unique:users,email,ID_USER
            // Ça veut dire "l'email doit etre unique, sauf si c'est le mien"
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8', // Pas obligatoire en modif
            'role_ids' => 'array'
        ]);

        // Etape 2 : Mise à jour des infos de base
        $user->name = $request->name;
        $user->email = $request->email;

        // Etape 3 : Gestion du mot de passe (seulement s'il est rempli)
        if ($request->filled('password')) {
            $user->password = $request->password;
        }

        $user->save();

        // Etape 4 : Mise à jour des roles
        // Si role_ids est vide, ca enlevera tous les roles, ce qui est logique
        $user->roles()->sync($request->role_ids ?? []);

        return back()->with('success', 'Utilisateur mis à jour');
    }

    // Supprimer un utilisateur
    public function destroy(User $user)
    {
        // On ne peut pas se supprimer soi-meme (petite securité basique)
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Impossible de supprimer votre propre compte');
        }

        $user->delete();

        return back()->with('success', 'Utilisateur supprimé');
    }
}
