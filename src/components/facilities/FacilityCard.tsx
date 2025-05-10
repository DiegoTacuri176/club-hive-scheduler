
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, InfoIcon } from "lucide-react"
import { Facility } from "@/types"

interface FacilityCardProps {
  facility: Facility
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden h-full border-2 card-hover">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={facility.image} 
          alt={facility.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1533560904424-a0c61c4aae5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant="secondary" 
            className="font-medium bg-white border shadow-sm"
          >
            {facility.type === 'court' ? 'Cancha' :
             facility.type === 'pool' ? 'Piscina' : 
             facility.type === 'gym' ? 'Gimnasio' :
             facility.type === 'salon' ? 'Salón' : 'Otro'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle>{facility.name}</CardTitle>
        <CardDescription className="line-clamp-2">{facility.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2 pb-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Capacidad:</span>
          <span className="font-medium">{facility.capacity} personas</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Precio:</span>
          <span className="font-medium">
            {facility.pricePerHour === 0 
              ? "Gratis para socios" 
              : `$${facility.pricePerHour}/hora`}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2 pt-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link to={`/facilities/${facility.id}`}>
            <InfoIcon className="h-4 w-4 mr-2" />
            Detalles
          </Link>
        </Button>
        <Button size="sm" asChild className="flex-1">
          <Link to={`/reservations/new?facilityId=${facility.id}`}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Reservar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
