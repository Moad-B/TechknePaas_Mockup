import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    LifeBuoy,
    Plus,
    FileText,
    MessageSquare,
    ChevronRight,
    Clock,
    CheckCircle2
} from 'lucide-react';

// Mock des tickets de l'utilisateur connecté uniquement
const MY_TICKETS = [
    { id: 'T-1042', subject: 'Erreur de synchronisation AWS', status: 'En cours', updated: 'Il y a 2h' },
    { id: 'T-1039', subject: 'Facture T3 manquante', status: 'Répondu', updated: 'Hier' },
    { id: 'T-1010', subject: 'Accès développeur', status: 'Fermé', updated: 'Le 12 Oct.' },
];

export default function ClientSupportIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Mon Support', href: '/support' }]}>
            <Head title="Mon Support" />

            <div className="mx-auto max-w-5xl p-4 py-8 lg:p-10 space-y-10">

                {/* 1. Hero Section : Accueil & Action */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-2">
                        <LifeBuoy className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Bonjour, comment pouvons-nous vous aider ?</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Consultez notre documentation ou ouvrez un ticket. Notre équipe technique répond généralement en moins de 2 heures.
                    </p>

                    <div className="pt-4 flex justify-center gap-4">
                        <Link href="/support/create">
                            <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                                <Plus className="h-5 w-5" /> Ouvrir un nouveau ticket
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="gap-2">
                            <FileText className="h-5 w-5" /> Consulter le Wiki
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* 2. Grid : Mes Tickets & FAQ Rapide */}
                <div className="grid gap-8 md:grid-cols-3">

                    {/* Colonne de Gauche : Mes Tickets (2/3) */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold tracking-tight">Mes demandes récentes</h2>
                            <Link href="#" className="text-sm text-primary hover:underline">Voir tout l'historique</Link>
                        </div>

                        <div className="grid gap-3">
                            {MY_TICKETS.map((ticket) => (
                                <Link key={ticket.id} href="/support/ticket"> {/* Lien vers le show mocké */}
                                    <Card className="group hover:border-primary/50 transition-all cursor-pointer hover:shadow-sm">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-full ${ticket.status === 'En cours' ? 'bg-blue-100 text-blue-600' : ticket.status === 'Fermé' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-600'}`}>
                                                    {ticket.status === 'Fermé' ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium group-hover:text-primary transition-colors">{ticket.subject}</h3>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                        <span className="font-mono">{ticket.id}</span>
                                                        <span>•</span>
                                                        <span>Mis à jour {ticket.updated}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={ticket.status === 'En cours' ? 'default' : 'secondary'}>
                                                    {ticket.status}
                                                </Badge>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Colonne de Droite : Aide Rapide (1/3) */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold tracking-tight">Questions fréquentes</h2>
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-0 space-y-1">
                                {[
                                    "Comment configurer mes clés AWS ?",
                                    "Comprendre ma facture mensuelle",
                                    "Ajouter un utilisateur au projet",
                                    "L'API renvoie une erreur 401"
                                ].map((faq, i) => (
                                    <Button key={i} variant="ghost" className="w-full justify-start text-left h-auto py-3 text-muted-foreground hover:text-primary whitespace-normal">
                                        <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
                                        {faq}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                            <CardContent className="p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-1">Besoin d'un devis ?</h3>
                                <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mb-3">
                                    Pour les évolutions majeures de votre projet, contactez directement votre chef de projet.
                                </p>
                                <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/50">
                                    Contacter le Commercial
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
