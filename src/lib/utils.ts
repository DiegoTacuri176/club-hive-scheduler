
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

export function formatTime(timeString: string): string {
  // Convert 24-hour time to 12-hour time
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minutes} ${suffix}`;
}

export function generateTimeSlots(): { value: string; label: string }[] {
  const timeSlots = [];
  
  for (let hour = 8; hour <= 21; hour++) {
    const value = `${hour.toString().padStart(2, '0')}:00`;
    const label = formatTime(value);
    timeSlots.push({ value, label });
  }
  
  return timeSlots;
}

export function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  
  return (end - start) / 60; // Duration in hours
}

export function isReservationConflict(
  existingReservations: { startTime: string; endTime: string }[],
  newStart: string,
  newEnd: string
): boolean {
  const newStartMinutes = timeToMinutes(newStart);
  const newEndMinutes = timeToMinutes(newEnd);
  
  return existingReservations.some(reservation => {
    const existingStartMinutes = timeToMinutes(reservation.startTime);
    const existingEndMinutes = timeToMinutes(reservation.endTime);
    
    return (
      (newStartMinutes >= existingStartMinutes && newStartMinutes < existingEndMinutes) ||
      (newEndMinutes > existingStartMinutes && newEndMinutes <= existingEndMinutes) ||
      (newStartMinutes <= existingStartMinutes && newEndMinutes >= existingEndMinutes)
    );
  });
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function getFullDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Function to get the next "n" days
export function getNextDays(n: number): Date[] {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  
  return days;
}
