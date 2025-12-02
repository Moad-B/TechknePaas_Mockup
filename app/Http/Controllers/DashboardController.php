<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // MEMO : Pour récupérer l'utilisateur connecté
use Inertia\Inertia; // MEMO : Pour renvoyer la page React

class DashboardController extends Controller
{
    public function index()
    {
        // MEMO : Étape 1 - On récupère l'utilisateur qui est en train de visiter la page
        $user = Auth::user();

        // -------------------------------------------------------
        // CAS N°1 : L'utilisateur est un ADMIN
        // -------------------------------------------------------
        if ($user->hasRole('Admin')) {

            // MEMO : On renvoie vers le Dashboard "Superviseur".
            // On lui donne les chiffres globaux de l'entreprise.
            return Inertia::render('admin/Dashboard', [
                'userName' => $user->name,
                'total_revenue' => '10 000 €', // Donnée sensible (Admin seulement)
                'total_users' => 150
            ]);
        }

        // -------------------------------------------------------
        // CAS N°2 : C'est un UTILISATEUR CLASSIQUE (Client)
        // -------------------------------------------------------
        // MEMO : Si le code arrive ici, c'est que ce n'est PAS un admin.
        // Donc on affiche le tableau de bord client par défaut.

        return Inertia::render('Client/Dashboard', [
            'userName' => $user->name,
            'my_services_status' => 'En ligne', // Juste ses infos à lui
            'my_tickets' => 2
        ]);
    }
}
