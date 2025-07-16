import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "Cuaderno Universitario",
    price: 15.99,
    image: "UNO.png?height=200&width=200",
    category: "Papelería",
  },
  {
    id: 2,
    name: "Mochila Estudiantil",
    price: 45.99,
    image: "DOS.jpg?height=200&width=200",
    category: "Accesorios",
  },
  {
    id: 3,
    name: "Calculadora Científica",
    price: 25.99,
    image: "TRES.jpg?height=200&width=200",
    category: "Electrónicos",
  },
  {
    id: 4,
    name: "Set de Bolígrafos",
    price: 8.99,
    image: "/CUATRO.jpg?height=200&width=200",
    category: "Papelería",
  },
  {
    id: 5,
    name: "Agenda",
    price: 12.99,
    image: "/CINCO.jpg?height=200&width=200",
    category: "Papelería",
  },
  {
    id: 6,
    name: "Lámpara de Escritorio",
    price: 35.99,
    image: "/SEIS.jpg?height=200&width=200",
    category: "Hogar",
  },
  
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-3">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.category}</p>
              <p className="font-bold text-lg text-blue-600">${product.price}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
