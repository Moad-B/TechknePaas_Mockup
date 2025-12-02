import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
// J'importe mes icones
import { DollarSign, Ticket, Cloud, Server, Globe, Mail, Power, Activity, BarChart, ExternalLink, Clock, Zap } from 'lucide-react'

export default function DashboardUser() {

    // Etats pour la fenetre popup (Modale)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [serviceSelectionne, setServiceSelectionne] = useState(null)

    // Fonction pour ouvrir la fenetre quand on clique sur "Gerer"
    const ouvrirGestionService = (nomDuService, typeDuService) => {
        setServiceSelectionne({ name: nomDuService, type: typeDuService })
        setIsModalOpen(true)
    }

    return (
        <div className="grid gap-6 p-4">

            {/* EN-TÊTE CLIENT */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Espace Client</h1>
                <p className="text-sm text-muted-foreground">Bienvenue sur votre portail de gestion.</p>
            </div>

            {/* --- SECTION 1 : MES SERVICES (Le truc important) --- */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" /> Mes Services Hébergés
                </h2>

                <div className="grid gap-4 md:grid-cols-2">

                    {/* Service 1 : Site Web */}
                    <Card className="hover:border-primary/50 transition-all">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-medium flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-blue-500" />
                                    Site E-commerce (Prod)
                                </CardTitle>
                                <CardDescription className="font-mono text-xs">srv-web-01</CardDescription>
                            </div>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">En ligne</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm mb-4 text-muted-foreground">
                                <span>CPU: 12%</span>
                                <span>RAM: 2.4GB</span>
                            </div>
                            <Button
                                variant="secondary"
                                className="w-full gap-2"
                                onClick={() => ouvrirGestionService('Site E-commerce', 'website')}
                            >
                                <Zap className="h-4 w-4" /> Gérer le serveur
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Service 2 : Mail */}
                    <Card className="hover:border-primary/50 transition-all">
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-medium flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-orange-500" />
                                    Serveur Mail Pro
                                </CardTitle>
                                <CardDescription className="font-mono text-xs">srv-mail-01</CardDescription>
                            </div>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">En ligne</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm mb-4 text-muted-foreground">
                                <span>CPU: 4%</span>
                                <span>RAM: 1.1GB</span>
                            </div>
                            <Button
                                variant="secondary"
                                className="w-full gap-2"
                                onClick={() => ouvrirGestionService('Serveur Mail', 'mail')}
                            >
                                <Zap className="h-4 w-4" /> Gérer le serveur
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>

            {/* --- SECTION 2 : SUIVI DE PROJET --- */}
            <div className="grid gap-4 lg:grid-cols-3">

                {/* Avancement Global (Camembert) */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Avancement du Projet</CardTitle>
                        <CardDescription>Refonte Site Vitrine v2</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-4">
                            {/* Cercle fait a la main en CSS */}
                            <div className="relative h-40 w-40 rounded-full" style={{ background: 'conic-gradient(oklch(0.72 0.11 150) 0% 75%, transparent 75% 100%)', border: '10px solid #f3f4f6' }}>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-bold">75%</span>
                                    <span className="text-xs text-muted-foreground">Complété</span>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-center text-muted-foreground">
                                Phase actuelle : <strong>Développement Front-End</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Prochaines Livraisons (Liste) */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Prochaines Livraisons</CardTitle>
                        <CardDescription>Ce qui arrive bientôt</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">

                            {/* Tache 1 */}
                            <div className="rounded-lg border p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="font-medium">Intégration Stripe (Paiements)</div>
                                    <div className="text-xs text-muted-foreground">Pour le 20/11</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Progress value={80} className="h-2" />
                                    <span className="text-xs text-muted-foreground w-8">80%</span>
                                </div>
                            </div>

                            {/* Tache 2 */}
                            <div className="rounded-lg border p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="font-medium">Tests Utilisateurs</div>
                                    <div className="text-xs text-muted-foreground">Pour le 23/11</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Progress value={30} className="h-2" />
                                    <span className="text-xs text-muted-foreground w-8">30%</span>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- SECTION 3 : ACTIONS RAPIDES --- */}
            <Card>
                <CardHeader>
                    <CardTitle>Besoin d'aide ?</CardTitle>
                    <CardDescription>Actions fréquentes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Button className="h-14 justify-start gap-3 text-left">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <DollarSign className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <span className="block font-semibold">Voir mes factures</span>
                                <span className="text-xs font-normal text-muted-foreground">Accéder à l'historique</span>
                            </div>
                        </Button>

                        <Button variant="secondary" className="h-14 justify-start gap-3 text-left">
                            <div className="bg-muted p-2 rounded-full">
                                <Ticket className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                                <span className="block font-semibold">Ouvrir un ticket</span>
                                <span className="text-xs font-normal text-muted-foreground">Contacter le support</span>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* --- LA FENETRE MODALE (POPUP) --- */}
            {/* Elle s'affiche seulement si isModalOpen est vrai */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">

                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">SERVEUR</Badge>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Running</Badge>
                        </div>
                        <DialogTitle className="text-2xl">
                            {serviceSelectionne?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Gérez l'alimentation et les accès de votre machine virtuelle.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">

                        {/* Bloc 1 : Boutons Start/Stop */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contrôle Technique</h3>
                            <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <Power className="h-5 w-5 text-slate-800" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Alimentation</p>
                                    <p className="text-xs text-muted-foreground">Redémarrer en cas de plantage.</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                                        Arrêter
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Redémarrer
                                    </Button>
                                </div>
                            </div>

                            {/* Bloc 2 : Switch Mode Eco */}
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-base">Mode Éco (Nuit)</Label>
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Éteindre automatiquement entre 22h et 06h.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </div>

                        <Separator />

                        {/* Bloc 3 : Liens (Change selon le type de service) */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Liens Utiles</h3>

                            {serviceSelectionne?.type === 'website' ? (
                                // Si c'est un Site Web
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="secondary" className="w-full justify-between h-auto py-3 px-4">
                                        <div className="text-left">
                                            <span className="block text-sm font-medium">Google Analytics</span>
                                            <span className="block text-[10px] text-muted-foreground">Statistiques</span>
                                        </div>
                                        <ExternalLink className="h-4 w-4 opacity-50" />
                                    </Button>
                                    <Button variant="secondary" className="w-full justify-between h-auto py-3 px-4">
                                        <div className="text-left">
                                            <span className="block text-sm font-medium">Sentry Logs</span>
                                            <span className="block text-[10px] text-muted-foreground">Erreurs</span>
                                        </div>
                                        <ExternalLink className="h-4 w-4 opacity-50" />
                                    </Button>
                                </div>
                            ) : (
                                // Si c'est un Mail
                                <Button variant="secondary" className="w-full justify-between h-auto py-3 px-4">
                                    <div className="text-left">
                                        <span className="block text-sm font-medium">Accès Webmail</span>
                                        <span className="block text-[10px] text-muted-foreground">Lire mes mails</span>
                                    </div>
                                    <ExternalLink className="h-4 w-4 opacity-50" />
                                </Button>
                            )}
                        </div>
                    </div>

                </DialogContent>
            </Dialog>

        </div>
    )
}
