
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { facilities, getAvailableTimeSlots } from "@/data/mockData";
import { Facility } from "@/types";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime, getFullDate } from "@/lib/utils";
import { CalendarIcon, ArrowLeft } from "lucide-react";

const FacilityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<
    { startTime: string; endTime: string; isAvailable: boolean }[]
  >([]);

  // Find facility by id
  useEffect(() => {
    const foundFacility = facilities.find((f) => f.id === id);
    if (foundFacility) {
      setFacility(foundFacility);
    }
  }, [id]);

  // Get available time slots when facility or date changes
  useEffect(() => {
    if (facility && selectedDate) {
      const dateStr = getFullDate(selectedDate);
      const slots = getAvailableTimeSlots(facility.id, dateStr);
      setAvailableSlots(slots);
    }
  }, [facility, selectedDate]);

  if (!facility) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Instalación no encontrada</p>
        <Button asChild className="mt-4">
          <Link to="/facilities">Volver a Instalaciones</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header with background image */}
      <div
        className="h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${facility.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="container mx-auto px-4 py-8 absolute bottom-0 left-0 right-0 text-white">
          <Link
            to="/facilities"
            className="inline-flex items-center text-white hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Instalaciones
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-heading">
                {facility.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge className="bg-white text-club-blue hover:bg-white/90">
                  {facility.type === "court"
                    ? "Cancha"
                    : facility.type === "pool"
                    ? "Piscina"
                    : facility.type === "gym"
                    ? "Gimnasio"
                    : facility.type === "salon"
                    ? "Salón"
                    : "Otro"}
                </Badge>
                <span className="text-sm">Capacidad: {facility.capacity} personas</span>
              </div>
            </div>
            <div className="hidden md:block">
              <Button asChild>
                <Link to={`/reservations/new?facilityId=${facility.id}`}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Reservar Ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile reserve button */}
      <div className="md:hidden bg-white p-4 border-b sticky top-16 z-20 shadow-sm">
        <Button className="w-full" asChild>
          <Link to={`/reservations/new?facilityId=${facility.id}`}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            Reservar Ahora
          </Link>
        </Button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Description */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{facility.description}</p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Precio por Hora</h3>
                    <p className="font-medium text-lg">
                      {facility.pricePerHour === 0
                        ? "Gratis para socios"
                        : `$${facility.pricePerHour}`}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                    <p>
                      <Badge
                        variant={facility.isAvailable ? "default" : "destructive"}
                      >
                        {facility.isAvailable ? "Disponible" : "No disponible"}
                      </Badge>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Normas y Reglamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Se requiere reserva previa para el uso de esta instalación.</li>
                  <li>En caso de cancelación, por favor avisar con al menos 24 horas de anticipación.</li>
                  <li>Respetar el horario de inicio y fin de la reserva.</li>
                  <li>Mantener limpio el espacio después de su uso.</li>
                  <li>El número máximo de personas permitidas es: {facility.capacity}.</li>
                  <li>El club no se hace responsable de objetos perdidos o dañados.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Availability */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidad</CardTitle>
                <CardDescription>
                  Selecciona una fecha para ver los horarios disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DatePicker
                  date={selectedDate}
                  setDate={(date) => date && setSelectedDate(date)}
                  className="mb-6"
                />

                <div className="space-y-4 mt-6">
                  <h4 className="font-medium">Horarios disponibles:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot, index) => (
                      <Button
                        key={index}
                        variant={slot.isAvailable ? "outline" : "ghost"}
                        disabled={!slot.isAvailable}
                        className={`justify-start ${
                          slot.isAvailable ? "hover:bg-club-blue/10" : ""
                        }`}
                        asChild
                      >
                        {slot.isAvailable ? (
                          <Link
                            to={`/reservations/new?facilityId=${
                              facility.id
                            }&date=${getFullDate(selectedDate)}&time=${
                              slot.startTime
                            }`}
                          >
                            {formatTime(slot.startTime)}
                          </Link>
                        ) : (
                          <span className="text-gray-400">
                            {formatTime(slot.startTime)}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailPage;
