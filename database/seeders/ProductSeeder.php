<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Liste des services réalistes pour un Studio de Dev
        $services = [
            [
                'name' => 'Site Vitrine Corporate',
                'description' => 'Conception d\'un site web moderne et responsive (5 pages). Inclus : Intégration UI/UX, optimisation SEO de base et formulaire de contact sécurisé.',
                'price' => 2490.00,
            ],
            [
                'name' => 'Plateforme E-commerce (Shopify/WooCommerce)',
                'description' => 'Boutique en ligne clé en main. Gestion du catalogue, configuration des paiements (Stripe/Paypal), et tableau de bord de suivi des ventes.',
                'price' => 4500.00,
            ],
            [
                'name' => 'Développement Application Web (SaaS)',
                'description' => 'Développement sur mesure d\'une application métier (Stack Laravel/React). Architecture robuste, API RESTful et panel d\'administration.',
                'price' => 12000.00,
            ],
            [
                'name' => 'Maintenance & Monitoring (TMA)',
                'description' => 'Forfait mensuel de Tierce Maintenance Applicative. Mises à jour de sécurité, sauvegardes quotidiennes et monitoring de l\'infrastructure (Uptime 99.9%).',
                'price' => 450.00, // Prix mensuel
            ],
            [
                'name' => 'Audit Technique & Sécurité',
                'description' => 'Analyse complète de votre code existant. Rapport de performance, détection des failles de sécurité et préconisations d\'optimisation.',
                'price' => 1200.00,
            ],
            [
                'name' => 'Design System & Maquettage UI/UX',
                'description' => 'Création de l\'identité visuelle de votre projet. Livraison des maquettes Figma interactives et d\'un guide de style complet.',
                'price' => 3500.00,
            ],
            [
                'name' => 'API & Microservices Integration',
                'description' => 'Connecteurs sur mesure pour lier vos outils (CRM, ERP, IaaS). Automatisation des flux de données via Webhooks.',
                'price' => 1800.00,
            ],
        ];

        // Boucle pour créer les produits proprement
        foreach ($services as $service) {
            Product::factory()->create($service);
        }

        // Optionnel : Si tu veux quand même quelques produits aléatoires pour tester la pagination
        // Product::factory(5)->create();
    }
}
