<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    // Est-ce que l'utilisateur a le droit de faire cette action ?
    public function authorize()
    {
        // Je mets "true" pour dire "Oui, laisse passer tout le monde"
        // (Je gère la sécurité via les Rôles dans le routeur web.php)
        return true;
    }

    // Les règles que le formulaire doit respecter
    public function rules()
    {
        return [
            'name' => 'required|string', // Le nom est obligatoire
            'description' => 'nullable|string', // La description est optionnelle (peut être vide)
            'price' => 'required|numeric', // Le prix (TJM ou Forfait)

            // Astuce : La quantité sert de durée.
            // Si on met 1 -> C'est un TJM (1 jour)
            // Si on met > 1 -> C'est un Forfait (plusieurs jours)
            // "min:1" empêche de mettre 0 jour
            'quantity' => 'required|integer|min:1',
        ];
    }
}
