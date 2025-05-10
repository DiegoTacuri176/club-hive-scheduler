
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  to: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const NavLink = ({ to, children, className, onClick }: NavLinkProps) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-club-blue text-white"
          : "text-gray-700 hover:bg-gray-100",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    // Redirect to home page
    window.location.href = "/"
  }

  const toggleLogin = () => {
    setIsAuthenticated(!isAuthenticated)
    // For demo purposes, toggle admin role too
    setIsAdmin(!isAdmin)
  }

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/facilities", label: "Instalaciones" },
    { to: "/calendar", label: "Calendario" },
    { to: "/events", label: "Eventos" },
  ]

  // Add admin links if user is admin
  if (isAdmin) {
    navLinks.push({ to: "/admin", label: "Administración" })
  }
  
  // Add reservations link if user is authenticated
  if (isAuthenticated) {
    navLinks.push({ to: "/reservations", label: "Mis Reservas" })
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-heading font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-club-blue to-blue-700">
              ClubSocial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button>Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <SheetHeader className="border-b pb-4 mb-4">
                <SheetTitle>Menu</SheetTitle>
                <SheetClose className="absolute right-4 top-4">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* Auth Buttons for Mobile */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/profile" 
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Iniciar sesión
                      </Link>
                      <Link 
                        to="/register"
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              </nav>
              
              {/* Demo purpose toggle */}
              <div className="absolute bottom-4 left-4">
                <button 
                  onClick={toggleLogin} 
                  className="text-xs text-gray-400 hover:text-gray-500"
                >
                  [Demo: Toggle Auth]
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
