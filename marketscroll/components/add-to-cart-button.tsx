"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    // Aquí implementarías la lógica para añadir al carrito
    // Por ahora solo simulamos la acción
    setIsAdded(true)

    // Guardar en localStorage (simulación básica del carrito)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
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
  )
}
