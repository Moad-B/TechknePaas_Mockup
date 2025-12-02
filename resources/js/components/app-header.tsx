import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen, Folder, LayoutGrid, Menu, Users, Shield, Boxes,
    Brain, FileText, Terminal, Receipt, FileSignature,
    Activity, Database, ChevronDown, Globe, FlaskConical, Code, PenTool
} from 'lucide-react';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import AppearanceTabs from '@/components/appearance-tabs-nav';

// Je garde tes listes de données ici pour que le code en bas reste propre
const mockDeliverableItems = [
    { title: 'Application (Prod)', href: '#', icon: Globe },
    { title: 'Serveur de Test', href: '#', icon: FlaskConical },
    { title: 'Dépôt Source', href: '#', icon: Code },
    { title: 'Maquettes Design', href: '#', icon: PenTool },
];
const mockWritingItems = [
    { title: 'Devis', href: '#', icon: FileText },
    { title: 'Factures', href: '#', icon: Receipt },
    { title: 'Contrats', href: '#', icon: FileSignature },
];
const mockDevItems = [
    { title: 'Ipaas', href: '#', icon: Terminal },
    { title: 'Telescope', href: '#', icon: Activity },
    { title: 'Orchestrateur', href: '#', icon: Database },
];
const rightNavItems = [
    { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: Folder },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen },
];

export function AppHeader({ breadcrumbs = [] }) {
    const page = usePage();
    const { auth } = page.props; // Je récupère mes infos auth
    const getInitials = useInitials();
    const unifiedLinkStyle = cn(navigationMenuTriggerStyle(), "h-9 cursor-pointer px-3 bg-transparent w-full justify-start md:justify-center md:w-auto font-medium");

    // --- LOGIQUE DEBUTANT ---

    // 1. Je vérifie si l'utilisateur est connecté
    const estConnecte = auth.user !== null;

    // 2. Je récupère les rôles (je gère le singulier 'role' ou pluriel 'roles' pour pas que ça plante)
    const mesRoles = auth.role || auth.roles || [];

    // 3. Je regarde si "Admin" ou "Superadmin" est dans ma liste de rôles
    const estAdmin = mesRoles.includes('Admin') || mesRoles.includes('Superadmin');

    // 4. C'est ici que je décide quel lien afficher pour "Produits"
    let lienProduits = '/product'; // Par défaut, c'est la page publique
    if (estAdmin) {
        lienProduits = '/admin/products'; // Si je suis admin, je vais vers l'administration
    }

    // Ma liste de liens principaux avec le lien dynamique
    const liensPrincipaux = [
        { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
        { title: 'Products', href: lienProduits, icon: Boxes },
    ];

    const rbacItems = [
        { title: 'Users', href: '/admin/users', icon: Users },
        { title: 'Gestion des Rôles', href: '/admin/roles', icon: Shield },
    ];

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">

                    {/* MOBILE */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-72 flex-col bg-sidebar p-0">
                                <SheetHeader className="border-b p-4 text-left">
                                    <div className="flex items-center gap-2">
                                        <AppLogoIcon className="h-6 w-6 fill-current" />
                                        <span className="font-bold">Techknè Portal</span>
                                    </div>
                                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto px-4 py-4">
                                    <div className="flex flex-col space-y-4">
                                        {/* J'affiche mes liens principaux */}
                                        <div className="flex flex-col space-y-1">
                                            {liensPrincipaux.map((item) => (
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-2 py-2 font-medium">
                                                    <Icon iconNode={item.icon} className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                            {estAdmin && (
                                                <Link href="/admin/hub-intelligence" className="flex items-center space-x-2 py-2 font-medium">
                                                    <Brain className="h-4 w-4" />
                                                    <span>Hub Intel.</span>
                                                </Link>
                                            )}
                                        </div>

                                        {/* Menus Accordéons Mobile */}
                                        <Accordion type="multiple" className="w-full">
                                            {estConnecte && (
                                                <AccordionItem value="livrables" className="border-b-0">
                                                    <AccordionTrigger className="py-2 font-semibold">Mes Livrables</AccordionTrigger>
                                                    <AccordionContent className="pl-4">
                                                        {mockDeliverableItems.map((item) => (
                                                            <Link key={item.title} href={item.href} className="flex items-center space-x-2 py-2 font-medium">{item.title}</Link>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )}

                                            {/* 5. J'affiche le menu RBAC seulement si c'est un Admin */}
                                            {estAdmin && (
                                                <AccordionItem value="rbac" className="border-b-0">
                                                    <AccordionTrigger className="py-2 font-semibold">RBAC</AccordionTrigger>
                                                    <AccordionContent className="pl-4">
                                                        {rbacItems.map((item) => (
                                                            <Link key={item.title} href={item.href} className="flex items-center space-x-2 py-2 font-medium">{item.title}</Link>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )}
                                        </Accordion>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href={dashboard()} className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* BUREAU (PC) */}
                    <div className="ml-6 hidden h-full items-center gap-1 lg:flex">
                        {/* Boucle simple pour les liens principaux */}
                        {liensPrincipaux.map((item) => (
                            <Link key={item.title} href={item.href} className={unifiedLinkStyle}>
                                <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}

                        {estAdmin && (
                            <Link href="/admin/hub-intelligence" className={unifiedLinkStyle}>
                                <Brain className="mr-2 h-4 w-4" />
                                Hub Intel.
                            </Link>
                        )}

                        {estConnecte && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className={unifiedLinkStyle}>
                                    <Globe className="mr-2 h-4 w-4" /> Mes Livrables <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {mockDeliverableItems.map((item) => (
                                        <DropdownMenuItem key={item.title} asChild>
                                            <Link href={item.href}>{item.title}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        {estAdmin && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className={unifiedLinkStyle}>
                                    <Shield className="mr-2 h-4 w-4" /> RBAC <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {rbacItems.map((item) => (
                                        <DropdownMenuItem key={item.title} asChild>
                                            <Link href={item.href}>{item.title}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Droite : Profil ou Connexion */}
                    <div className="ml-auto flex items-center space-x-2">
                        <AppearanceTabs />
                        {estConnecte ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} />
                                            <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href={login()} className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm">Se connecter</Link>
                                <Link href={register()} className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">Créer un compte</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
