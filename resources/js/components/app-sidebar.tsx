import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Shield, Boxes, Users } from 'lucide-react';
import AppLogo from './app-logo';

function buildMainNavItems(auth?: SharedData['auth']): NavItem[] {
    const items: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    const roles = auth?.roles ?? [];
    const permissions = auth?.permissions ?? [];
    const isAdmin = roles.includes('Admin') || roles.includes('Superadmin');

    // Public catalog for authenticated users
    items.push({ title: 'Products', href: '/products', icon: Boxes });

    const canManageRoles = isAdmin || permissions.includes('gérer les rôles') || permissions.includes('manage roles');
    if (canManageRoles) {
        items.push({ title: 'Users', href: '/admin/users', icon: Users });
        items.push({
            title: 'Gestion des Rôles',
            href: '/admin/roles',
            icon: Shield,
        });
        items.push({ title: 'Products (Admin)', href: '/admin/products', icon: Boxes });
    }

    return items;
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const mainNavItems = buildMainNavItems(page.props.auth);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
