import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { CommentSection } from "@/components/comment-section"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

// Simulamos datos del producto
const getProduct = (id: string) => {
  const products = {
    "1": {
      id: 1,
      name: "Cuaderno Universitario",
      price: 15.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Papelería",
      description:
        "Cuaderno de 200 hojas con espiral, ideal para tomar apuntes en clase. Papel de alta calidad que no traspasa la tinta.",
      rating: 4.5,
      reviews: 23,
    },
    "2": {
      id: 2,
      name: "Mochila Estudiantil",
      price: 45.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Accesorios",
      description:
        "Mochila resistente con múltiples compartimentos, perfecta para llevar libros, laptop y materiales universitarios.",
      rating: 4.8,
      reviews: 45,
    },
  }

  return products[id as keyof typeof products] || products["1"]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Imagen del producto */}
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Detalles del producto */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
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

              <p className="text-4xl font-bold text-blue-600 mb-6">${product.price}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Sección de comentarios */}
        <CommentSection productId={product.id} />
      </main>

      <BottomNav />
    </div>
  )
}
