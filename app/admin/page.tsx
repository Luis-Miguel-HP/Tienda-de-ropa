"use client"

import { useState } from "react"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProductForm } from "@/components/admin/product-form"
import { ProductTable } from "@/components/admin/product-table"
import { useStore } from "@/lib/store-context"
import { Package, PackageCheck, PackageX, Sparkles, Menu, TrendingUp } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

type AdminView = "products" | "add"

export default function AdminPage() {
  const { isAuthenticated } = useAdminAuth()
  const { products } = useStore()
  const [currentView, setCurrentView] = useState<AdminView>("products")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />
  }

  const stats = {
    total: products.length,
    available: products.filter((p) => p.isAvailable).length,
    outOfStock: products.filter((p) => !p.isAvailable).length,
    new: products.filter((p) => p.isNew).length,
  }

  const statCards = [
    {
      title: "Total Productos",
      value: stats.total,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Disponibles",
      value: stats.available,
      icon: PackageCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Agotados",
      value: stats.outOfStock,
      icon: PackageX,
      color: "text-rose-600",
      bg: "bg-rose-500/10",
    },
    {
      title: "Nuevos",
      value: stats.new,
      icon: Sparkles,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <AdminSidebar
            currentView={currentView}
            onViewChange={(view) => {
              setCurrentView(view)
              setMobileSidebarOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
          <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Panel Admin</span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {currentView === "products" ? "Gestion de Productos" : "Agregar Producto"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {currentView === "products" 
                ? "Administra tu inventario y disponibilidad"
                : "Agrega un nuevo producto a tu catalogo"
              }
            </p>
          </div>

          {/* Stats cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`flex size-11 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`size-5 ${stat.color}`} />
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 w-full ${stat.bg}`} />
              </div>
            ))}
          </div>

          {/* Content based on current view */}
          {currentView === "products" && (
            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border p-5">
                <h2 className="text-lg font-semibold text-foreground">Todos los Productos</h2>
                <p className="text-sm text-muted-foreground">Lista completa de tu inventario</p>
              </div>
              <div className="p-5">
                <ProductTable />
              </div>
            </div>
          )}

          {currentView === "add" && (
            <div className="mx-auto max-w-2xl">
              <ProductForm onSuccess={() => setCurrentView("products")} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
