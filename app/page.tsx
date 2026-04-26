"use client"

import { useState, useMemo } from "react"
import { StoreNavbar } from "@/components/store/store-navbar"
import { FilterSidebar } from "@/components/store/filter-sidebar"
import { ProductGrid } from "@/components/store/product-grid"
import { HeroBanner } from "@/components/store/hero-banner"
import { useStore } from "@/lib/store-context"
import type { Category, Size } from "@/lib/types"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function StorePage() {
  const { products } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [showOnlyNew, setShowOnlyNew] = useState(false)

  const maxPrice = useMemo(() => {
    return Math.ceil(Math.max(...products.map((p) => p.price)))
  }, [products])

  // Initialize price range with max price
  useMemo(() => {
    if (priceRange[1] === 100 && maxPrice > 100) {
      setPriceRange([0, maxPrice])
    }
  }, [maxPrice, priceRange])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter (navbar)
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false
      }

      // Multi-category filter (sidebar)
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.some((size) => product.sizes.includes(size))) {
        return false
      }

      // Availability filter
      if (showOnlyAvailable && !product.isAvailable) {
        return false
      }

      // New filter
      if (showOnlyNew && !product.isNew) {
        return false
      }

      return true
    })
  }, [products, selectedCategory, selectedCategories, priceRange, selectedSizes, showOnlyAvailable, showOnlyNew])

  const filterSidebarProps = {
    priceRange,
    onPriceRangeChange: setPriceRange,
    selectedSizes,
    onSizesChange: setSelectedSizes,
    showOnlyAvailable,
    onShowOnlyAvailableChange: setShowOnlyAvailable,
    maxPrice,
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Hero Banner */}
      {selectedCategory === "all" && (
        <HeroBanner onCategoryChange={setSelectedCategory} />
      )}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile filter button */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} productos encontrados
          </p>
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="size-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar {...filterSidebarProps} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar {...filterSidebarProps} />
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <div className="mb-4 hidden items-center justify-between lg:flex">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} productos encontrados
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
    </div>
  )
}
