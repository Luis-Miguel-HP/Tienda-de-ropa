"use client"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Size, Category } from "@/lib/types"
import { SlidersHorizontal, Package, Ruler, Tags, Sparkles } from "lucide-react"

interface FilterSidebarProps {
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedSizes: Size[]
  onSizesChange: (sizes: Size[]) => void
  showOnlyAvailable: boolean
  onShowOnlyAvailableChange: (show: boolean) => void
  maxPrice: number
  selectedCategories?: Category[]
  onCategoriesChange?: (categories: Category[]) => void
  showOnlyNew?: boolean
  onShowOnlyNewChange?: (show: boolean) => void
}

const sizes: Size[] = ["S", "M", "L", "XL"]

const categories: { value: Category; label: string }[] = [
  { value: "temporada", label: "Temporada" },
  { value: "hombres", label: "Hombres" },
  { value: "mujeres", label: "Mujeres" },
  { value: "niños", label: "Ninos" },
  { value: "verano", label: "Verano" },
]

export function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  selectedSizes,
  onSizesChange,
  showOnlyAvailable,
  onShowOnlyAvailableChange,
  maxPrice,
  selectedCategories = [],
  onCategoriesChange,
  showOnlyNew = false,
  onShowOnlyNewChange,
}: FilterSidebarProps) {
  const handleSizeToggle = (size: Size) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter((s) => s !== size))
    } else {
      onSizesChange([...selectedSizes, size])
    }
  }

  const handleCategoryToggle = (category: Category) => {
    if (!onCategoriesChange) return
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  return (
    <aside className="w-full space-y-6 lg:w-64">
      {/* Header */}
      <div className="flex items-center gap-2 text-foreground">
        <SlidersHorizontal className="size-5" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      {/* Categories */}
      {onCategoriesChange && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Tags className="size-4 text-primary" />
            </div>
            <h3 className="font-medium text-foreground">Categoria</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryToggle(cat.value)}
                className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedCategories.includes(cat.value)
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-sm font-bold text-primary">$</span>
          </div>
          <h3 className="font-medium text-foreground">Precio</h3>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          max={maxPrice}
          min={0}
          step={1}
          className="mb-3"
        />
        <div className="flex items-center justify-between">
          <span className="rounded-lg bg-muted px-3 py-1 text-sm font-medium text-foreground">
            ${priceRange[0]}
          </span>
          <span className="text-sm text-muted-foreground">-</span>
          <span className="rounded-lg bg-muted px-3 py-1 text-sm font-medium text-foreground">
            ${priceRange[1]}
          </span>
        </div>
      </div>

      {/* Sizes */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Ruler className="size-4 text-primary" />
          </div>
          <h3 className="font-medium text-foreground">Talla</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`rounded-lg border-2 py-2 text-sm font-medium transition-all ${
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

      {/* Availability */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <Package className="size-4 text-emerald-600" />
            </div>
            <Label htmlFor="available" className="cursor-pointer font-medium text-foreground">
              Solo disponibles
            </Label>
          </div>
          <Switch
            id="available"
            checked={showOnlyAvailable}
            onCheckedChange={onShowOnlyAvailableChange}
          />
        </div>

        {onShowOnlyNewChange && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10">
                <Sparkles className="size-4 text-amber-600" />
              </div>
              <Label htmlFor="onlyNew" className="cursor-pointer font-medium text-foreground">
                Solo nuevos
              </Label>
            </div>
            <Switch
              id="onlyNew"
              checked={showOnlyNew}
              onCheckedChange={onShowOnlyNewChange}
            />
          </div>
        )}
      </div>
    </aside>
  )
}
