import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck, Search, Filter, MoreHorizontal, AlertTriangle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock Admin : On voit TOUS les tickets de TOUS les clients
const ALL_TICKETS = [
    { id: 'T-1042', client: 'AlphaCorp', subject: 'Erreur sync AWS', status: 'En cours', priority: 'Haute', agent: 'Moad B.' },
    { id: 'T-1041', client: 'BetaSolutions', subject: 'Accès user', status: 'Nouveau', priority: 'Basse', agent: '--' },
    { id: 'T-1039', client: 'GammaSarl', subject: 'Facturation', status: 'Répondu', priority: 'Moyenne', agent: 'Sarah J.' },
    { id: 'T-1038', client: 'DeltaTech', subject: 'Bug critique Prod', status: 'En cours', priority: 'Critique', agent: 'Moad B.' },
];

export default function SupportAdminIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Support Admin', href: '/support' }]}>
            <Head title="Administration Support" />

            <div className="p-4 lg:p-8 space-y-6">

                {/* KPI Admin */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tickets Ouverts</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+2 depuis hier</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Critiques</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">3</div>
                            <p className="text-xs text-muted-foreground">Nécessite attention immédiate</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Résolus (Semaine)</CardTitle>
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45</div>
                            <p className="text-xs text-muted-foreground">+18% vs semaine dernière</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Temps Moyen Réponse</CardTitle>
                            <ClockIcon />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1h 42m</div>
                            <p className="text-xs text-muted-foreground">Objectif: &lt; 2h</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Console de Gestion */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Console de Supervision</CardTitle>
                                <CardDescription>Gérez les tickets entrants et assignez les agents.</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Filtrer par client, ID..." className="pl-8" />
                                </div>
                                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Sujet</TableHead>
                                    <TableHead>Priorité</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Agent</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ALL_TICKETS.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-mono">{ticket.id}</TableCell>
                                        <TableCell className="font-medium">{ticket.client}</TableCell>
                                        <TableCell>{ticket.subject}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                ticket.priority === 'Critique' ? 'bg-red-100 text-red-700 border-red-200' :
                                                    ticket.priority === 'Haute' ? 'text-orange-700 bg-orange-50 border-orange-200' : ''
                                            }>
                                                {ticket.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={ticket.status === 'Nouveau' ? 'default' : 'secondary'}>
                                                {ticket.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{ticket.agent}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Voir détails</DropdownMenuItem>
                                                    <DropdownMenuItem>Assigner...</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">Fermer ticket</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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

function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
