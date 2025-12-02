<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductCatalogController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\SupportController;
// Mes controlleurs pour la partie Admin
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
// J'ai renommé celui la pour pas confondre avec le catalogue public
use App\Http\Controllers\Admin\ProductController as AdminProductController;

// --- 1. PAGES POUR TOUT LE MONDE (Pas besoin de compte) ---

Route::get('/', function () {
    // La page d'accueil
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Le catalogue que les visiteurs peuvent voir sans payer
Route::get('/product', [ProductCatalogController::class, 'index'])->name('product.public');

// La page de contact
Route::get('/contact', [SupportController::class, 'contact'])->name('contact');


// --- 2. PAGES PRIVEES (Il faut etre connecté) ---

Route::middleware(['auth', 'verified'])->group(function () {


    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    // -- Section Support Client --
    Route::prefix('support')->name('support.')->group(function () {
        // Liste des tickets
        Route::get('/', [SupportController::class, 'index'])->name('index');
        // Créer un ticket
        Route::get('/create', [SupportController::class, 'create'])->name('create');
        // Voir un ticket
        Route::get('/ticket', [SupportController::class, 'show'])->name('show');
    });

    // Le catalogue vu par un client connecté
    Route::get('/products', [ProductCatalogController::class, 'index'])->name('products.index');

    // Gestion des favoris (Wishlist)
    Route::post('/wishlist/{product}', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    // --- 3. ZONE ADMIN (Seulement pour moi) ---
    // J'ai mis le prefixe 'admin' donc toutes les urls commencent par /admin/
    // Et le middleware 'role:Admin' bloque les autres
    Route::prefix('admin')->name('admin.')->middleware('role:Admin')->group(function () {

        // Si je tape juste /admin, je redirige vers les roles
        Route::get('/', fn () => redirect()->route('admin.roles.index'));

        // -- Gestion des Rôles (RBAC) --
        // J'ai mis toutes les actions possibles (voir, créer, modifier, supprimer)
        Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
        Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
        Route::put('roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

        // -- Gestion des Utilisateurs --
        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        // -- Catalogue des Services (Admin) --

        Route::get('products', [AdminProductController::class, 'index'])->name('products.index');
        Route::post('products', [AdminProductController::class, 'store'])->name('products.store');
        Route::put('products/{product}', [AdminProductController::class, 'update'])->name('products.update');
        Route::delete('products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

        // -- Le Hub Intelligence (Ma page de stats) --
        Route::get('hub-intelligence', function () {
            return Inertia::render('admin/hub-intelligence');
        })->name('hub-intelligence');
    });

});

require __DIR__.'/settings.php';
