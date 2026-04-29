"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Instagram } from "lucide-react"
import { SheetTitle } from "@/components/ui/sheet"



const categories: { value: Category | "all"; label: string }[] = [
{ value: "all", label: "Todos" },
{ value: "temporada", label: "Temporada" },
{ value: "Accesorios", label: "Accesorios" },
{ value: "verano", label: "Verano" },
{ value: "hombres", label: "Hombres" },
{ value: "mujeres", label: "Mujeres" },
]

interface StoreNavbarProps {
selectedCategory: Category | "all"
onCategoryChange: (category: Category | "all") => void
}

export function StoreNavbar({ selectedCategory, onCategoryChange }: StoreNavbarProps) {
const [open, setOpen] = useState(false)

return ( <header className="sticky top-0 z-50 bg-white"> <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">


    {/* IZQUIERDA - MENU */}
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="text-[#2B2B2B] hover:opacity-70">
            <Menu className="size-6" />
          </button>
        </SheetTrigger>

       <SheetContent side="left" className="w-full sm:w-[420px] bg-white px-6">
          <SheetTitle className="hidden">menu</SheetTitle>


  <div className="mt-12 space-y-10">


{/* Título */}
<div>
  <h2 className="text-sm tracking-[2px] text-gray-400">
    CATEGORÍAS
  </h2>
</div>

{/* Categorías principales */}
<nav className="flex flex-col gap-6">
  {categories.map((category) => (
    <button
      key={category.value}
      onClick={() => {
        onCategoryChange(category.value)
        setOpen(false)
      }}
      className={cn(
        "text-left text-xl transition-all duration-200",
        selectedCategory === category.value
          ? "text-black font-semibold"
          : "text-gray-400 hover:text-black"
      )}
    >
      {category.label}
    </button>
  ))}
</nav>

{/* Línea divisoria */}
<div className="border-t border-gray-200" />

{/* Links secundarios */}
<div className="flex flex-col gap-4 text-sm text-gray-500">
  <a href="#" className="hover:text-black transition">
    Nueva colección
  </a>
  <a href="#" className="hover:text-black transition">
    Más vendidos
  </a>
  <a href="#" className="hover:text-black transition">
    Contacto
  </a>
</div>


  </div>

</SheetContent>


      </Sheet>
    </div>

    {/* CENTRO - LOGO */}
    <div className="absolute left-1/2 -translate-x-1/2 text-center">
      <Link href="/" className="flex flex-col items-center leading-tight">
        <span className="text-lg font-semibold text-black tracking-wide">
          Joel Reyes
        </span>
        <span className="text-[10px] tracking-[2px] text-gray-500">
          ARQUITECTURA DE MODA
        </span>
      </Link>
    </div>

    {/* DERECHA - REDES */}
   <div className="flex items-center gap-4">

  {/* WhatsApp */}
  <a
    href="https://wa.me/tu-numero"
    target="_blank"
    className="text-[#2B2B2B] hover:opacity-70"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12 .01C5.37.01 0 5.38 0 12c0 2.11.55 4.16 1.6 5.96L0 24l6.23-1.63A11.93 11.93 0 0 0 12 23.99c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.51zM12 21.54c-1.83 0-3.62-.49-5.18-1.41l-.37-.22-3.7.97.99-3.61-.24-.37A9.5 9.5 0 1 1 21.5 12c0 5.25-4.27 9.54-9.5 9.54zm5.27-7.19c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.78.36-.26.29-1 1-1 2.44s1.03 2.83 1.18 3.02c.15.19 2.04 3.11 4.95 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.34z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a
    href="https://instagram.com/tu-cuenta"
    target="_blank"
    className="text-[#2B2B2B] hover:opacity-70"
  >
    <Instagram className="w-5 h-5" />
  </a>

</div>
  </div>
</header>


)
}
