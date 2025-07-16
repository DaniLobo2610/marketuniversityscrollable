import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Laptop, Home, Shirt } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Papelería",
    icon: Package,
    count: 15,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Electrónicos",
    icon: Laptop,
    count: 8,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    name: "Hogar",
    icon: Home,
    count: 12,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    name: "Accesorios",
    icon: Shirt,
    count: 20,
    color: "bg-orange-100 text-orange-600",
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-600">Explora productos por categoría</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.count} productos</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
