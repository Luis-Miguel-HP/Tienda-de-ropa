"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import type { Category } from "@/lib/types"

interface HeroBannerProps {
onCategoryChange: (category: Category | "all") => void
}

export function HeroBanner({ onCategoryChange }: HeroBannerProps) {
return ( <section className="relative overflow-hidden bg-[#F5F5F0]"> <div className="mx-auto max-w-7xl"> <div className="relative flex min-h-[450px] flex-col items-center justify-center gap-8 px-4 py-16 text-center sm:min-h-[550px] sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24 lg:text-left">

      {/* Content */}
      <div className="relative z-10 flex-1 space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#A5A58D]/20 px-4 py-2 text-sm font-medium text-[#6B7046]">
          <Sparkles className="size-4" />
          Nueva Coleccion 2026
        </div>

        {/* Title */}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-[#2B2B2B] sm:text-5xl lg:text-6xl">
          Descubre nuestra{" "}
          <span className="text-[#6B7046]">ropa de temporada</span>
        </h1>

        {/* Description */}
        <p className="max-w-lg text-pretty text-lg text-gray-600">
          Explora las ultimas tendencias y encuentra piezas unicas que definiran tu estilo esta temporada. Calidad premium, disenos exclusivos.
        </p>

        {/* Button */}
        <Button
          size="lg"
          className="gap-2 rounded-xl px-8 text-base bg-[#6B7046] text-white shadow-lg transition-all hover:bg-[#5a5f3a]"
          onClick={() => onCategoryChange("temporada")}
        >
          Ver Coleccion
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative flex-1">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-[#D6D6CE] shadow-2xl lg:aspect-[3/4]">
          <Image
            src="/images/hero-temporada.jpg"
            alt="Coleccion de temporada"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F0]/20 to-transparent" />
        </div>

        {/* Floating badge */}
        <div className="absolute -left-4 top-1/4 rounded-2xl bg-[#EDEDE5] px-4 py-3 shadow-lg border border-[#D6D6CE] hidden lg:block">
          <p className="text-xs text-gray-600">Nuevos estilos</p>
          <p className="text-lg font-bold text-[#2B2B2B]">+50</p>
        </div>
      </div>
    </div>
  </div>

  {/* Decorativos */}
  <div className="absolute -top-24 -left-24 size-96 rounded-full bg-[#A5A58D]/20 blur-3xl" />
  <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-[#CB997E]/20 blur-3xl" />
</section>


)
}
