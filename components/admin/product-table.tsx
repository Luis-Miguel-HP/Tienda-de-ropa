"use client"

import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store-context"
import { Sparkles, Package } from "lucide-react"
import { useState } from "react"




const categoryLabels: Record<string, string> = {
  temporada: "Temporada",
  niños: "Ninos",
  verano: "Verano",
  hombres: "Hombres",
  mujeres: "Mujeres",
}

const categoryColors: Record<string, string> = {
  temporada: "bg-amber-500/10 text-amber-700",
  niños: "bg-blue-500/10 text-blue-700",
  verano: "bg-orange-500/10 text-orange-700",
  hombres: "bg-slate-500/10 text-slate-700",
  mujeres: "bg-pink-500/10 text-pink-700",
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 animate-pulse">
      <div className="size-16 shrink-0 rounded-lg bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="h-3 w-24 rounded bg-muted" />
      </div>
      <div className="h-6 w-16 rounded bg-muted" />
      <div className="h-6 w-20 rounded bg-muted" />
      <div className="h-6 w-10 rounded bg-muted" />
    </div>
  )
}

export function ProductTable() {
  const { products, loading, toggleAvailability,deleteProduct } = useStore()
  const [togglingId, setTogglingId] = useState<string | null>(null)


  const handleToggle = async (id: string) => {
    setTogglingId(id)
    try {
      await toggleAvailability(id)
    } finally {
      setTogglingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted mb-4">
          <Package className="size-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground">No hay productos</h3>
        <p className="text-sm text-muted-foreground mt-1">Agrega tu primer producto para comenzar</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all hover:shadow-sm"
        >
          {/* Product image */}
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-foreground truncate">{product.name}</h3>
              {product.isNew && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  <Sparkles className="size-3" />
                  Nuevo
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[product.category]}`}>
                {categoryLabels[product.category]}
              </span>
              <span className="text-muted-foreground">
                {product.sizes.join(", ")}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
          </div>

          {/* Status */}
          <div className="shrink-0 w-24 text-center">
            {product.isAvailable ? (
              <Badge className="bg-emerald-500/10 text-emerald-700 border-0 hover:bg-emerald-500/20">
                Disponible
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                Agotado
              </Badge>
            )}
          </div>
            <button className="rounded-sm bg-red-400 p-1 hover:bg-red-700"
              onClick={() => deleteProduct(product.id) }>
              Eliminar
          </button>

          {/* Toggle */}
          <div className="shrink-0">
            <Switch
              checked={product.isAvailable}
              onCheckedChange={() => handleToggle(product.id)}
              disabled={togglingId === product.id}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
