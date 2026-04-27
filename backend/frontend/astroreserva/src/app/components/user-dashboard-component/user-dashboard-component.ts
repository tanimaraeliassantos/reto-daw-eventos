import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule], // Asegúrate de que CommonModule esté aquí
  templateUrl: './user-dashboard-component.html',
})
export class UserDashboardComponent {
  private auth = inject(AuthService);
  private bookingService = inject(BookingService);

  get userName() {
    return this.auth.currentUser()?.name || 'Usuario';
  }

  get todasLasReservas() {
    return this.bookingService.userBookings();
  }

  get proximas() {
    const hoy = new Date();
    // Ponemos la hora a las 00:00:00 para comparar solo el día
    hoy.setHours(0, 0, 0, 0);

    return this.todasLasReservas.filter((r) => {
      const fechaEvento = new Date(r.date);
      // Si la fecha del evento es hoy o después, y está activo -> Próximas
      return fechaEvento >= hoy && r.status !== 'CANCELADO';
    });
  }

  get pasadas() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.todasLasReservas.filter((r) => {
      const fechaEvento = new Date(r.date);
      // Si la fecha es anterior a hoy O está cancelado -> Historial
      return fechaEvento < hoy || r.status === 'CANCELADO';
    });
  }

  get isAdmin() {
    // IMPORTANTE: Asegúrate de que en tu AuthService el rol sea 'ADMIN' en mayúsculas
    return this.auth.currentUser()?.role === 'ADMIN';
  }

  cancelarReserva(id: string) {
  if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
    this.bookingService.cancelBooking(id);
  }
}

  generarPDF(reserva: any) {
    alert(`Descargando entrada para ${this.userName}...`);
  }
}
