<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    // La page de contact publique (pour ceux qui ont pas de compte)
    public function contact()
    {
        return Inertia::render('contact/index');
    }

    // La page principale du support (Le Hub)
    public function index(Request $request)
    {
        // Je regarde qui est connecté
        $user = $request->user();

        // Petite verification : est-ce que c'est un admin ?
        // Si oui, je l'envoie vers la supervision globale
        if ($user->hasRole('Admin') || $user->hasRole('Superadmin')) {
            return Inertia::render('support/admin/index');
        }

        // Sinon, c'est un client normal, je lui montre juste ses tickets
        return Inertia::render('support/client/index');
    }

    // Le formulaire pour créer un nouveau ticket
    public function create()
    {
        return Inertia::render('support/client/create');
    }

    // Voir une conversation (un ticket)
    // Pour l'instant c'est une fausse page, je mettrai l'ID plus tard
    public function show()
    {
        return Inertia::render('support/show');
    }
}
