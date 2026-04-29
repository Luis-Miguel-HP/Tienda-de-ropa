export type Category = "Accesorios" | "verano" | "hombres" | "mujeres" | "temporada"

export type Size = "XS" | "S" | "M" | "L"

export type ProductSize = {
  size: Size
  available: boolean
}

export interface Product {
  id: string
  name: string
  price: number
  category: Category
  sizes: ProductSize[]
  isNew: boolean
  isAvailable: boolean
  image: string
  colors?: {
    name: string
    hex: string
  }[]
}