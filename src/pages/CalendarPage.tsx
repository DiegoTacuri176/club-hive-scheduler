
import { useState } from "react";
import { facilities, reservations } from "@/data/mockData";
import { ReservationCalendar } from "@/components/calendar/ReservationCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <div className="bg-gradient-to-r from-club-blue to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 font-heading">
            Calendario de Reservas
          </h1>
          <p className="max-w-3xl">
            Consulta la disponibilidad de todas las instalaciones del club y realiza
            tus reservas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Reservas Semanales</CardTitle>
            <CardDescription>
              Vista general de todas las reservas y disponibilidad en las
              instalaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)] md:h-auto">
              <ReservationCalendar
                reservations={reservations}
                facilities={facilities}
                onDateChange={setSelectedDate}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
