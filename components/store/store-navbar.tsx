"use client"

import Link from "next/link"
import { ShoppingBag, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "temporada", label: "Temporada" },
  { value: "niños", label: "Ninos" },
  { value: "verano", label: "Verano" },
  { value: "hombres", label: "Hombres" },
  { value: "mujeres", label: "Mujeres" },
]

interface StoreNavbarProps {
  selectedCategory: Category | "all"
  onCategoryChange: (category: Category | "all") => void
}

export function StoreNavbar({ selectedCategory, onCategoryChange }: StoreNavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary transition-transform group-hover:scale-105">
            <ShoppingBag className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">MODA</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                selectedCategory === category.value
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category.label}
              {selectedCategory === category.value && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Cambiar tema"
          >
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile category tabs */}
      <div className="flex gap-2 overflow-x-auto border-t border-border px-4 py-2 md:hidden scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              selectedCategory === category.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </header>
  )
}
