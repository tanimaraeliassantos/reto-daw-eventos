import { inject, Injectable, signal, computed } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private auth = inject(AuthService);

  private _allBookings = signal<any[]>(JSON.parse(localStorage.getItem('my_bookings') || '[]'));

  userBookings = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return [];
    return this._allBookings().filter((b) => b.userId === user.id);
  });

  addBooking(booking: any) {
    const user = this.auth.currentUser();
    if (!user) return;

    const newBooking = { ...booking, userId: user.id };

    this._allBookings.update((all) => {
      const exists = all.find(
        (b) =>
          b.eventTitle === newBooking.eventTitle && b.userId === user.id && b.status === 'ACTIVO',
      );

      let updated;
      if (exists) {
        updated = all.map((b) => {
          if (b.id === exists.id) {
            return {
              ...b,
              tickets: b.tickets + newBooking.tickets,
              total: b.total + newBooking.total,
            };
          }
          return b;
        });
      } else {
        updated = [newBooking, ...all];
      }

      localStorage.setItem('my_bookings', JSON.stringify(updated));
      return updated;
    });
  }

  // Método para cancelar
  cancelBooking(id: string) {
    this._allBookings.update((all) => {
      const updated = all.map((b) => (b.id === id ? { ...b, status: 'CANCELADO' } : b));
      localStorage.setItem('my_bookings', JSON.stringify(updated));
      return updated;
    });
  }

  updateBookingStatus(id: string, newStatus: string) {
    this._allBookings.update((all) => {
      const updated = all.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
      localStorage.setItem('my_bookings', JSON.stringify(updated));
      return updated;
    });
  }

  // Eliminar reserva permanentemente
  deleteBooking(id: string) {
    this._allBookings.update((all) => {
      const updated = all.filter((b) => b.id !== id);
      localStorage.setItem('my_bookings', JSON.stringify(updated));
      return updated;
    });
  }
}
