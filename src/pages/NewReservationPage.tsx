
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { facilities, reservations, getAvailableTimeSlots } from "@/data/mockData";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateDuration, formatTime, getFullDate, generateId } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const NewReservationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get params from URL if available
  const facilityIdParam = searchParams.get("facilityId");
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");
  
  // Form state
  const [selectedFacility, setSelectedFacility] = useState(facilityIdParam || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    dateParam ? new Date(dateParam) : new Date()
  );
  const [startTime, setStartTime] = useState(timeParam || "");
  const [endTime, setEndTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ startTime: string; endTime: string; isAvailable: boolean }[]>([]);
  const [price, setPrice] = useState(0);
  
  // Update available time slots when facility or date changes
  useEffect(() => {
    if (selectedFacility && selectedDate) {
      const dateStr = getFullDate(selectedDate);
      const slots = getAvailableTimeSlots(selectedFacility, dateStr);
      setAvailableTimeSlots(slots);
    }
  }, [selectedFacility, selectedDate]);
  
  // Calculate price when facility, start time, or end time changes
  useEffect(() => {
    if (selectedFacility && startTime && endTime) {
      const facility = facilities.find(f => f.id === selectedFacility);
      if (facility) {
        const hours = calculateDuration(startTime, endTime);
        setPrice(facility.pricePerHour * hours);
      }
    }
  }, [selectedFacility, startTime, endTime]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFacility || !selectedDate || !startTime || !endTime) {
      toast({
        title: "Error al crear reserva",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call
    const newReservation = {
      id: generateId(),
      facilityId: selectedFacility,
      userId: "2", // Mock user ID (Juan Pérez)
      date: getFullDate(selectedDate),
      startTime,
      endTime,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      facility: facilities.find(f => f.id === selectedFacility)
    };
    
    // Show success message
    toast({
      title: "¡Reserva creada!",
      description: "Tu reserva ha sido creada exitosamente.",
    });
    
    // Navigate to reservations page
    navigate("/reservations");
  };
  
  // Generate end time options based on start time
  const getEndTimeOptions = () => {
    if (!startTime) return [];
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const endTimeOptions = [];
    
    // Allow booking in 1-hour increments, up to 3 hours max
    for (let i = 1; i <= 3; i++) {
      const endHour = startHour + i;
      if (endHour <= 22) { // Club closes at 22:00
        const endTimeOption = `${endHour.toString().padStart(2, '0')}:00`;
        endTimeOptions.push(endTimeOption);
      }
    }
    
    return endTimeOptions;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 font-heading text-center">
          Nueva Reserva
        </h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Reserva</CardTitle>
              <CardDescription>
                Selecciona la instalación, fecha y horario para tu reserva
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Facility Selection */}
              <div>
                <Label htmlFor="facility">Instalación</Label>
                <Select 
                  value={selectedFacility} 
                  onValueChange={setSelectedFacility}
                  required
                >
                  <SelectTrigger id="facility">
                    <SelectValue placeholder="Seleccionar instalación" />
                  </SelectTrigger>
                  <SelectContent>
                    {facilities.filter(f => f.isAvailable).map((facility) => (
                      <SelectItem key={facility.id} value={facility.id}>
                        {facility.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date Selection */}
              <div>
                <Label htmlFor="date" className="mb-2 block">Fecha</Label>
                <DatePicker 
                  date={selectedDate} 
                  setDate={(date) => setSelectedDate(date)} 
                />
              </div>
              
              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <TimePicker
                  label="Hora de inicio"
                  value={startTime}
                  onChange={(value) => {
                    setStartTime(value);
                    setEndTime(""); // Reset end time when start time changes
                  }}
                  disabledTimes={availableTimeSlots
                    .filter(slot => !slot.isAvailable)
                    .map(slot => slot.startTime)
                  }
                />
                
                <TimePicker
                  label="Hora de fin"
                  value={endTime}
                  onChange={setEndTime}
                  disabled={!startTime}
                  disabledTimes={
                    startTime ? 
                    availableTimeSlots
                      .filter(slot => slot.startTime <= startTime)
                      .map(slot => slot.startTime)
                    : []
                  }
                />
              </div>
              
              {/* Price Calculation */}
              {selectedFacility && startTime && endTime && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Resumen de la Reserva</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Instalación:</span>
                      <span className="font-medium">
                        {facilities.find(f => f.id === selectedFacility)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fecha:</span>
                      <span className="font-medium">
                        {selectedDate?.toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Horario:</span>
                      <span className="font-medium">
                        {formatTime(startTime)} - {formatTime(endTime)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">
                        {price === 0 ? "Gratis para socios" : `$${price}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={!selectedFacility || !selectedDate || !startTime || !endTime}
              >
                Confirmar Reserva
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default NewReservationPage;
