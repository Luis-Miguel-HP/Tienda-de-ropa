export type Category = "niños" | "verano" | "hombres" | "mujeres" | "temporada"

export type Sizes = {
  size: Sizes
  avaible: boolean
}[]

export interface Product {
  id: string
  name: string
  price: number
  category: Category
  sizes: Sizes[]
  isNew: boolean
  isAvailable: boolean
  image: string
  colors?: {
  name: string
  hex: string
    }[]
}

