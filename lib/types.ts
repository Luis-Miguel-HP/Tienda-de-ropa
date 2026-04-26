export type Category = "niños" | "verano" | "hombres" | "mujeres" | "temporada"

export type Size = "S" | "M" | "L" | "XL"

export interface Product {
  id: string
  name: string
  price: number
  category: Category
  sizes: Size[]
  isNew: boolean
  isAvailable: boolean
  image: string
}
