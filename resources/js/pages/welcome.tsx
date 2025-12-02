import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, Link, usePage } from '@inertiajs/react'
// Import des composants UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Info, ArrowRight, Zap, Activity, LayoutDashboard,
    Cpu, LineChart, Workflow, Lock, CheckCircle2
} from 'lucide-react'

// Routes pour les liens
import { dashboard, login, register } from '@/routes'

// --- COMPOSANTS SIMPLES ---

// La barre laterale sur les grands ecrans
function SidebarDesktop() {
    return (
        <aside className="hidden md:block w-72 space-y-6">

            {/* Menu de navigation rapide */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase text-muted-foreground">Sommaire</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <nav className="flex flex-col text-sm">
                        <a href="#presentation" className="px-4 py-2 hover:bg-muted block">Présentation</a>
                        <a href="#solutions" className="px-4 py-2 hover:bg-muted block">Nos Solutions</a>
                        <a href="#actualites" className="px-4 py-2 hover:bg-muted block">Actualités</a>
                    </nav>
                </CardContent>
            </Card>

            {/* Un faux widget pour montrer que c'est vivant */}
            <Card className="bg-emerald-50 border-emerald-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-emerald-700 flex items-center gap-2">
                        <Activity className="h-4 w-4" /> État des Services
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between text-xs">
                        < span className="text-emerald-900">API</span>
                        <span className="text-emerald-600 font-bold">Opérationnel</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className= "text-emerald-900">Base de Données</span>
                        <span className="text-emerald-600 font-bold">Opérationnel</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className= "text-emerald-900">Orchestrateur</span>
                        <span className="text-emerald-600 font-bold">Opérationnel</span>
                    </div>
                    <Separator className="bg-emerald-200" />
                    <p className="text-[10px] text-center text-muted-foreground">Mis à jour en temps réel</p>
                </CardContent>
            </Card>

            {/* Appel a l'action */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold">Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                        Nos experts sont là pour configurer votre environnement studio.
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">Contacter le Support</Button>
                </CardContent>
            </Card>
        </aside>
    )
}

export default function Welcome() {
    // Je recupere l'utilisateur pour savoir si je montre "Connexion" ou "Dashboard"
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <Head title="Bienvenue" />

            {/* --- HEADER FLOTTANT --- */}
            <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-lg">
                    <Zap className="h-5 w-5 text-primary" />
                    Techknè Portal
                </div>
                {/* Menu caché sur mobile */}
                <div className="hidden sm:flex gap-4 text-sm text-muted-foreground">
                    <a href="#presentation" className="hover:text-primary">Offre</a>
                    <a href="#solutions" className="hover:text-primary">Fonctionnalités</a>
                    <a href="#actualites" className="hover:text-primary">News</a>
                </div>
            </div>

            <main className="max-w-6xl mx-auto p-4 md:py-8 flex gap-8">

                {/* COLONNE PRINCIPALE (CONTENU) */}
                <div className="flex-1 space-y-12">

                    {/* --- SECTION 1 : HERO (L'accroche) --- */}
                    <section id="presentation" className="scroll-mt-20">
                        <Card className="overflow-hidden border-primary/20 shadow-lg bg-gradient-to-br from-background to-primary/5">
                            <CardHeader className="pb-6 pt-10 px-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge>Nouveau</Badge>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Version 4.0</span>
                                </div>
                                <CardTitle className="text-4xl font-extrabold lg:text-5xl leading-tight">
                                    Le Centre de Commande <br/>
                                    <span className="text-primary">pour Studios Digitaux.</span>
                                </CardTitle>
                                <CardDescription className="text-lg mt-4 max-w-xl">
                                    Centralisez votre gestion commerciale, le suivi de vos projets et le pilotage de votre infrastructure cloud. Une seule plateforme pour tout orchestrer.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-8 pb-10">
                                <div className="flex flex-wrap gap-4">
                                    {/* Si connecté, bouton Dashboard. Sinon, boutons d'inscription */}
                                    {auth.user ? (
                                        <Link href={dashboard()}>
                                            <Button size="lg" className="gap-2">
                                                <LayoutDashboard className="h-4 w-4" /> Accéder à mon Espace
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={register()}>
                                                <Button size="lg" className="gap-2">
                                                    Essayer Gratuitement <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={login()}>
                                                <Button variant="outline" size="lg">Se connecter</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="mt-6 flex gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> Sans engagement</span>
                                    <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> Setup instantané</span>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* --- SECTION 2 : SOLUTIONS (Les Pôles) --- */}
                    <section id="solutions" className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-6">Une suite complète d'outils</h2>
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Carte Gestion */}
                            <Card>
                                <CardHeader>
                                    <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                                        <Cpu className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle>Gestion Unifiée</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Gérez vos devis, factures et contrats au même endroit que vos projets techniques. Plus de perte d'information entre les équipes.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Carte Infra */}
                            <Card>
                                <CardHeader>
                                    <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                                        <Workflow className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <CardTitle>Pilotage Cloud (IaaS)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Connectez vos comptes AWS ou GCP. Allumez, éteignez et surveillez vos serveurs clients directement depuis le portail.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Carte BI */}
                            <Card>
                                <CardHeader>
                                    <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                                        <LineChart className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <CardTitle>Rentabilité & BI</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Analysez vos marges réelles en temps réel. Le système croise automatiquement vos revenus facturés avec vos coûts d'infrastructure.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Carte Sécurité */}
                            <Card>
                                <CardHeader>
                                    <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                                        <Lock className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <CardTitle>Sécurité & Droits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Contrôle d'accès granulaire (RBAC). Définissez précisément qui voit quoi : Admin, Chef de Projet ou Client Final.
                                    </p>
                                </CardContent>
                            </Card>

                        </div>
                    </section>

                    <Separator />

                    {/* --- SECTION 3 : ACTUALITÉS --- */}
                    <section id="actualites" className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-6">Dernières mises à jour</h2>
                        <div className="grid gap-4">

                            <Card className="border-l-4 border-l-primary">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between">
                                        <Badge variant="secondary">Nouveau</Badge>
                                        <span className="text-xs text-muted-foreground">Il y a 2 jours</span>
                                    </div>
                                    <CardTitle className="text-lg mt-2">Support étendu AWS & Azure</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Le module de connexion IaaS supporte désormais nativement les instances Spot AWS et les VM Azure pour optimiser vos coûts.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between">
                                        <Badge variant="outline">Roadmap</Badge>
                                        <span className="text-xs text-muted-foreground">Prévu Q4 2024</span>
                                    </div>
                                    <CardTitle className="text-lg mt-2">Connecteur Zapier Universel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Bientôt disponible : connectez Techknè Portal à plus de 5000 applications tierces (Slack, HubSpot, Salesforce) sans coder.
                                    </p>
                                </CardContent>
                            </Card>

                        </div>
                    </section>

                </div>

                {/* COLONNE GAUCHE (SIDEBAR) */}
                <SidebarDesktop />

            </main>
        </AppLayout>
    )
}
