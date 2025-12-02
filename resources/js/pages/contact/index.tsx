import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {

    // Petite fonction pour simuler l'envoi
    function quandOnEnvoie(e) {
        e.preventDefault();
        alert("Merci ! Votre demande de projet a bien été transmise à l'équipe Techknè.");
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Contact', href: '/contact' }]}>
            <Head title="Nous Contacter" />

            <div className="mx-auto max-w-5xl p-4 py-12 lg:p-8">

                <div className="grid gap-8 lg:grid-cols-2">

                    {/* --- COLONNE GAUCHE : PRESENTATION STUDIO --- */}
                    <div className="flex flex-col justify-center space-y-6">

                        {/* Texte plus orienté "Tech" et "Solution" */}
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Transformons vos idées en solutions robustes.</h1>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Besoin d'une intégration complexe, d'un développement sur mesure ou d'orchestrer vos flux métiers ?
                                L'équipe Techknè Studio est prête à relever le défi.
                            </p>
                        </div>

                        {/* Coordonnées fictives du studio */}
                        <div className="space-y-4">

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>hello@techkne-portal.io</span>
                            </div>

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-5 w-5 text-primary" />
                                <span>+33 1 99 88 77 66</span>
                            </div>

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>Station F, Paris (France)</span>
                            </div>
                        </div>
                    </div>

                    {/* --- COLONNE DROITE : FORMULAIRE DE PROJET --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Démarrer une collaboration</CardTitle>
                            <CardDescription>Parlez-nous de vos besoins techniques ou fonctionnels.</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-4" onSubmit={quandOnEnvoie}>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">Prénom</Label>
                                        <Input id="firstname" placeholder="Alice" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Nom</Label>
                                        <Input id="lastname" placeholder="Martin" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Professionnel</Label>
                                    <Input id="email" type="email" placeholder="alice@entreprise.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Détails du projet</Label>
                                    {/* Le placeholder donne des idées au client */}
                                    <Textarea
                                        id="message"
                                        placeholder="Ex: Je souhaite connecter mon ERP avec mon site e-commerce et automatiser la facturation..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                <Button className="w-full gap-2">
                                    <Send className="h-4 w-4" /> Envoyer la demande
                                </Button>

                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AppLayout>
    );
}
