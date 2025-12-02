<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{

    public function authorize()
    {

        // La sécurité est gérée dans le fichier routes/web.php avec le middleware 'role:Admin'.
        // Donc si on arrive ici, c'est qu'on est déjà autorisé.
        return true;
    }

    // Les règles à respecter
    public function rules()
    {

        // Je récupère le rôle depuis l'URL (ex: /admin/roles/5 -> je récupère le 5)
        // Si je suis en train de créer, $role sera vide.
        $role = $this->route('role');
        $roleId = $role ? $role->id : null;

        return [
            // Le nom est obligatoire.
            // L'astuce "unique:roles,name," . $roleId veut dire :
            // "Vérifie que le nom est unique, SAUF si c'est déjà le mien (mon ID)".
            'name' => 'required|string|max:255|unique:roles,name,' . $roleId,

            // Les permissions doivent être une liste (tableau)
            'permission_ids' => 'array',

            // Chaque ID dans la liste doit exister dans la table permissions
            'permission_ids.*' => 'exists:permissions,id',
        ];
    }
}
