<?php

namespace App\Services;

// J'importe le modele Permission de Spatie
use Spatie\Permission\Models\Permission;

class PermissionService
{
    // C'est ici que je liste toutes les actions possibles dans mon site
    // Comme ca, si je dois en rajouter, je viens juste ici
    public function getAllPermissions()
    {
        return [
            // --- ACCES GENERAL ---
            'view_dashboard', // Voir le tableau de bord

            // --- GESTION DES UTILISATEURS ---
            'view_user',
            'create_user',
            'edit_user',
            'delete_user',

            // --- GESTION DU CATALOGUE (Produits/Services) ---
            'view_product',
            'create_product',
            'edit_product',
            'delete_product',

            // --- GESTION DES ROLES (RBAC) ---
            'view_role',
            'create_role',
            'edit_role',
            'delete_role',
        ];
    }

    // Cette fonction sert a remplir la base de données avec ma liste
    // Je l'appelle quand je lance l'application pour etre sur que tout est la
    public function createPermissions()
    {
        // Je recupere ma liste du dessus
        $permissions = $this->getAllPermissions();

        foreach ($permissions as $permissionName) {
            // Pour chaque nom, je crée une permission dans la base
            // "firstOrCreate" verifie d'abord si ca existe pour pas créer de doublons
            Permission::firstOrCreate(['name' => $permissionName]);
        }
    }

    // Juste pour recuperer la liste de la BDD si besoin
    public function getAllPermissionModels()
    {
        return Permission::all();
    }
}
