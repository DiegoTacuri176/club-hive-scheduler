
import { CalendarIcon, CheckCircle, Clock, Users } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-heading">¿Cómo Funciona?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reservar una instalación o unirte a un evento es muy sencillo con nuestro sistema digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-club-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Crear Cuenta</h3>
            <p className="text-gray-600">
              Regístrate con tus datos personales y tu número de socio para acceder a todas las funciones.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-club-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Seleccionar Fecha</h3>
            <p className="text-gray-600">
              Escoge la fecha y hora que mejor se adapte a tu horario en nuestro calendario interactivo.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-club-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Reservar</h3>
            <p className="text-gray-600">
              Confirma tu reserva y recibe una confirmación instantánea con todos los detalles.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-club-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">4. ¡Disfruta!</h3>
            <p className="text-gray-600">
              Llega a la hora reservada y disfruta de nuestras excelentes instalaciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
