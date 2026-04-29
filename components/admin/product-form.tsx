"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store-context"
import type { Category, Size } from "@/lib/types"

const categories: { value: Category; label: string }[] = [
{ value: "temporada", label: "Temporada" },
{ value: "niños", label: "Niños" },
{ value: "verano", label: "Verano" },
{ value: "hombres", label: "Hombres" },
{ value: "mujeres", label: "Mujeres" },
]

const allSizes: Size[] = ["XS", "S", "M", "L"]

interface ProductFormProps {
onSuccess?: () => void
}

export function ProductForm({ onSuccess }: ProductFormProps) {
const { addProduct } = useStore()

const [name, setName] = useState("")
const [price, setPrice] = useState("")
const [category, setCategory] = useState<Category | "">("")

const [sizesState, setSizesState] = useState<
{ size: Size; available: boolean }[]

> ([])

const [colors, setColors] = useState<{ name: string; hex: string }[]>([])
const [colorName, setColorName] = useState("")
const [colorHex, setColorHex] = useState("#000000")

const [imagePreview, setImagePreview] = useState<string | null>(null)
const [selectedFile, setSelectedFile] = useState<File | null>(null)
const [uploading, setUploading] = useState(false)

const fileInputRef = useRef<HTMLInputElement>(null)

// 🔹 TALLAS
const toggleSize = (size: Size) => {
setSizesState((prev) => {
const exists = prev.find((s) => s.size === size)


  if (exists) {
    return prev.filter((s) => s.size !== size)
  }

  return [...prev, { size, available: true }]
})


}

const toggleAvailability = (size: Size) => {
setSizesState((prev) =>
prev.map((s) =>
s.size === size ? { ...s, available: !s.available } : s
)
)
}

// 🔹 COLORES
const addColor = () => {
if (!colorName) return
setColors((prev) => [...prev, { name: colorName, hex: colorHex }])
setColorName("")
setColorHex("#000000")
}

const removeColor = (index: number) => {
setColors((prev) => prev.filter((_, i) => i !== index))
}

// 🔹 IMAGEN
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0]
if (!file) return


setSelectedFile(file)

const reader = new FileReader()
reader.onloadend = () => setImagePreview(reader.result as string)
reader.readAsDataURL(file)


}

// 🔹 SUBMIT
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault()


if (!name || !price || !category || sizesState.length === 0) return

setUploading(true)

let imageUrl = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b"

if (selectedFile) {
  const formData = new FormData()
  formData.append("file", selectedFile)

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  const data = await res.json()
  imageUrl = data.url
}

await addProduct({
  name,
  price: parseFloat(price),
  category: category as Category,
  sizes: sizesState,
  isNew: false,
  isAvailable: true,
  image: imageUrl,
  colors,
})

// Reset
setName("")
setPrice("")
setCategory("")
setSizesState([])
setColors([])
setImagePreview(null)

onSuccess?.()
setUploading(false)


}

return ( <div className="p-6"> <h2 className="text-lg font-semibold mb-4">Nuevo Producto</h2>

  <form onSubmit={handleSubmit} className="space-y-6">

    <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
    <Input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />

    <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
      <SelectTrigger>
        <SelectValue placeholder="Categoría" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((c) => (
          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* 🔥 TALLAS */}
    <div>
      <Label>Tallas</Label>
      <div className="flex gap-3 mt-2 flex-wrap">
        {allSizes.map((size) => {
          const selected = sizesState.find((s) => s.size === size)

          return (
            <div key={size} className="flex flex-col items-center gap-1">

              <button
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 border ${
                  selected ? "border-black" : "border-gray-300"
                }`}
              >
                {size}
              </button>

              {selected && (
                <button
                  type="button"
                  onClick={() => toggleAvailability(size)}
                  className={`text-xs ${
                    selected.available ? "text-green-600" : "text-gray-400 line-through"
                  }`}
                >
                  {selected.available ? "Disponible" : "Agotado"}
                </button>
              )}

            </div>
          )
        })}
      </div>
    </div>

    {/* 🔥 COLORES */}
    <div>
      <Label>Colores</Label>

      <div className="flex gap-2 mt-2">
        <Input placeholder="Nombre" value={colorName} onChange={(e) => setColorName(e.target.value)} />
        <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} />
        <Button type="button" onClick={addColor}>+</Button>
      </div>

      <div className="flex gap-2 mt-2">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: c.hex }} />
            <span className="text-xs">{c.name}</span>
            <button type="button" onClick={() => removeColor(i)}>x</button>
          </div>
        ))}
      </div>
    </div>

    {/* Imagen */}
    <input type="file" onChange={handleImageChange} />

    {imagePreview && (
      <Image src={imagePreview} alt="" width={100} height={100} />
    )}

    <Button type="submit" disabled={uploading}>
      {uploading ? "Guardando..." : "Guardar"}
    </Button>

  </form>
</div>

)
}
