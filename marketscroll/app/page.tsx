"use client"

import { useState } from "react"
import { ProductList } from "@/components/product-list"
import { FilterBar } from "@/components/filter-bar"
import { FloatingCart } from "@/components/floating-cart"
import { ProductModal } from "@/components/product-modal"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Revista Universitaria</h1>
          <p className="text-gray-600">Marketplace estudiantil</p>
        </div>
      </header>

      {/* Filtros */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      {/* Lista de productos scrollable */}
      <main className="max-w-4xl mx-auto px-4 pb-24">
        <ProductList selectedCategory={selectedCategory} priceRange={priceRange} onProductClick={setSelectedProduct} />
      </main>

      {/* Carrito flotante */}
      <FloatingCart />

      {/* Modal de producto */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
