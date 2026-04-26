"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store-context"
import type { Category, Size } from "@/lib/types"
import { Upload, X, Sparkles, ImagePlus, Loader2 } from "lucide-react"

const categories: { value: Category; label: string }[] = [
  { value: "temporada", label: "Temporada" },
  { value: "niños", label: "Niños" },
  { value: "verano", label: "Verano" },
  { value: "hombres", label: "Hombres" },
  { value: "mujeres", label: "Mujeres" },
]

const sizes: Size[] = ["S", "M", "L", "XL"]

interface ProductFormProps {
  onSuccess?: () => void
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const { addProduct } = useStore()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState<Category | "">("")
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
  const [isNew, setIsNew] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Solo para la previsualización local (no se guarda en el servidor aún)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSizeToggle = (size: Size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    } else {
      setSelectedSizes([...selectedSizes, size])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !category || selectedSizes.length === 0) return

    setUploading(true)

    try {
      let imageUrl = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"

      // Si hay un archivo seleccionado, subirlo primero a la API
      if (selectedFile) {
        const formData = new FormData()
        formData.append("file", selectedFile)

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json()
          throw new Error(errorData.error ?? "Error al subir la imagen")
        }

        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      // Guardar el producto con la URL real de la imagen
      await addProduct({
        name,
        price: parseFloat(price),
        category: category as Category,
        sizes: selectedSizes,
        isNew,
        isAvailable: true,
        image: imageUrl,
      })

      // Limpiar el formulario
      setName("")
      setPrice("")
      setCategory("")
      setSelectedSizes([])
      setIsNew(false)
      setImagePreview(null)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Nuevo Producto</h2>
          <p className="text-sm text-muted-foreground">Completa los detalles del producto</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Left column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nombre del producto</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Camiseta Basica"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">Precio ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Categoria</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Seleccionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Tallas disponibles</Label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                      selectedSizes.includes(size)
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-amber-500" />
                <Label htmlFor="isNew" className="cursor-pointer text-sm font-medium">Marcar como nuevo</Label>
              </div>
              <Switch id="isNew" checked={isNew} onCheckedChange={setIsNew} />
            </div>
          </div>

          {/* Right column - Image */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Imagen del producto</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            {imagePreview ? (
              <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border shadow-sm">
                  <Image
                    src={imagePreview}
                    alt="Vista previa"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 size-7 rounded-full shadow-md"
                  onClick={removeImage}
                  disabled={uploading}
                >
                  <X className="size-4" />
                </Button>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  La imagen se subirá al guardar
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <ImagePlus className="size-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Subir imagen</p>
                  <p className="text-xs">PNG, JPG hasta 5MB</p>
                </div>
              </button>
            )}
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full gap-2 text-base font-medium" disabled={uploading}>
          {uploading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Upload className="size-4" />
              Agregar Producto
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
