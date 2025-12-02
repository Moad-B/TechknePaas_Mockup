import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function AppearanceToggleTab({
                                                className = '',
                                                ...props
                                            }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const current = tabs.find((t) => t.value === appearance) ?? tabs[2];

    return (
        <div className={cn('inline-flex', className)} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-1"
                        aria-label="Change appearance"
                    >
                        <current.icon className="h-4 w-4" />
                        <span className="text-sm">{current.label}</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                    {tabs.map(({ value, icon: Icon, label }) => (
                        <DropdownMenuItem
                            key={value}
                            onSelect={(e) => {
                                e.preventDefault();
                                updateAppearance(value);
                            }}
                            className={cn(
                                'flex items-center gap-2',
                                appearance === value ? 'font-medium' : 'text-neutral-600',
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
