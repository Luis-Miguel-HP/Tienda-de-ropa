"use client"

import Link from "next/link"
import { Package, Plus, ArrowLeft, LogOut, TrendingUp, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { useTheme } from "next-themes"

type AdminView = "products" | "add"

interface AdminSidebarProps {
  currentView: AdminView
  onViewChange: (view: AdminView) => void
}

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const { logout } = useAdminAuth()
  const { theme, setTheme } = useTheme()
  

  const menuItems = [
    { id: "products" as const, label: "Productos", icon: Package },
    { id: "add" as const, label: "Agregar Nuevo", icon: Plus },
  ]

  return (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary shadow-sm">
          <TrendingUp className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-sidebar-foreground">MODA</h1>
          <p className="text-xs text-muted-foreground">Panel Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
              currentView === item.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full gap-2 justify-start rounded-xl h-11"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>{theme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
        </Button>
        <Link href="/" className="block">
          <Button variant="outline" className="w-full gap-2 justify-start rounded-xl h-11">
            <ArrowLeft className="size-4" />
            Volver a la Tienda
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          className="w-full gap-2 justify-start rounded-xl h-11 text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
          onClick={logout}
        >
          <LogOut className="size-4" />
          Cerrar Sesion
        </Button>
      </div>
    </aside>
  )
}
