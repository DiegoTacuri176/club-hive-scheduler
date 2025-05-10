
import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reservation, Facility } from "@/types";
import { formatTime } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ReservationCalendarProps {
  reservations: Reservation[];
  facilities: Facility[];
  onDateChange?: (date: Date) => void;
}

export function ReservationCalendar({
  reservations,
  facilities,
  onDateChange,
}: ReservationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  // Generate the week dates
  const weekDates = [...Array(7)].map((_, i) => addDays(startDate, i));
  
  // Handle week navigation
  const prevWeek = () => {
    const newStartDate = addDays(startDate, -7);
    setStartDate(newStartDate);
    if (onDateChange) onDateChange(newStartDate);
  };
  
  const nextWeek = () => {
    const newStartDate = addDays(startDate, 7);
    setStartDate(newStartDate);
    if (onDateChange) onDateChange(newStartDate);
  };
  
  // Get time slots
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
  // Filter reservations for the current week
  const weekReservations = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.date);
    return weekDates.some(date => isSameDay(date, reservationDate));
  });
  
  // Group reservations by facility, date and time
  const reservationsByFacilityAndTime = facilities.map(facility => {
    const facilityReservations: Record<string, Record<string, Reservation>> = {};
    
    weekDates.forEach(date => {
      const dateString = format(date, 'yyyy-MM-dd');
      facilityReservations[dateString] = {};
      
      weekReservations
        .filter(r => r.facilityId === facility.id && r.date === dateString)
        .forEach(reservation => {
          facilityReservations[dateString][reservation.startTime] = reservation;
        });
    });
    
    return { facility, reservations: facilityReservations };
  });
  
  const formatDayLabel = (date: Date) => {
    return format(date, 'EEE', { locale: undefined });
  };
  
  const formatDayNumber = (date: Date) => {
    return format(date, 'd');
  };
  
  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  return (
    <div className="overflow-x-auto pb-4">
      {/* Calendar Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">
          {format(startDate, "MMMM yyyy", { locale: undefined })}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevWeek}
            aria-label="Previous Week"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextWeek}
            aria-label="Next Week"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="min-w-[800px]">
        {/* Day Headers */}
        <div className="grid grid-cols-8 gap-2 mb-2">
          <div className="sticky left-0 z-10 bg-white w-[180px]"></div>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`text-center ${
                isToday(date) ? "bg-club-blue text-white rounded-md" : ""
              } p-2`}
            >
              <div className="font-medium">{formatDayLabel(date)}</div>
              <div
                className={`text-xl font-bold ${
                  isToday(date) ? "" : "text-gray-700"
                }`}
              >
                {formatDayNumber(date)}
              </div>
            </div>
          ))}
        </div>

        {/* Facilities and Time Slots */}
        {reservationsByFacilityAndTime.map(({ facility, reservations }) => (
          <div key={facility.id} className="mb-4">
            {/* Facility Name */}
            <div className="grid grid-cols-8 gap-2 mb-1">
              <div className="sticky left-0 z-10 bg-white font-medium w-[180px] p-2 border-b">
                {facility.name}
              </div>
              {weekDates.map((date, index) => (
                <div key={index} className="p-2 border-b"></div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot} className="grid grid-cols-8 gap-2 mb-1">
                  {/* Time label */}
                  <div className="sticky left-0 z-10 bg-white text-sm text-gray-500 w-[180px] p-2">
                    {formatTime(timeSlot)}
                  </div>

                  {/* Reservation slots */}
                  {weekDates.map((date, dateIndex) => {
                    const dateString = format(date, 'yyyy-MM-dd');
                    const reservation = reservations[dateString]?.[timeSlot];

                    return (
                      <div key={dateIndex} className="relative border border-gray-100 p-1 h-12">
                        {reservation ? (
                          <Link to={`/reservations/${reservation.id}`}>
                            <Card 
                              className="h-full p-1 text-xs bg-club-blue text-white flex items-center justify-center text-center cursor-pointer hover:bg-club-blue/90 transition-colors"
                            >
                              {reservation.user?.name || "Reservado"}
                            </Card>
                          </Link>
                        ) : (
                          <Link 
                            to={`/reservations/new?facilityId=${facility.id}&date=${dateString}&time=${timeSlot}`}
                            className="block h-full hover:bg-gray-50 transition-colors"
                          ></Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
