<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request; // J'utilise la requete de base
use Inertia\Inertia;

class ProductController extends Controller
{
    // Affiche la liste des services (Page Catalogue)
    public function index()
    {
        // Je recupere tous les produits de la base de données
        // Je les trie par ID décroissant (du plus récent au plus vieux)
        // Je fais des pages de 10 éléments pour pas que ce soit trop long
        $products = Product::orderBy('id', 'desc')->paginate(10);

        // J'envoie tout ça à ma page React
        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    // Enregistre un nouveau service dans la base
    public function store(Request $request)
    {
        // Etape 1 : Je verifie que les champs sont bien remplis
        // "numeric" pour le prix, "integer" pour la quantité (durée)
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        // Etape 2 : Je crée la ligne dans la table products
        Product::create($validated);

        // Etape 3 : Je recharge la page avec un petit message
        return back()->with('success', 'Service ajouté au catalogue');
    }

    // Modifie un service existant
    public function update(Request $request, Product $product)
    {
        // Pareil, je revérifie les données avant de modifier
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        // Je mets à jour l'objet product avec les nouvelles infos
        $product->update($validated);

        // Je recharge la page
        return back()->with('success', 'Service modifié avec succès');
    }

    // Supprime un service
    public function destroy(Product $product)
    {
        // Hop, poubelle
        $product->delete();

        // On revient sur la liste
        return back()->with('success', 'Service retiré du catalogue');
    }
}
