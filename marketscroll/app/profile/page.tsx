import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Settings, Heart, Package } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Información del usuario */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl">EU</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Estudiante Universitario</h2>
                <p className="text-gray-600">Miembro desde enero 2024</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>estudiante@universidad.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>Campus Universitario</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span>Estudiante</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opciones del perfil */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="w-6 h-6 text-blue-600" />
                Mis Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Ver historial de compras y seguimiento</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-600" />
                Lista de Deseos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Productos guardados para más tarde</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-gray-600" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Ajustes de cuenta y preferencias</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="w-6 h-6 text-green-600" />
                Editar Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Actualizar información personal</p>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Pedidos realizados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">5</p>
                <p className="text-sm text-gray-600">Productos favoritos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">8</p>
                <p className="text-sm text-gray-600">Comentarios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <Button variant="outline" className="w-full bg-transparent">
            Cerrar Sesión
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
