import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Product } from "@/lib/types"

// Archivo donde se guardan los productos
const DATA_FILE = path.join(process.cwd(), "data", "products.json")

// Productos iniciales (solo se usan si no existe el archivo)
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica Blanca",
    price: 29.99,
    category: "hombres",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Vestido Floral Verano",
    price: 59.99,
    category: "mujeres",
    sizes: ["S", "M", "L"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Shorts de Playa",
    price: 34.99,
    category: "verano",
    sizes: ["M", "L", "XL"],
    isNew: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Conjunto Infantil Colorido",
    price: 39.99,
    category: "niños",
    sizes: ["S", "M"],
    isNew: false,
    isAvailable: false,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop",
  },
  {
    id: "5",
    name: "Polo Clásico Azul",
    price: 44.99,
    category: "hombres",
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1625910513413-5fc5b62ebd50?w=400&h=500&fit=crop",
  },
  {
    id: "6",
    name: "Blusa Elegante Rosa",
    price: 49.99,
    category: "mujeres",
    sizes: ["S", "M", "L"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
  },
  {
    id: "7",
    name: "Camiseta Niño Dinosaurios",
    price: 24.99,
    category: "niños",
    sizes: ["S", "M", "L"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=500&fit=crop",
  },
  {
    id: "8",
    name: "Bikini Tropical",
    price: 54.99,
    category: "verano",
    sizes: ["S", "M"],
    isNew: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400&h=500&fit=crop",
  },
  {
    id: "9",
    name: "Jeans Slim Fit",
    price: 79.99,
    category: "hombres",
    sizes: ["M", "L", "XL"],
    isNew: false,
    isAvailable: false,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
  },
  {
    id: "10",
    name: "Falda Midi Plisada",
    price: 64.99,
    category: "mujeres",
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe8?w=400&h=500&fit=crop",
  },
  {
    id: "11",
    name: "Sandalias de Playa",
    price: 29.99,
    category: "verano",
    sizes: ["M", "L"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=500&fit=crop",
  },
  {
    id: "12",
    name: "Pijama Infantil Unicornio",
    price: 34.99,
    category: "niños",
    sizes: ["S", "M", "L"],
    isNew: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop",
  },
  {
    id: "13",
    name: "Blazer Primavera",
    price: 89.99,
    category: "temporada",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
  },
  {
    id: "14",
    name: "Vestido Lino Natural",
    price: 74.99,
    category: "temporada",
    sizes: ["S", "M", "L"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
  },
  {
    id: "15",
    name: "Camisa Oversize Beige",
    price: 54.99,
    category: "temporada",
    sizes: ["M", "L", "XL"],
    isNew: true,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=500&fit=crop",
  },
  {
    id: "16",
    name: "Pantalon Wide Leg",
    price: 69.99,
    category: "temporada",
    sizes: ["S", "M", "L"],
    isNew: false,
    isAvailable: true,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
  },
]

function readProducts(): Product[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Crear el directorio y el archivo con datos iniciales
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2), "utf-8")
      return initialProducts
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(raw) as Product[]
  } catch {
    return initialProducts
  }
}

function writeProducts(products: Product[]): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8")
}

// GET /api/products — devuelve todos los productos
export async function GET() {
    console.log("🔥 GET EJECUTADO")
  const products = readProducts()
  return NextResponse.json(products)
}

// POST /api/products — agrega un nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const products = readProducts()

    const newProduct: Product = {
      ...body,
      id: Date.now().toString(),
    }

    products.push(newProduct)
    writeProducts(products)

    return NextResponse.json(newProduct, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Error al crear el producto" }, { status: 500 })
  }
}

// PATCH /api/products — actualiza un producto existente
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Se requiere un id" }, { status: 400 })
    }

    const products = readProducts()
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    products[index] = { ...products[index], ...updates }
    writeProducts(products)

    return NextResponse.json(products[index])
  } catch {
    return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 })
  }
}


//ELIMINA PRODUCTOS
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Se requiere un id" }, { status: 400 })
    }

    const products = readProducts()
    const filtered = products.filter((p) => p.id !== id)

    if (products.length === filtered.length) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    writeProducts(filtered)

    return NextResponse.json({ message: "Producto eliminado correctamente" })
  } catch {
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 })
  }
}

