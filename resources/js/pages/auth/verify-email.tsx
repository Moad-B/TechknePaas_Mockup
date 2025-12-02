// Components
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verify email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email verification" />

            {/* --- DEBUT DE MON CODE (VISUEL) --- */}

            {/* Le nom du site en haut à gauche, comme sur le login */}
            <div className="fixed top-8 left-8 z-50">
                <h1 className="text-3xl font-black tracking-tight text-primary">
                    Techknè Portal
                </h1>
            </div>

            {/* La colonne de droite pour faire joli.
                - w-1/3 : prend un tiers de la largeur.
                - hidden lg:flex : on l'affiche que sur les grands écrans.
                - z-index negatif : pour rester derrière.
            */}
            <div className="fixed top-0 right-0 h-full w-1/3 bg-muted/30 border-l border-muted hidden lg:flex items-center justify-center -z-10">
                <div className="text-center p-10">
                    <div className="text-6xl mb-4">📧</div>
                    <p className="text-muted-foreground font-medium">
                        [PLACEHOLDER IMAGE] <br/>
                        Vérifiez votre boîte mail
                    </p>
                </div>
            </div>

            {/* --- FIN DE MON CODE --- */}

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Resend verification email
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            Log out
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
