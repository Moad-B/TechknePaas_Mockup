<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\WishlistItem;

class WishlistController extends Controller
{
    // Ajouter un produit aux favoris (Quand on clique sur le coeur)
    public function store(Product $product)
    {
        // Etape 1 : Je récupère l'ID de la personne connectée
        $userId = auth()->id();

        // Etape 2 : Je crée la ligne dans la base de données
       //pratique : il vérifie d'abord si ça existe déjà
        // Si oui il fait rien, si non il crée. Ça évite les doublons.
        WishlistItem::firstOrCreate([
            'user_id' => $userId,
            'product_id' => $product->id,
        ]);

        // Etape 3 : Je recharge la page où on était
        return back()->with('success', 'Produit ajouté à la wishlist');
    }

    // Retirer un produit des favoris
    public function destroy(Product $product)
    {
        // Etape 1 : Je récupère l'ID du user
        $userId = auth()->id();

        // Etape 2 : Je cherche la ligne qui correspond exactement
        // (Le bon utilisateur ET le bon produit)
        WishlistItem::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->delete(); // Et je supprime

        // Etape 3 : Je recharge la page
        return back()->with('success', 'Produit retiré de la wishlist');
    }
}
