<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Le Constructeur : Les vigiles de l'entrée
    function __construct()
    {
        // Je verifie les permissions Spatie (qui a le droit de faire quoi)
        $this->middleware('permission:product-list|product-create|product-edit|product-delete', ['only' => ['index','show']]);
        $this->middleware('permission:product-create', ['only' => ['create','store']]);
        $this->middleware('permission:product-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }

    // Affiche la liste des services (Page Catalogue Admin)
    public function index()
    {
        // Etape 1 : Je recupere les produits, du plus recent au plus vieux
        $products = Product::orderBy('created_at', 'desc')->paginate(5);

        // Etape 2 : J'envoie la page React
        return Inertia::render('admin/products/index', [
            'products' => $products
        ]);
    }

    // Enregistre un nouveau service
    public function store(Request $request)
    {
        // Etape 1 : Validation du formulaire
        $validated = $request->validate([
            'name' => 'required|string', // Le nom est obligatoire
            'description' => 'nullable|string', // La description est optionnelle (peut etre vide)
            'price' => 'required|numeric', // Le prix (TJM ou Forfait)

            // Astuce : La quantité sert de durée.
            // Si on met 1 -> C'est un TJM (1 jour)
            // Si on met > 1 -> C'est un Forfait (plusieurs jours)
            'quantity' => 'required|integer|min:1',
        ]);

        // Etape 2 : Creation dans la base de données
        Product::create($validated);

        // Etape 3 : On recharge la page
        // J'utilise back() c'est plus simple que redirect()->route()
        return back()->with('success', 'Nouveau service ajouté au catalogue.');
    }

    // Met a jour un service existant
    public function update(Request $request, Product $product)
    {
        // Etape 1 : Re-validation des données
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string', // On n'oublie pas la description ici aussi
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
        ]);

        // Etape 2 : Mise à jour
        $product->update($validated);

        // Etape 3 : On recharge
        return back()->with('success', 'Service modifié avec succès');
    }

    // Supprime un service
    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with('success', 'Service supprimé du catalogue');
    }
}
