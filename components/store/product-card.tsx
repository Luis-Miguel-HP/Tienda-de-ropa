"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5",
        !product.isAvailable && "opacity-70"
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            !product.isAvailable && "grayscale"
          )}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground border-0 shadow-sm">
              Nuevo
            </Badge>
          )}
          {!product.isAvailable && (
            <Badge variant="secondary" className="bg-foreground/80 text-background border-0">
              Agotado
            </Badge>
          )}
        </div>

        
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
