import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './event-details-component.html',
})
export class EventDetailsComponent implements OnInit {
  private authService = inject(AuthService);
  private eventService = inject(EventService);
  private bookingService = inject(BookingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  event: any = null;
  id: string | null = null;
  remainingSlots: number = 0;
  occupancyPercent: number = 0;
  numTickets: number = 1;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const foundEvent = this.eventService.catalog().find((e) => e.id === this.id);

    if (foundEvent) {
      const bookingsForThisEvent = this.bookingService
        .userBookings()
        .filter(
          (b) =>
            b.eventTitle === foundEvent.title &&
            (b.status === 'Confirmed' || b.status === 'ACTIVO'),
        );
      const totalBooked = bookingsForThisEvent.reduce((acc, b) => acc + b.tickets, 0);
      this.event = {
        ...foundEvent,
        description:
          foundEvent.description ||
          'Únete a nosotros para una experiencia astronómica inolvidable bajo las estrellas.',
        time: foundEvent.time || '20:00 - 23:00',

        visibility: foundEvent.visibility || 90,
        equipment: foundEvent.equipment || 'Telescopios incluidos',
        duration: foundEvent.duration || '3 horas',
        totalSlots: foundEvent.totalSlots || 20,
        bookedSlots: totalBooked,
      };

      this.remainingSlots = this.event.totalSlots - this.event.bookedSlots;
      this.occupancyPercent = Math.round((this.event.bookedSlots / this.event.totalSlots) * 100);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goBooking() {
    const user = this.authService.currentUser();
    if (user) {
      this.router.navigate(['/booking', this.id], {
        queryParams: { tickets: this.numTickets },
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/event/' + this.id },
      });
    }
  }

  updateTickets(delta: number) {
    const res = this.numTickets + delta;
    if (res >= 1 && res <= 10 && res <= this.remainingSlots) {
      this.numTickets = res;
    }
  }
}
