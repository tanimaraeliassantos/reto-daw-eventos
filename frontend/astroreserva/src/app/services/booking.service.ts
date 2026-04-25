import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private initialBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
  userBookings = signal<any[]>(this.initialBookings);

  constructor() {}

  addBooking(booking: any) {
    this.userBookings.update((all) => {
      // 1. Buscamos si ya existe una reserva ACTIVA para este mismo evento
      const exists = all.find((b) => b.eventTitle === booking.eventTitle && b.status === 'ACTIVO');

      let updated;
      if (exists) {
        // 2. Si existe, mapeamos el array y SUMAMOS los tickets
        updated = all.map((b) => {
          if (b.id === exists.id) {
            return {
              ...b,
              // Sumamos la cantidad anterior + la nueva
              tickets: b.tickets + booking.tickets,
              // También actualizamos el total proporcionalmente
              total: b.total + booking.total,
            };
          }
          return b;
        });
      } else {
        // 3. Si no existe, lo añadimos como una entrada nueva al principio
        updated = [booking, ...all];
      }

      // 4. Persistencia en LocalStorage
      localStorage.setItem('my_bookings', JSON.stringify(updated));
      return updated;
    });
  }
}
