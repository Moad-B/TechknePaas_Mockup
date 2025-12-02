<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\WishlistItem;
use Inertia\Inertia;

class ProductCatalogController extends Controller
{
    // Affiche la page du catalogue (Visible par tout le monde)
    public function index()
    {
        // Etape 1 : Je recupere la liste des services/produits
        // Je trie par ordre alphabetique (A-Z)
        // Je coupe en pages de 12 elements (pour faire une grille propre)
        $products = Product::orderBy('name')->paginate(12);

        // Etape 2 : Je prepare la liste des favoris
        $wishlistIds = [];

        // Si l'utilisateur est connecté, je vais chercher ses likes
        if (auth()->check()) {
            $wishlistIds = WishlistItem::where('user_id', auth()->id())
                ->pluck('product_id') // Je prends seulement les IDs des produits
                ->toArray();
        }

        // Etape 3 : J'envoie le tout à la page React
        return Inertia::render('products/index', [
            'products' => $products,
            'wishlist' => $wishlistIds, // Pour afficher les coeurs rouges ou gris
        ]);
    }
}
