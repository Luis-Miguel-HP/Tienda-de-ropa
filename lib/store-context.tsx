"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Product } from "./types"
import Swal from "sweetalert2"

interface StoreContextType {
  products: Product[]
  loading: boolean
  addProduct: (product: Omit<Product, "id">) => Promise<void>
  toggleAvailability: (id: string) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  refreshProducts: () => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const refreshProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Error al cargar productos")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Error cargando productos:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshProducts()
  }, [refreshProducts])

  const addProduct = async (product: Omit<Product, "id">) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error("Error al agregar producto")
    const newProduct: Product = await res.json()
    setProducts((prev) => [...prev, newProduct])
  }

  const toggleAvailability = async (id: string) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    const updated = { ...product, isAvailable: !product.isAvailable }
    const res = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isAvailable: updated.isAvailable }),
    })
    if (!res.ok) throw new Error("Error al actualizar disponibilidad")
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const res = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    })
    if (!res.ok) throw new Error("Error al actualizar producto")
    const updatedProduct: Product = await res.json()
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
  }

const deleteProduct = async (id: string) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
  });

  if (!result.isConfirmed) return;


  const res = await fetch("/api/products", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    await Swal.fire({
      title: "Error",
      text: "No se pudo eliminar",
      icon: "error",
    });
    throw new Error("Error al eliminar producto");
  }

  setProducts((prev) => prev.filter((p) => p.id !== id));

  await Swal.fire({
    title: "Eliminado",
    text: "El producto fue eliminado correctamente",
    icon: "success",
  });
};
  return (
    <StoreContext.Provider value=
    {{ products, loading, addProduct, toggleAvailability, updateProduct, refreshProducts,deleteProduct }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

