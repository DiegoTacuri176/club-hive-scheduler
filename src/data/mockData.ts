
import { User, Facility, Reservation, ClubEvent } from '../types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    email: 'admin@clubsocial.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    membershipType: 'Full',
    phone: '555-0100',
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'juan@example.com',
    name: 'Juan Pérez',
    role: 'member',
    avatar: 'https://i.pravatar.cc/150?img=2',
    membershipType: 'Standard',
    phone: '555-0200',
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: '3',
    email: 'maria@example.com',
    name: 'María García',
    role: 'member',
    avatar: 'https://i.pravatar.cc/150?img=3',
    membershipType: 'Premium',
    phone: '555-0300',
    createdAt: '2023-02-01T00:00:00Z'
  }
];

// Mock facilities
export const facilities: Facility[] = [
  {
    id: '1',
    name: 'Cancha de Tenis #1',
    type: 'court',
    description: 'Cancha de tenis con superficie dura, ideal para partidos profesionales.',
    image: '/images/tennis-court.jpg',
    capacity: 4,
    pricePerHour: 50,
    isAvailable: true
  },
  {
    id: '2',
    name: 'Cancha de Tenis #2',
    type: 'court',
    description: 'Cancha de tenis con superficie de arcilla, ideal para juego recreativo.',
    image: '/images/tennis-court-2.jpg', 
    capacity: 4,
    pricePerHour: 45,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Piscina Olímpica',
    type: 'pool',
    description: 'Piscina de dimensiones olímpicas con 8 carriles y temperatura controlada.',
    image: '/images/pool.jpg',
    capacity: 30,
    pricePerHour: 0, // Acceso gratuito para socios
    isAvailable: true
  },
  {
    id: '4',
    name: 'Gimnasio Principal',
    type: 'gym',
    description: 'Gimnasio completamente equipado con máquinas de última generación.',
    image: '/images/gym.jpg',
    capacity: 25,
    pricePerHour: 0, // Acceso gratuito para socios
    isAvailable: true
  },
  {
    id: '5',
    name: 'Salón de Eventos',
    type: 'salon',
    description: 'Amplio salón para eventos sociales con capacidad para 100 personas.',
    image: '/images/event-hall.jpg',
    capacity: 100,
    pricePerHour: 200,
    isAvailable: true
  },
  {
    id: '6',
    name: 'Cancha de Fútbol',
    type: 'court',
    description: 'Cancha de fútbol 7 con césped sintético e iluminación nocturna.',
    image: '/images/soccer-field.jpg',
    capacity: 14,
    pricePerHour: 80,
    isAvailable: true
  }
];

// Generate dates for the next two weeks
const generateDates = () => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

const dates = generateDates();

// Generate random time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 22; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    slots.push({ startTime, endTime });
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Generate mock reservations
export const reservations: Reservation[] = [];

// Add some sample reservations
facilities.forEach((facility, facilityIndex) => {
  dates.forEach((date, dateIndex) => {
    // Add 2-3 reservations per day for each facility
    const reservationsPerDay = Math.floor(Math.random() * 2) + 2;
    
    for (let i = 0; i < reservationsPerDay; i++) {
      if (Math.random() > 0.7) continue; // Skip some to create gaps
      
      const slotIndex = Math.floor(Math.random() * (timeSlots.length - 1));
      const userId = users[Math.floor(Math.random() * users.length)].id;
      
      reservations.push({
        id: `${facilityIndex}-${dateIndex}-${i}`,
        facilityId: facility.id,
        userId: userId,
        date: date,
        startTime: timeSlots[slotIndex].startTime,
        endTime: timeSlots[slotIndex].endTime,
        status: Math.random() > 0.1 ? 'confirmed' : 'canceled',
        createdAt: new Date(Date.now() - Math.random() * 10000000).toISOString(),
        updatedAt: new Date().toISOString(),
        facility: facility,
        user: users.find(user => user.id === userId)
      });
    }
  });
});

// Mock events
export const events: ClubEvent[] = [
  {
    id: '1',
    title: 'Torneo de Tenis',
    description: 'Torneo anual de tenis para miembros del club. Categorías individuales y dobles.',
    facilityId: '1',
    date: dates[5],
    startTime: '09:00',
    endTime: '18:00',
    capacity: 32,
    registeredCount: 24,
    imageUrl: '/images/tennis-tournament.jpg',
    facility: facilities.find(f => f.id === '1')
  },
  {
    id: '2',
    title: 'Clase de Natación',
    description: 'Clase de natación para todos los niveles, impartida por entrenadores profesionales.',
    facilityId: '3',
    date: dates[2],
    startTime: '10:00',
    endTime: '12:00',
    capacity: 15,
    registeredCount: 8,
    imageUrl: '/images/swim-class.jpg',
    facility: facilities.find(f => f.id === '3')
  },
  {
    id: '3',
    title: 'Gala Anual',
    description: 'Cena formal y baile para celebrar el aniversario del club.',
    facilityId: '5',
    date: dates[10],
    startTime: '20:00',
    endTime: '01:00',
    capacity: 100,
    registeredCount: 87,
    imageUrl: '/images/gala.jpg',
    facility: facilities.find(f => f.id === '5')
  }
];

// Helper function to get available time slots for a facility on a specific date
export function getAvailableTimeSlots(facilityId: string, date: string) {
  const facilityReservations = reservations.filter(
    r => r.facilityId === facilityId && r.date === date && r.status === 'confirmed'
  );
  
  // Create a map of all possible time slots
  const allSlots = timeSlots.map(slot => ({
    ...slot,
    isAvailable: true
  }));
  
  // Mark reserved slots as unavailable
  facilityReservations.forEach(reservation => {
    allSlots.forEach(slot => {
      if (slot.startTime === reservation.startTime) {
        slot.isAvailable = false;
      }
    });
  });
  
  return allSlots;
}

// Helper function to get user's reservations
export function getUserReservations(userId: string) {
  return reservations
    .filter(r => r.userId === userId)
    .sort((a, b) => {
      // Sort by date, then by time
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });
}
