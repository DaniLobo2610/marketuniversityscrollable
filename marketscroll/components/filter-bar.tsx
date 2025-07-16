"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

interface FilterBarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
}

const categories = [
  { id: "all", name: "Todos", count: 45 },
  { id: "papeleria", name: "Papelería", count: 15 },
  { id: "electronicos", name: "Electrónicos", count: 8 },
  { id: "accesorios", name: "Accesorios", count: 12 },
  { id: "hogar", name: "Hogar", count: 10 },
]

export function FilterBar({ selectedCategory, onCategoryChange, priceRange, onPriceRangeChange }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white border-b sticky top-[88px] z-30">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Botón de filtros móvil */}
        <div className="flex items-center justify-between mb-3">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <span className="text-sm text-gray-600">
            {categories.find((c) => c.id === selectedCategory)?.count || 0} productos
          </span>
        </div>

        {/* Filtros */}
        <div className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
          {/* Categorías */}
          <div>
            <h3 className="font-medium text-sm text-gray-700 mb-2">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category.id)}
                  className="text-xs"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Rango de precios */}
          <div>
            <h3 className="font-medium text-sm text-gray-700 mb-2">
              Precio: ${priceRange[0]} - ${priceRange[1]}
            </h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={onPriceRangeChange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
