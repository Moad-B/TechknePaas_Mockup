<?php

namespace App\Services;

// J'importe les modèles de Spatie
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesService
{
    // Pas besoin de constructeur compliqué ici

    // Récuperer tous les roles (utile pour les selects)
    public function getAllRoles()
    {
        return Role::all();
    }

    // Récuperer les roles pour le tableau (avec recherche et pagination)
    public function getPaginatedRoles($search = null)
    {
        // Je prepare la requete et je charge les permissions avec ("with")
        $query = Role::with('permissions');

        // Si l'utilisateur a tapé une recherche
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        // Je renvoie 10 resultats par page
        return $query->paginate(10);
    }

    // Créer un role proprement
    public function createRole($name, $permissions = [])
    {
        // firstOrCreate, c'est magique : ca évite de créer des doublons si le role existe deja
        $role = Role::firstOrCreate(['name' => $name, 'guard_name' => 'web']);

        // Si j'ai donné une liste de permissions, je les attache
        if (!empty($permissions)) {
            $role->syncPermissions($permissions);
        }

        return $role;
    }

    // Mettre à jour un role
    public function updateRole($role, $name, $permissions = [])
    {
        // Je change le nom
        $role->name = $name;
        $role->save();

        // Je mets a jour les permissions (ca remplace les anciennes)
        if (!empty($permissions)) {
            $role->syncPermissions($permissions);
        }

        return $role;
    }

    // Supprimer un role
    public function deleteRole($role)
    {
        return $role->delete();
    }

    // Cette fonction sert a initialiser l'app avec les roles de base
    // (Je l'appelle souvent dans les seeders)
    public function createPredefinedRoles()
    {
        // 1. Superadmin : Il a le droit de TOUT faire
        $superAdmin = $this->createRole('Superadmin');
        // Je lui donne toutes les permissions qui existent dans la base
        $superAdmin->syncPermissions(Permission::all());

        // 2. Admin : Pour l'instant il a tout aussi (comme le patron)
        $admin = $this->createRole('Admin');
        $admin->syncPermissions(Permission::all());

        // 3. User : Le client de base
        $user = $this->createRole('User');
        // Lui, je lui donne une liste précise de droits
        $user->syncPermissions([
            'dashboard.view',
            'profile.view',
            'profile.edit',
            'profile.update',
            'view_product', // Il a le droit de voir le catalogue
        ]);

        return ['Superadmin', 'Admin', 'User'];
    }
}
