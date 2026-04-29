"use client"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductCardProps {
product: Product
}

export function ProductCard({ product }: ProductCardProps) {

const handleWhatsApp = () => {
const numero = "8097527726"


const mensaje = `Hola, me gustaría comprar este producto: ${product.name}`

const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

window.open(url, "_blank")

}

return ( <div className="group">


  {/* Imagen */}
  <div
    onClick={handleWhatsApp}
    className="relative aspect-[3/4] overflow-hidden cursor-pointer hover:opacity-95"
  >
    <Image
      src={product.image}
      alt={product.name}
      fill
      className={cn(
        "object-cover transition duration-500 ease-out group-hover:scale-[1.03]",
        !product.isAvailable && "grayscale opacity-70"
      )}
    />

    {/* NUEVO */}
    {product.isNew && (
      <span className="absolute top-3 left-3 text-[11px] tracking-wide text-[#2B2B2B] bg-white/80 px-2 py-1">
        NUEVO
      </span>
    )}

    {/* AGOTADO */}
    {!product.isAvailable && (
      <span className="absolute top-3 right-3 text-[11px] tracking-wide text-[#2B2B2B] bg-white/80 px-2 py-1">
        AGOTADO
      </span>
    )}
  </div>

  {/* Info */}
  <div className="mt-3 space-y-1">

    {/* Nombre */}
    <h3 className="text-sm text-[#2B2B2B] font-normal tracking-tight">
      {product.name}
    </h3>

    {/* Precio */}
    <p className="text-sm text-gray-600">
      ${product.price.toFixed(2)}
    </p>

    {/* Colores */}
    {product.colors && (
      <div className="flex gap-2 pt-2">
        {product.colors.map((color) => (
          <span
            key={color.name}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    )}

    {/* Tallas */}
    <div className="flex gap-3 pt-1">
      {product.sizes.map((s, index) => (
        <span
          key={`${s.size}-${index}`}
          className={`text-xs transition ${
            s.available
              ? "text-[#2B2B2B]"
              : "text-gray-300 line-through"
          }`}
        >
          {s.size}
        </span>
      ))}
    </div>

  </div>
</div>


)
}
