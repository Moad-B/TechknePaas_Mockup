import * as React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import Pagination from '@/components/pagination'
// J'importe plein d'icones pour faire joli
import { Heart, Boxes, Info, HelpCircle, ChevronLeft, ChevronRight, FileText, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

// Petite fonction pour afficher une carte produit
// Je prends tout en props direct,
function ProductCard({ item, wished, onToggleWish, onOpen }) {
    return (
        <Card className="group relative overflow-hidden rounded-xl border shadow-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md">

            {/* La zone cliquable avec l'image */}
            <div
                className="relative h-40 w-full overflow-hidden cursor-pointer bg-muted/20"
                onClick={() => onOpen(item)}
            >
                {/* Image bidon pour l'instant (placeholder) */}
                <img
                    src={`https://placehold.co/600x400?text=${item.name}`}
                    alt={item.name}
                    className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
            </div>

            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        {/* Icone de boite pour faire genre c'est un produit */}
                        <Boxes className="h-4 w-4 text-primary" />
                        <div className="text-base font-medium line-clamp-1" title={item.name}>
                            {item.name}
                        </div>
                    </div>
                    {/* Prix en gros et en gras */}
                    <div className="text-primary font-bold whitespace-nowrap">
                        {Number(item.price).toFixed(2)} €
                    </div>
                </div>

                {/* Description courte (coupee si trop longue) */}
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground min-h-[40px]">
                    {item.description || "Aucune description pour ce service."}
                </p>

                {/* Zone du bas : Boutons */}
                <div className="mt-4 flex gap-2">
                    <Button
                        type="button"
                        className="flex-1" // Prend toute la largeur disponible
                        onClick={(e) => {
                            // stopPropagation empeche de cliquer sur la carte entiere quand on clique le bouton
                            e.stopPropagation();
                            onOpen(item)
                        }}
                    >
                        Voir les détails
                    </Button>

                    {/* Bouton Coeur (Wishlist) */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); onToggleWish(item.id) }}
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 shrink-0"
                                >
                                    {/* Si c'est liké, je mets en rouge, sinon en gris */}
                                    <Heart className={`h-5 w-5 ${wished ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>{wished ? 'Retirer des favoris' : 'Ajouter aux favoris'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    )
}

// La fenetre Modale (Popup) qui s'ouvre quand on clique
function ProductDialog({ item, open, onOpenChange }) {
    // Si y'a pas d'item selectionné, on affiche rien
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl sm:max-w-4xl pt-8">

                {/* En-tête de la modale */}
                <DialogHeader className="px-6">
                    <DialogTitle className="flex items-center justify-between gap-4 pr-8">
                        <span className="text-2xl">{item.name}</span>
                        <span className="text-primary text-2xl font-bold whitespace-nowrap">
                            {Number(item.price).toFixed(2)} €
                            <span className="text-sm font-normal text-muted-foreground ml-1">HT</span>
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-8 md:grid-cols-2 px-6 pb-6 mt-4">

                    {/* Colonne Gauche : Visuel */}
                    <div className="bg-muted/10 rounded-xl border overflow-hidden flex items-center justify-center min-h-[200px]">
                        <img
                            src={`https://placehold.co/600x400?text=${item.name}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Colonne Droite : Infos */}
                    <div className="space-y-6">

                        {/* Description detaillée */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">À propos de ce service</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description || "Ce service inclut l'analyse, le développement et le déploiement selon vos spécifications. Contactez-nous pour un devis précis."}
                            </p>
                        </div>

                        {/* Petits points forts (en dur pour faire joli) */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-foreground">Inclus dans la prestation :</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Suivi de projet dédié</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Garantie de fonctionnement</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Support prioritaire</li>
                            </ul>
                        </div>

                        <Separator />

                        {/* Bouton d'action */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Button size="lg" className="w-full gap-2" onClick={() => alert("Fonctionnalité Devis à venir !")}>
                                <FileText className="h-4 w-4" /> Demander un devis personnalisé
                            </Button>
                            <p className="text-xs text-muted-foreground text-center w-full mt-2">
                                Réponse sous 24h ouvrées.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// La page principale
export default function ProductsCatalog({ products, wishlist = [] }) {
    // Mes etats pour gérer la modale
    const [open, setOpen] = React.useState(false)
    const [currentItem, setCurrentItem] = React.useState(null)

    // Fonction pour savoir si un produit est liké
    // (On verifie si son ID est dans la liste des favoris)
    function estDansWishlist(id) {
        if(!Array.isArray(wishlist)) return false
        return wishlist.includes(id)
    }

    // Fonction pour liker/disliker
    function toggleWishlist(id) {
        if (estDansWishlist(id)) {
            // Si deja liké, on supprime (DELETE)
            router.delete(`/wishlist/${id}`, { preserveScroll: true })
        } else {
            // Sinon on ajoute (POST)
            router.post(`/wishlist/${id}`, {}, { preserveScroll: true })
        }
    }

    // Fonction qui ouvre la modale
    function ouvrirDetails(item) {
        setCurrentItem(item)
        setOpen(true)
    }

    return (
        <AppLayout>
            <Head title="Catalogue Services" />

            <div className="p-6 max-w-7xl mx-auto">

                {/* Titre de la page */}
                <div className="mb-8 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Catalogue de Prestations</h1>
                    <p className="text-muted-foreground">
                        Découvrez nos offres de développement, d'audit et de maintenance pour vos projets digitaux.
                    </p>
                </div>

                {/* Grille des produits */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.data.map((p) => (
                        <ProductCard
                            key={p.id}
                            item={p}
                            wished={estDansWishlist(p.id)}
                            onToggleWish={toggleWishlist}
                            onOpen={ouvrirDetails}
                        />
                    ))}
                </div>

                {/* Si y'a rien, on affiche un message */}
                {products.data.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        Aucun service disponible pour le moment.
                    </div>
                )}

                {/* La pagination en bas */}
                <div className="mt-8">
                    <Pagination meta={products.meta} baseUrl="/products" />
                </div>
            </div>

            {/* Le composant modale qui est caché par defaut */}
            <ProductDialog
                item={currentItem}
                open={open}
                onOpenChange={setOpen}
            />
        </AppLayout>
    )
}
