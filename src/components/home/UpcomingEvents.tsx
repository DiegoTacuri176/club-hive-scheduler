
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatTime } from "@/lib/utils"
import { ClubEvent } from "@/types"

interface UpcomingEventsProps {
  events: ClubEvent[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const today = new Date().toISOString().split('T')[0]
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)
  
  // If no upcoming events, show message
  if (upcomingEvents.length === 0) {
    return null
  }
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading">Próximos Eventos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantente al tanto de todas las actividades y eventos organizados en el club.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="card-hover">
              <div className="aspect-[3/2] relative overflow-hidden">
                <img 
                  src={event.imageUrl || 'https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="text-white">
                    <p className="font-bold">{formatDate(event.date)}</p>
                    <p>{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-500 line-clamp-3">{event.description}</p>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/events/${event.id}`}>Ver Detalles</Link>
                </Button>
                <div className="text-sm text-gray-500">
                  {event.registeredCount}/{event.capacity} inscritos
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/events">Ver Todos los Eventos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
