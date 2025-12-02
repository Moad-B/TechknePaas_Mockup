import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';

export default function CreateTicket() {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Support', href: '/support' },
            { title: 'Nouveau Ticket', href: '/support/create' },
        ]}>
            <Head title="Nouveau Ticket" />

            <div className="mx-auto max-w-3xl p-4 py-8 lg:p-12">

                <Link href="/support" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Annuler et retour
                </Link>

                <div className="space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Décrivez votre problème</h1>
                    <p className="text-lg text-muted-foreground">
                        Plus vous donnez de détails, plus vite nous pourrons résoudre l'incident.
                    </p>
                </div>

                <Card className="border-muted shadow-md">
                    <CardHeader>
                        <CardTitle>Informations du ticket</CardTitle>
                        <CardDescription>Ce ticket sera assigné automatiquement à l'équipe compétente.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Sujet */}
                        <div className="space-y-2">
                            <Label htmlFor="subject">Sujet de la demande <span className="text-red-500">*</span></Label>
                            <Input id="subject" placeholder="Ex: Erreur 500 sur la page de paiement" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Service */}
                            <div className="space-y-2">
                                <Label htmlFor="service">Service concerné</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="billing">Facturation & Compte</SelectItem>
                                        <SelectItem value="hosting">Hébergement / Serveur</SelectItem>
                                        <SelectItem value="bug">Bug Logiciel</SelectItem>
                                        <SelectItem value="feature">Demande d'évolution</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Priorité */}
                            <div className="space-y-2">
                                <Label htmlFor="priority">Urgence</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Niveau d'urgence..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Basse (Info)</SelectItem>
                                        <SelectItem value="medium">Moyenne (Gênant)</SelectItem>
                                        <SelectItem value="high">Haute (Bloquant)</SelectItem>
                                        <SelectItem value="critical">Critique (Site HS)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="desc">Description détaillée <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="desc"
                                placeholder="Décrivez les étapes pour reproduire le problème..."
                                className="min-h-[200px] resize-y"
                            />
                            <p className="text-xs text-muted-foreground text-right">Markdown supporté</p>
                        </div>

                        {/* Upload */}
                        <div className="flex items-center gap-4 p-4 border border-dashed rounded-lg bg-muted/20">
                            <Button variant="outline" size="sm" type="button" className="gap-2">
                                <Paperclip className="h-4 w-4" /> Ajouter des captures d'écran
                            </Button>
                            <span className="text-xs text-muted-foreground">JPG, PNG, PDF (Max 5Mo)</span>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between bg-muted/10 p-6">
                        <Button variant="ghost" type="button">Sauvegarder brouillon</Button>
                        <Button size="lg" className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            Envoyer le ticket <Send className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </AppLayout>
    );
}
