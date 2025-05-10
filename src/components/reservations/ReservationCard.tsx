
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatTime } from "@/lib/utils"
import { Reservation } from "@/types"

interface ReservationCardProps {
  reservation: Reservation
  onCancel?: (id: string) => void
  showFacilityDetails?: boolean
  showUserDetails?: boolean
}

export function ReservationCard({ 
  reservation,
  onCancel,
  showFacilityDetails = true,
  showUserDetails = false
}: ReservationCardProps) {
  const isUpcoming = new Date(`${reservation.date}T${reservation.endTime}`) > new Date()
  const isPast = !isUpcoming
  const isCanceled = reservation.status === "canceled"
  
  return (
    <Card className={`overflow-hidden ${isCanceled ? "opacity-70" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {showFacilityDetails && reservation.facility && (
              <span>{reservation.facility.name}</span>
            )}
            {!showFacilityDetails && reservation.user && (
              <span>Reserva de {reservation.user.name}</span>
            )}
          </CardTitle>
          <Badge 
            variant={
              isCanceled ? "destructive" : 
              isPast ? "outline" : 
              "default"
            }
          >
            {isCanceled ? "Cancelada" : 
             isPast ? "Finalizada" : 
             "Confirmada"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Fecha</p>
          <p className="font-medium">{formatDate(reservation.date)}</p>
        </div>
        
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Hora inicio</p>
            <p className="font-medium">{formatTime(reservation.startTime)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hora fin</p>
            <p className="font-medium">{formatTime(reservation.endTime)}</p>
          </div>
        </div>
        
        {showUserDetails && reservation.user && (
          <div>
            <p className="text-sm text-gray-500">Usuario</p>
            <div className="flex items-center gap-2">
              {reservation.user.avatar && (
                <img 
                  src={reservation.user.avatar} 
                  alt={reservation.user.name} 
                  className="w-5 h-5 rounded-full"
                />
              )}
              <p className="font-medium">{reservation.user.name}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      {onCancel && isUpcoming && !isCanceled && (
        <CardFooter className="pt-0">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={() => onCancel(reservation.id)}
          >
            Cancelar Reserva
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
