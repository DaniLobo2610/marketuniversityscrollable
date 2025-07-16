"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CommentSection } from "@/components/comment-section"
import { X, Star, ShoppingCart, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductModalProps {
  product: any
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent("cartUpdated"))

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-semibold">Detalle del Producto</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Imagen del producto */}
              <div className="relative aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500">Nuevo</Badge>}
                {product.discount && <Badge className="absolute top-4 right-4 bg-red-500">-{product.discount}%</Badge>}
              </div>

              {/* Detalles del producto */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                  <div className="flex items-center gap-2 mb-4">
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
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                    <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <Button onClick={handleAddToCart} className="w-full py-3 text-lg" disabled={isAdded}>
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Añadido al carrito
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Añadir al carrito
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Sección de comentarios */}
            <CommentSection productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
