"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const allProducts = [
  {
    id: 1,
    name: "Cuaderno Universitario Premium",
    price: 15.99,
    originalPrice: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "papeleria",
    rating: 4.5,
    reviews: 23,
    description: "Cuaderno de 200 hojas con espiral, ideal para tomar apuntes en clase.",
    isNew: true,
    discount: 20,
  },
  {
    id: 2,
    name: "Mochila Estudiantil Resistente",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accesorios",
    rating: 4.8,
    reviews: 45,
    description: "Mochila resistente con múltiples compartimentos para laptop y libros.",
    isNew: false,
  },
  {
    id: 3,
    name: "Calculadora Científica Avanzada",
    price: 25.99,
    originalPrice: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "electronicos",
    rating: 4.6,
    reviews: 18,
    description: "Calculadora científica con funciones avanzadas para matemáticas.",
    discount: 21,
  },
  {
    id: 4,
    name: "Set de Bolígrafos de Colores",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "papeleria",
    rating: 4.3,
    reviews: 67,
    description: "Set de 12 bolígrafos de diferentes colores para tomar notas.",
  },
  {
    id: 5,
    name: "Agenda Planificador 2024",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "papeleria",
    rating: 4.7,
    reviews: 34,
    description: "Agenda semanal y mensual para organizar tu año académico.",
    isNew: true,
  },
  {
    id: 6,
    name: "Lámpara LED de Escritorio",
    price: 35.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "hogar",
    rating: 4.4,
    reviews: 29,
    description: "Lámpara LED ajustable con diferentes niveles de intensidad.",
  },
  {
    id: 7,
    name: "Auriculares Bluetooth Inalámbricos",
    price: 55.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "electronicos",
    rating: 4.9,
    reviews: 156,
    description: "Auriculares con cancelación de ruido y 20h de batería.",
    discount: 20,
  },
  {
    id: 8,
    name: "Termo Térmico Universitario",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accesorios",
    rating: 4.2,
    reviews: 41,
    description: "Termo de acero inoxidable que mantiene la temperatura 12h.",
  },
]

interface ProductListProps {
  selectedCategory: string
  priceRange: number[]
  onProductClick: (product: any) => void
}

export function ProductList({ selectedCategory, priceRange, onProductClick }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => {
    let filtered = allProducts

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filtrar por precio
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    setFilteredProducts(filtered)
  }, [selectedCategory, priceRange])

  const addToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    // Disparar evento personalizado para actualizar el carrito flotante
    window.dispatchEvent(new CustomEvent("cartUpdated"))
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <ShoppingCart className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
        <p className="text-gray-600">Intenta ajustar los filtros para ver más resultados</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-6">
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          className="hover:shadow-lg transition-all cursor-pointer overflow-hidden"
          onClick={() => onProductClick(product)}
        >
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              {/* Imagen del producto */}
              <div className="relative w-full sm:w-48 h-48 sm:h-40">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nuevo</Badge>}
                {product.discount && <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>}
              </div>

              {/* Información del producto */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                      <span className="font-bold text-xl text-blue-600">${product.price}</span>
                    </div>
                  </div>
                </div>

                {/* Rating y reseñas */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                  <MessageCircle className="w-4 h-4 text-gray-400 ml-2" />
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Botones de acción */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {categories.find((c) => c.id === product.category)?.name || product.category}
                  </Badge>

                  <Button size="sm" onClick={(e) => addToCart(product, e)} className="ml-auto">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const categories = [
  { id: "papeleria", name: "Papelería" },
  { id: "electronicos", name: "Electrónicos" },
  { id: "accesorios", name: "Accesorios" },
  { id: "hogar", name: "Hogar" },
]
