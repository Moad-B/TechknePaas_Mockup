import { useMemo, useState } from 'react'
import { Moon, Sun, MonitorSmartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function getCookie(name: string): string | null {
  const match = typeof document !== 'undefined' ? document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)')) : null
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

type Mode = 'system' | 'light' | 'dark'

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(() => (getCookie('appearance') as Mode | null) ?? 'system')

  function apply(next: Mode) {
    setMode(next)
    setCookie('appearance', next)
    // Recharger pour appliquer immédiatement (middleware/JS global applique les classes)
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  const icon = useMemo(() => {
    switch (mode) {
      case 'light':
        return <Sun className="size-4" />
      case 'dark':
        return <Moon className="size-4" />
      default:
        return <MonitorSmartphone className="size-4" />
    }
  }, [mode])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Changer le thème">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Apparence</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={mode} onValueChange={(v) => apply(v as Mode)}>
          <DropdownMenuRadioItem value="light">
            <span className="inline-flex items-center gap-2">
              <Sun className="size-4" />
              Clair
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <span className="inline-flex items-center gap-2">
              <Moon className="size-4" />
              Sombre
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <span className="inline-flex items-center gap-2">
              <MonitorSmartphone className="size-4" />
              Système
            </span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
