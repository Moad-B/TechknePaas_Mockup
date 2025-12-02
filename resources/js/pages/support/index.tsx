import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react'; // Import du router pour la navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LifeBuoy, PlusCircle, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Données Mockées
const MOCK_TICKETS = [
    { id: 'T-1042', subject: 'Erreur de synchronisation AWS (Connector v2)', status: 'En cours', priority: 'Haute', date: 'Aujourd\'hui', category: 'Technique' },
    { id: 'T-1041', subject: 'Demande d\'accès utilisateur supplémentaire', status: 'Fermé', priority: 'Basse', date: 'Hier', category: 'Compte' },
    { id: 'T-1039', subject: 'Question sur la facturation T3 2024', status: 'Répondu', priority: 'Moyenne', date: 'Il y a 3 jours', category: 'Facturation' },
    { id: 'T-1035', subject: 'Bug affichage Dashboard sur mobile', status: 'Fermé', priority: 'Moyenne', date: 'Il y a 1 semaine', category: 'Interface' },
];

export default function SupportIndex() {

    // Fonction pour naviguer vers la page de détail (Mock)
    const handleRowClick = () => {
        // Dans une vraie app, on passerait l'ID : router.visit(`/support/${ticketId}`)
        // Ici, on redirige vers notre page mock unique
        router.visit('/support/ticket');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Support', href: '/support' }]}>
            <Head title="Centre de Support" />

            <div className="p-4 lg:p-8 space-y-8">

                {/* 1. Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <LifeBuoy className="h-6 w-6 text-primary" /> Centre de Support
                        </h1>
                        <p className="text-muted-foreground">
                            Suivez vos demandes et incidents en cours.
                        </p>
                    </div>
                    <Button className="gap-2 shadow-sm">
                        <PlusCircle className="h-4 w-4" /> Nouveau ticket
                    </Button>
                </div>

                {/* 2. Recherche & Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-medium">Recherche Rapide</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Rechercher un ticket par ID ou sujet..."
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium flex items-center gap-2">
                                Statut Global
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                    Systèmes nominaux
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Temps de réponse moyen : &lt; 2h
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. Tableau Interactif */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tickets Récents</CardTitle>
                        <CardDescription>Cliquez sur une ligne pour voir les détails.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">ID</TableHead>
                                    <TableHead>Sujet</TableHead>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead>Priorité</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_TICKETS.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        className="cursor-pointer hover:bg-muted/50 transition-colors group"
                                        onClick={handleRowClick} // <-- C'est ici que la magie opère
                                    >
                                        <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                                            {ticket.id}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {ticket.subject}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal text-muted-foreground">
                                                {ticket.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={
                                                ticket.priority === 'Haute' ? 'bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400' : ''
                                            }>
                                                {ticket.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={ticket.status} />
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground text-sm">
                                            {ticket.date}
                                        </TableCell>
                                        <TableCell>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Helper pour les badges de statut
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        'En cours': 'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
        'Répondu': 'bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
        'Fermé': 'bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400',
    };

    return (
        <Badge variant="secondary" className={styles[status] || ''}>
            {status}
        </Badge>
    );
}
