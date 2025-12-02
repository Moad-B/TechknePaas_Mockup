import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea' // J'importe le composant pour écrire des paragraphes
import { useForm } from '@inertiajs/react'

export default function ProductForm({ product, onSuccess }) {

    // petite astuce pour savoir si on modifie ou si on crée un nouveau
    const estEnEdition = product && product.id

    // hook de inertia pour gérer tout le formulaire
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: product?.name || '',
        // J'ajoute la description (vide par defaut)
        description: product?.description || '',
        price: product?.price || 0,
        quantity: product?.quantity || 1,
    })

    function quandOnValide(e) {
        e.preventDefault()

        if (estEnEdition) {
            // Mode Modification
            put(`/admin/products/${product.id}`, {
                onSuccess: () => {
                    if (onSuccess) onSuccess()
                }
            })
        } else {
            // Mode Création
            post('/admin/products', {
                onSuccess: () => {
                    // Je vide TOUS les champs, y compris la description
                    reset('name', 'description', 'price', 'quantity')
                    if (onSuccess) onSuccess()
                },
            })
        }
    }

    return (
        <form onSubmit={quandOnValide} className="space-y-4">

            {/* Champ Nom */}
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Intitulé du Service</label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Ex: Développement React, Audit..."
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* NOUVEAU : Champ Description */}
            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Détails de la prestation (Optionnel)</label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Décrivez ce qui est inclus dans ce service..."
                    className="min-h-[80px]" // Je lui donne un peu de hauteur
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            {/* Champ Prix */}
            <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Tarif (€)</label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={data.price}
                    onChange={(e) => setData('price', Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                    Indiquez le montant journalier (TJM) ou le prix total du forfait.
                </p>
                {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
            </div>

            {/* Champ Durée (Quantité) */}
            <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">Durée estimée (Jours)</label>
                <Input
                    id="quantity"
                    type="number"
                    value={data.quantity}
                    onChange={(e) => setData('quantity', Number(e.target.value))}
                />
                {/* Petit texte d'aide pour comprendre la logique */}
                <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Mettez <strong>1</strong> pour un Tarif Journalier (TJM).</p>
                    <p>• Mettez <strong>plus de 1</strong> pour créer un Forfait global.</p>
                </div>
                {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
            </div>

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={processing}>
                    {estEnEdition ? 'Enregistrer les modifications' : 'Ajouter au catalogue'}
                </Button>
            </div>
        </form>
    )
}
