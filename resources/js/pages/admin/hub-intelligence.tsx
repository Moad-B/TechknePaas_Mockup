import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Brain, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// le graphique
function BurndownChart({ points }) {
    // tailles du graph
    const width = 480
    const height = 180
    const padding = 24

    // calculs math pour les points (trouvé sur internet)
    const maxX = Math.max(1, ...points.map((p) => p.day))
    const maxY = Math.max(1, ...points.map((p) => p.remaining))
    const sx = (x) => padding + (x / maxX) * (width - padding * 2)
    const sy = (y) => height - padding - (y / maxY) * (height - padding * 2)
    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.day).toFixed(2)} ${sy(p.remaining).toFixed(2)}`).join(' ')

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
            <rect x={0} y={0} width={width} height={height} rx={12} className="fill-muted/40" />
            <path d={d} className="stroke-blue-500" fill="none" strokeWidth={2} />
        </svg>
    )
}

// composant pour le cercle de budget
function DonutBudget() {
    return (
       // couleur
        <div className="relative h-44 w-44 rounded-full" style={{ background: `conic-gradient(oklch(0.72 0.11 25) 0% 78%, oklch(0.85 0.03 230) 78% 100%)` }}>
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xs text-muted-foreground font-medium">Rentabilité</div>
                <div className="text-xl font-bold tracking-tight">22%</div>
            </div>
        </div>
    )
}

export default function AdminHubIntelligencePage() {

    return (
        // menu du haut
        <AppLayout breadcrumbs={[
            { title: 'Administration', href: '/admin' },
            { title: 'Hub Intelligence', href: '/admin/hub-intelligence' },
        ]}>
            <Head title="Hub Intelligence" />

            <div className="flex h-full">

                {/* la colonne de gauche */}
                <aside className="w-64 p-4 border-r flex flex-col bg-sidebar/50">
                    <div className="flex-1 overflow-y-auto space-y-6">
                        <div className="space-y-2">
                            <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portefeuille Actif</h2>

                            {/* liste des clients (je les ai mis a la main pour l'instant) */}
                            <Button variant="secondary" className="w-full justify-start font-medium">
                                AlphaCorp eCommerce
                            </Button>
                            <Button variant="ghost" className="w-full justify-start font-medium">
                                BetaSolutions Mobile App
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Historique</h2>
                            {/* boutons grisés */}
                            <Button variant="ghost" className="w-full justify-start text-muted-foreground" disabled>
                                Gamma-Systems (Archivé)
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-muted-foreground" disabled>
                                Delta-Exports (Clôturé)
                            </Button>
                        </div>
                    </div>

                    {/* bouton en bas pour ajouter */}
                    <div className="mt-auto pt-4">
                        <Separator className="mb-4" />
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <Plus className="h-4 w-4" />
                            Connecter un client
                        </Button>
                    </div>
                </aside>

                {/* partie principale a droite */}
                <main className="flex-1 p-8 overflow-auto">
                    <div className="grid gap-8 max-w-6xl mx-auto">

                        {/* titre projet */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold tracking-tight">AlphaCorp eCommerce</h1>
                                <Badge variant="outline" className="text-xs font-normal">En production</Badge>
                            </div>
                            <p className="text-muted-foreground text-lg">Pilotage : Maintenance T4 & Optimisation Infra</p>
                        </div>

                        {/* les deux gros graphiques */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle>Vélocité & Charge (Burndown)</CardTitle>
                                    <CardDescription>Comparaison entre la charge planifiée et le travail réel.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* données du graph en dur */}
                                    <BurndownChart points={[
                                        { day: 0, remaining: 80 },
                                        { day: 2, remaining: 75 },
                                        { day: 4, remaining: 60 },
                                        { day: 6, remaining: 60 },
                                        { day: 8, remaining: 45 },
                                        { day: 10, remaining: 30 },
                                        { day: 12, remaining: 20 },
                                    ]} />
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle>Analyse de Rentabilité</CardTitle>
                                    <CardDescription>Ratio marge nette vs coûts d'infrastructure et humains.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center gap-8 pt-2">
                                        <DonutBudget />
                                        <div className="grid gap-3 text-sm">
                                            {/* legende du donut */}
                                            <div className="flex items-center gap-3">
                                                <span className="h-3 w-3 rounded-full shadow-sm" style={{ background: 'oklch(0.72 0.11 25)' }} />
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-xs uppercase font-semibold">Coûts Réels</span>
                                                    <span className="font-medium text-lg">7 800 €</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="h-3 w-3 rounded-full shadow-sm" style={{ background: 'oklch(0.85 0.03 230)' }} />
                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-xs uppercase font-semibold">Marge Nette</span>
                                                    <span className="font-medium text-lg">2 200 €</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* zone de messages importants */}
                        <Card className="shadow-sm border-l-4 border-l-primary">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-primary" />
                                    <CardTitle>Journal d'Orchestration & Insights</CardTitle>
                                </div>
                                <CardDescription>Interventions automatiques du système et points d'attention détectés.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">

                                {/*  rouge */}
                                <Alert variant="destructive" className="bg-background/50">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="font-semibold">Incident Critique : L'instance 'prod-db' (AWS) ne répond plus</AlertTitle>
                                    <AlertDescription className="text-muted-foreground mt-1 leading-relaxed">
                                        Réaction du système : Un ticket d'urgence (#405) a été ouvert et une tentative de redémarrage est en cours.
                                    </AlertDescription>
                                </Alert>

                                {/* message gris */}
                                <Alert variant="default" className="bg-background/50">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                                    <AlertTitle className="font-semibold">Trésorerie : La facture #INV-088 est en retard de paiement</AlertTitle>
                                    <AlertDescription className="text-muted-foreground mt-1 leading-relaxed">
                                        Action automatique : Une relance amiable a été envoyée au client. Suspension des services prévue dans 48h.
                                    </AlertDescription>
                                </Alert>

                            </CardContent>
                        </Card>

                        {/* tableau des documents */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Statut des Livrables & Documents</CardTitle>
                                <CardDescription>Vue unifiée des éléments administratifs et techniques.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[150px]">Référence</TableHead>
                                            <TableHead>Intitulé</TableHead>
                                            <TableHead>Catégorie</TableHead>
                                            <TableHead className="text-right">État</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>

                                        {/* ligne 1 */}
                                        <TableRow>
                                            <TableCell className="font-mono text-xs text-muted-foreground">DOC-090</TableCell>
                                            <TableCell className="font-medium">Facturation Trimestre 4</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-normal text-muted-foreground">Administratif</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Validé</span>
                                            </TableCell>
                                        </TableRow>

                                        {/* ligne 2 */}
                                        <TableRow>
                                            <TableCell className="font-mono text-xs text-muted-foreground">CTR-2026</TableCell>
                                            <TableCell className="font-medium">Renouvellement Contrat Maintenance</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-normal text-muted-foreground">Commercial</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">En cours</span>
                                            </TableCell>
                                        </TableRow>

                                        {/* ligne 3 */}
                                        <TableRow>
                                            <TableCell className="font-mono text-xs text-muted-foreground">TECH-03</TableCell>
                                            <TableCell className="font-medium">Migration Base de Données (AWS)</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-normal text-muted-foreground">Technique</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Attention</span>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </AppLayout>
    )
}
