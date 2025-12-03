import React from 'react';
// CORRECTION : On revient sur ton layout personnalisé
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

// Briques d'interface (Shadcn UI)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// Icônes Lucide
import { Activity, CreditCard, Server, Layout, AlertTriangle, CheckCircle2, User, Globe, Database, Users } from 'lucide-react';

// Définition des données reçues du Controller
interface DashboardProps {
    auth: any;
    userName: string;
    total_revenue: string;
    total_users: number;
}

export default function Dashboard({ auth, userName, total_revenue, total_users }: DashboardProps) {
    return (
        // CORRECTION : Utilisation de AppLayout
        <AppLayout>
            <Head title="Tableau de Bord Admin" />

            <div className="flex flex-col gap-6 p-4 pt-6">

                {/* --- 1. EN-TÊTE DYNAMIQUE --- */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
                    <p className="text-muted-foreground">
                        Bonjour <span className="font-bold text-violet-800">{userName}</span>, voici le centre de commande Techknè Portal.
                    </p>
                </div>

                {/* --- 2. CHIFFRES CLÉS (KPIs Connectés au Controller) --- */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* KPI 1 : Revenus (Dynamique) */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{total_revenue}</div>
                            <p className="text-xs text-muted-foreground">Vue consolidée Admin</p>
                        </CardContent>
                    </Card>

                    {/* KPI 2 : Utilisateurs (Dynamique) */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clients Inscrits</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{total_users}</div>
                            <p className="text-xs text-muted-foreground">Utilisateurs actifs</p>
                        </CardContent>
                    </Card>

                    {/* KPI 3 : Infrastructure */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Serveurs (IaaS)</CardTitle>
                            <Server className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12 Instances</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600 font-medium">100% Uptime</span>
                            </p>
                        </CardContent>
                    </Card>

                    {/* KPI 4 : Support */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tickets Support</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">23 Ouverts</div>
                            <p className="text-xs text-muted-foreground">4 urgents à traiter</p>
                        </CardContent>
                    </Card>
                </div>

                {/* --- 3. LES ONGLETS --- */}
                <Tabs defaultValue="infra" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="infra">Infrastructure</TabsTrigger>
                        <TabsTrigger value="gestion">Gestion</TabsTrigger>
                        <TabsTrigger value="support">Support</TabsTrigger>
                    </TabsList>

                    {/* Onglet INFRA */}
                    <TabsContent value="infra" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>État des Serveurs</CardTitle>
                                <CardDescription>Vue Admin globale sur l'infrastructure client.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom du Serveur</TableHead>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-gray-500" />
                                                api-gateway-prod
                                            </TableCell>
                                            <TableCell>AlphaCorp</TableCell>
                                            <TableCell><Badge className="bg-green-500">En ligne</Badge></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Database className="h-4 w-4 text-gray-500" />
                                                db-primary
                                            </TableCell>
                                            <TableCell>BetaSolutions</TableCell>
                                            <TableCell><Badge variant="secondary" className="bg-orange-100 text-orange-700">Maintenance</Badge></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Onglet GESTION */}
                    <TabsContent value="gestion" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Dernières Factures</CardTitle>
                                <CardDescription>Flux financier entrant.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-500 text-center py-8">
                                    Données de facturation bientôt connectées au Controller.
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Onglet SUPPORT */}
                    <TabsContent value="support" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tickets Récents</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-red-100 p-2 rounded-full">
                                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-extrabold">client site web</p>
                                                <p className="text-sm text-muted-foreground">Client: AlphaCorp</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">Gérer</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </AppLayout>
    );
}

