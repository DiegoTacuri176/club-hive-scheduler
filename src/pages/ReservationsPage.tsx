
import { useState } from "react";
import { reservations, facilities, getUserReservations } from "@/data/mockData";
import { ReservationCard } from "@/components/reservations/ReservationCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ReservationsPage = () => {
  // Mock user ID for demonstration
  const userId = "2"; // Juan Pérez

  // State for user's reservations
  const [userReservations, setUserReservations] = useState(
    getUserReservations(userId)
  );

  // Handle reservation cancellation
  const handleCancelReservation = (reservationId: string) => {
    // In a real app, this would make an API call
    setUserReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "canceled" }
          : reservation
      )
    );
    
    toast({
      title: "Reserva cancelada",
      description: "Tu reserva ha sido cancelada exitosamente.",
    });
  };

  // Filter reservations by status
  const upcomingReservations = userReservations.filter(
    (r) => r.status === "confirmed" && new Date(r.date) >= new Date()
  );
  
  const pastReservations = userReservations.filter(
    (r) => r.status === "confirmed" && new Date(r.date) < new Date()
  );
  
  const canceledReservations = userReservations.filter(
    (r) => r.status === "canceled"
  );

  return (
    <div>
      <div className="bg-gradient-to-r from-club-blue to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4 font-heading">
                Mis Reservas
              </h1>
              <p className="max-w-3xl">
                Gestiona tus reservas, visualiza tu historial y cancela cuando lo
                necesites.
              </p>
            </div>
            <Button className="bg-white text-club-blue hover:bg-gray-100" asChild>
              <Link to="/reservations/new">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Nueva Reserva
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Upcoming Reservations */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 font-heading">
            Próximas Reservas
          </h2>
          
          {upcomingReservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onCancel={handleCancelReservation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No tienes reservas próximas
              </h3>
              <p className="text-gray-500 mb-6">
                Realiza una nueva reserva para disfrutar de nuestras
                instalaciones.
              </p>
              <Button asChild>
                <Link to="/reservations/new">
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Nueva Reserva
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Past Reservations */}
        {pastReservations.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 font-heading">
              Historial de Reservas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          </div>
        )}

        {/* Canceled Reservations */}
        {canceledReservations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 font-heading">
              Reservas Canceladas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canceledReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
