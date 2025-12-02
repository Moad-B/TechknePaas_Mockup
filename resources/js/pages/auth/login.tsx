import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
                                  status,
                                  canResetPassword,
                                  canRegister,
                              }: LoginProps) {
    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            {/* --- DEBUT DE MON CODE (VISUEL) --- */}

            {/* Ici je mets le titre en FIXE pour qu'il reste collé en haut à gauche de l'écran.
                J'utilise z-50 pour être sûr qu'il passe DEVANT tout le reste (premier plan).
                J'ai mis une police bien grasse (font-black) pour que ça claque.
            */}
            <div className="fixed top-8 left-8 z-50">
                <h1 className="text-3xl font-black tracking-tight text-primary">
                    Techknè Portal
                </h1>
            </div>

            {/* Ici c'est mon image de fond à droite.
                - fixed : pour pas qu'elle bouge.
                - top-0 right-0 : pour la coller en haut à droite.
                - w-1/3 : elle prend un tiers de la largeur (pour pas cacher le formulaire au milieu).
                - h-full : elle prend toute la hauteur.
                - hidden lg:flex : je la cache sur mobile sinon ça prend trop de place.
                - -z-10 : je la mets en arrière plan (z index negatif) pour pas gener.
            */}
            <div className="fixed top-0 right-0 h-full w-1/3 bg-muted/30 border-l border-muted hidden lg:flex items-center justify-center -z-10">
                {/* C'est juste un texte en attendant d'avoir la vraie image */}
                <div className="text-center p-10">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-muted-foreground font-medium">
                        [PLACEHOLDER IMAGE] <br/>
                        Illustration Futuriste Ici
                    </p>
                </div>
            </div>

            {/* --- FIN DE MON CODE --- */}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Sign up
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
