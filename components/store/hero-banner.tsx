"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import type { Category } from "@/lib/types"

interface HeroBannerProps {
  onCategoryChange: (category: Category | "all") => void
}

export function HeroBanner({ onCategoryChange }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex min-h-[450px] flex-col items-center justify-center gap-8 px-4 py-16 text-center sm:min-h-[550px] sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24 lg:text-left">
          {/* Content */}
          <div className="relative z-10 flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              Nueva Coleccion 2026
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Descubre nuestra{" "}
              <span className="text-primary">ropa de temporada</span>
            </h1>
            <p className="max-w-lg text-pretty text-lg text-muted-foreground">
              Explora las ultimas tendencias y encuentra piezas unicas que definiran tu estilo esta temporada. Calidad premium, disenos exclusivos.
            </p>
            <Button 
                size="lg" 
                className="gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                onClick={() => onCategoryChange("temporada")}
              >
                Ver Coleccion
                <ArrowRight className="size-4" />
              </Button>
          </div>

          {/* Image */}
          <div className="relative flex-1">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border/50 shadow-2xl lg:aspect-[3/4]">
              <Image
                src="/images/hero-temporada.jpg"
                alt="Coleccion de temporada"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 rounded-2xl bg-card px-4 py-3 shadow-lg border border-border/50 hidden lg:block">
              <p className="text-xs text-muted-foreground">Nuevos estilos</p>
              <p className="text-lg font-bold text-foreground">+50</p>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-accent blur-3xl" />
    </section>
  )
}
