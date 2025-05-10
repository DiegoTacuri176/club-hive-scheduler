
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="font-heading font-bold text-2xl">ClubSocial</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Tu club social y deportivo de confianza. Brindando los mejores servicios desde 1980.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/facilities" className="hover:text-white transition-colors">Instalaciones</Link></li>
              <li><Link to="/calendar" className="hover:text-white transition-colors">Calendario</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Eventos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Avda. Principal 123</li>
              <li>Ciudad Deportiva</li>
              <li>Tel: (123) 456-7890</li>
              <li>Email: info@clubsocial.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Horarios</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lunes - Viernes: 7:00 - 22:00</li>
              <li>Sábados: 8:00 - 21:00</li>
              <li>Domingos: 8:00 - 20:00</li>
              <li>Días festivos: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ClubSocial - Todos los derechos reservados
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-500 text-sm hover:text-white transition-colors">Términos de uso</Link>
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors">Política de privacidad</Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
