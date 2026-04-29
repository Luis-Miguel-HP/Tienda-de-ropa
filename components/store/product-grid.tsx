"use client"

import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

interface ProductGridProps {
products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
if (products.length === 0) {
return ( <div className="flex flex-col items-center justify-center py-24 text-center"> <p className="text-lg text-[#2B2B2B] font-medium">
No se encontraron productos </p> <p className="text-sm text-gray-500 mt-1">
Intenta ajustar los filtros </p> </div>
)
}

return ( <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
{products.map((product) => ( <ProductCard key={product.id} product={product} />
))} </div>
)
}
