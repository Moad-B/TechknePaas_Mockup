import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, Paperclip, Clock, CheckCircle2, AlertCircle, MoreHorizontal } from 'lucide-react';

// --- DONNÉES MOCKÉES (Pour la démo) ---
const TICKET = {
    id: 'T-1042',
    subject: 'Erreur de synchronisation AWS (Connector v2)',
    status: 'En cours',
    priority: 'Haute',
    created_at: '20 oct. 2023 à 09:30',
    service: 'Connecteur IaaS / AWS',
    messages: [
        {
            id: 1,
            author: 'Jean Dupont',
            role: 'Client',
            avatar: null, // null = fallback initials
            content: "Bonjour, depuis ce matin je remarque que mes instances EC2 ne remontent plus dans le dashboard. J'ai une erreur 500 quand j'essaie de forcer la synchro.",
            date: '20 oct. 09:30',
            is_staff: false,
        },
        {
            id: 2,
            author: 'Support Techknè',
            role: 'Support Agent',
            avatar: '/images/support-avatar.png',
            content: "Bonjour Jean. Nous avons bien reçu votre alerte. Nos équipes DevOps regardent les logs de l'API AWS. Avez-vous modifié vos clés IAM récemment ?",
            date: '20 oct. 09:45',
            is_staff: true,
        },
        {
            id: 3,
            author: 'Jean Dupont',
            role: 'Client',
            avatar: null,
            content: "Non, aucune modification de notre côté. Par contre, AWS a annoncé une maintenance sur la région eu-west-3, c'est peut-être lié ?",
            date: '20 oct. 10:05',
            is_staff: false,
        }
    ]
};

export default function SupportShow() {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Support', href: '/support' },
            { title: TICKET.id, href: '#' },
        ]}>
            <Head title={`Ticket ${TICKET.id}`} />

            <div className="mx-auto max-w-6xl p-4 lg:p-8">

                {/* Navigation Retour */}
                <div className="mb-6">
                    <Link href="/support" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

                    {/* COLONNE GAUCHE : Conversation */}
                    <div className="space-y-6">
                        {/* En-tête du Ticket */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between">
                                <h1 className="text-2xl font-bold tracking-tight">{TICKET.subject}</h1>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" /> Ouvert le {TICKET.created_at}
                                </span>
                                <Separator orientation="vertical" className="h-4" />
                                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                    Priorité {TICKET.priority}
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        {/* Fil de discussion */}
                        <div className="space-y-6">
                            {TICKET.messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-4 ${msg.is_staff ? 'flex-row-reverse' : ''}`}>
                                    {/* Avatar */}
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={msg.avatar || ''} />
                                        <AvatarFallback className={msg.is_staff ? 'bg-primary text-primary-foreground' : ''}>
                                            {msg.author.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Bulle de message */}
                                    <div className={`flex max-w-[80%] flex-col gap-1 ${msg.is_staff ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{msg.author}</span>
                                            <span className="text-xs text-muted-foreground">{msg.date}</span>
                                        </div>
                                        <div className={`rounded-lg p-4 text-sm shadow-sm ${
                                            msg.is_staff
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-card border text-card-foreground'
                                        }`}>
                                            <p className="leading-relaxed">{msg.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Zone de Réponse */}
                        <Card className="mt-6 border-2 border-muted/40 focus-within:border-primary/50 transition-colors">
                            <CardContent className="p-4">
                                <Textarea
                                    placeholder="Écrivez votre réponse ici..."
                                    className="min-h-[120px] border-0 focus-visible:ring-0 p-0 resize-none shadow-none"
                                />
                            </CardContent>
                            <Separator />
                            <CardFooter className="flex justify-between items-center p-3 bg-muted/20">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    <Paperclip className="mr-2 h-4 w-4" /> Joindre un fichier
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Fermer le ticket</Button>
                                    <Button size="sm" className="gap-2">
                                        Envoyer <Send className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* COLONNE DROITE : Sidebar Info */}
                    <div className="space-y-6">
                        {/* État du Ticket */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                    Détails du Ticket
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">Statut</span>
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2.5 w-2.5">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                                        </span>
                                        <span className="font-medium">{TICKET.status}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">Service Concerné</span>
                                    <div className="flex items-center gap-2 font-medium">
                                        <AlertCircle className="h-4 w-4 text-amber-500" />
                                        {TICKET.service}
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <span className="text-xs text-muted-foreground block mb-1">Responsable</span>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[10px]">ST</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">Support Techknè</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Documentation Suggérée (IA Mock) */}
                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary" /> Solutions Suggérées
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-3">
                                <p className="text-muted-foreground text-xs">Basé sur le sujet de votre ticket :</p>
                                <a href="#" className="block hover:underline text-primary font-medium">
                                    • Comment configurer les clés IAM AWS ?
                                </a>
                                <a href="#" className="block hover:underline text-primary font-medium">
                                    • Comprendre les statuts de synchronisation
                                </a>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
