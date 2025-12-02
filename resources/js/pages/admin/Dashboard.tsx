
import { Head } from '@inertiajs/react';
// J'importe les briques d'interface
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
// Icônes
import { Activity, CreditCard, Server, Layout, AlertTriangle, CheckCircle2, User, Globe, Database } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <Head title="Tableau de Bord" />

            <div className="flex flex-col gap-6 p-4 pt-6">

                {/* --- 1. EN-TÊTE --- */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
                    <p className="text-muted-foreground">Bienvenue sur le centre de commande Techknè Portal.</p>
                </div>

                {/* --- 2. CHIFFRES CLÉS (KPIs) --- */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* Chiffre d'affaires */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12 850 €</div>
                            <p className="text-xs text-muted-foreground">+20% par rapport au mois dernier</p>
                        </CardContent>
                    </Card>

                    {/* Projets */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Projets en cours</CardTitle>
                            <Layout className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">7 Actifs</div>
                            <p className="text-xs text-muted-foreground">Dont 2 livraisons cette semaine</p>
                        </CardContent>
                    </Card>

                    {/* Infrastructure */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Serveurs (IaaS)</CardTitle>
                            <Server className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12 Instances</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600 font-medium">100% Uptime</span> sur les 30 derniers jours
                            </p>
                        </CardContent>
                    </Card>

                    {/* Support */}
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

                {/* --- 3. LES ONGLETS PAR PÔLE --- */}
                <Tabs defaultValue="infra" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="infra">Infrastructure</TabsTrigger>
                        <TabsTrigger value="gestion">Gestion</TabsTrigger>
                        <TabsTrigger value="support">Support</TabsTrigger>
                    </TabsList>

                    {/* Contenu Onglet 1 : INFRASTRUCTURE */}
                    <TabsContent value="infra" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>État des Serveurs</CardTitle>
                                <CardDescription>Monitoring en temps réel des instances AWS/GCP.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Tableau fait a la main */}
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nom du Serveur</TableHead>
                                            <TableHead>Fournisseur</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead>CPU</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-gray-500" />
                                                api-gateway-prod
                                            </TableCell>
                                            <TableCell>AWS EC2</TableCell>
                                            <TableCell>
                                                <Badge className="bg-green-500 hover:bg-green-600">En ligne</Badge>
                                            </TableCell>
                                            <TableCell>32%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                {/* C'est ici que ca plantait avant ! */}
                                                <Database className="h-4 w-4 text-gray-500" />
                                                primary-db-rds
                                            </TableCell>
                                            <TableCell>AWS RDS</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-orange-100 text-orange-700">Dégradé</Badge>
                                            </TableCell>
                                            <TableCell>68%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Server className="h-4 w-4 text-gray-500" />
                                                worker-process-01
                                            </TableCell>
                                            <TableCell>Google Cloud</TableCell>
                                            <TableCell>
                                                <Badge variant="destructive">Hors ligne</Badge>
                                            </TableCell>
                                            <TableCell>0%</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contenu Onglet 2 : GESTION (Documents) */}
                    <TabsContent value="gestion" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Dernières Pièces Écrites</CardTitle>
                                <CardDescription>Devis, Factures et Contrats récents.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Document</TableHead>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>État</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Facture #INV-10245</TableCell>
                                            <TableCell>AlphaCorp</TableCell>
                                            <TableCell>14/11/2025</TableCell>
                                            <TableCell><Badge variant="outline">Envoyé</Badge></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Devis #Q-2025-44</TableCell>
                                            <TableCell>BetaSolutions</TableCell>
                                            <TableCell>11/11/2025</TableCell>
                                            <TableCell><Badge className="bg-green-500">Signé</Badge></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Contrat Maintenance</TableCell>
                                            <TableCell>Gamma Systems</TableCell>
                                            <TableCell>07/11/2025</TableCell>
                                            <TableCell><Badge variant="secondary">Brouillon</Badge></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contenu Onglet 3 : SUPPORT */}
                    <TabsContent value="support" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tickets Récents</CardTitle>
                                <CardDescription>Demandes clients en attente de traitement.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Liste de tickets faite a la main */}
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-red-100 p-2 rounded-full">
                                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Panne API Production</p>
                                                <p className="text-sm text-muted-foreground">Client: AlphaCorp • Il y a 2h</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">Voir</Button>
                                    </div>

                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Demande d'accès User</p>
                                                <p className="text-sm text-muted-foreground">Client: BetaSolutions • Il y a 5h</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">Voir</Button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Question Facturation</p>
                                                <p className="text-sm text-muted-foreground">Client: Gamma • Hier</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">Voir</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </>
    );
}
