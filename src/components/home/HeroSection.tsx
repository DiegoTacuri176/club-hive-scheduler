
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Trophy } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-club-blue to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-heading">
            Tu club social y deportivo, ahora digital
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Gestiona tus reservas, explora nuestras instalaciones y mantente al tanto de todos los eventos desde cualquier dispositivo.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-club-blue hover:bg-gray-100">
              <Link to="/facilities">Explorar Instalaciones</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/calendar">Ver Calendario</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Feature highlight boxes */}
      <div className="bg-white/10 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold text-lg mb-1">Reservas Fáciles</h3>
              <p className="text-sm text-blue-100">Agenda en segundos desde cualquier lugar</p>
            </div>
            
            <div className="p-4">
              <Users className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold text-lg mb-1">Comunidad Activa</h3>
              <p className="text-sm text-blue-100">Únete a eventos y actividades grupales</p>
            </div>
            
            <div className="p-4">
              <Clock className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold text-lg mb-1">24/7 Disponible</h3>
              <p className="text-sm text-blue-100">Accede a la plataforma en cualquier momento</p>
            </div>
            
            <div className="p-4">
              <Trophy className="h-8 w-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold text-lg mb-1">Instalaciones Premium</h3>
              <p className="text-sm text-blue-100">Disfruta de nuestros espacios de alta calidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
