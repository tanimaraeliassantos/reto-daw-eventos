import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  LucideAngularModule,
  ArrowLeft,
  Minus,
  Plus,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
} from 'lucide-angular';
import { BookingService } from '../../services/booking.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-booking-checkout',
  standalone: true,
  // Mantenemos los imports necesarios para Lucide y el formulario
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './booking-checkout-component.html',
})
export class BookingCheckoutComponent implements OnInit {
  // Usamos inject para servicios (estilo moderno Angular)
  private authService = inject(AuthService);
  private bookingService = inject(BookingService);
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: string | null = null;
  event: any = null;
  tickets: number = 1;

  formData = {
    name: '',
    email: '',
    phone: '',
  };

  private eventData: any = {
    '1': {
      title: 'Milky Way Photography Night',
      location: 'Sedona, AZ',
      date: 'Apr 22, 2026',
      time: '9:00 PM - 2:00 AM',
      price: 89,
    },
    '2': {
      title: 'Aurora Borealis Viewing',
      location: 'Fairbanks, AK',
      date: 'Apr 25, 2026',
      time: '10:00 PM - 3:00 AM',
      price: 129,
    },
    '3': {
      title: 'Lyrid Meteor Shower Watch',
      location: 'Joshua Tree, CA',
      date: 'Apr 20, 2026',
      time: '11:00 PM - 4:00 AM',
      price: 75,
    },
    '4': {
      title: 'Telescope Basics Workshop',
      location: 'Learning Center, Phoenix',
      date: 'Apr 18, 2026',
      time: '7:00 PM - 10:00 PM',
      price: 45,
    },
    '5': {
      title: 'Astrophotography Masterclass',
      location: 'Dark Sky Reserve, UT',
      date: 'Apr 21, 2026',
      time: '6:30 PM - 10:30 PM',
      price: 95,
    },
    '6': {
      title: 'Night Sky Navigation',
      location: 'Regional Observatory',
      date: 'Apr 24, 2026',
      time: '8:00 PM - 10:00 PM',
      price: 35,
    },
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // Buscamos el evento en el servicio común
    this.event = this.eventService.catalog().find((e) => e.id === this.id);

    // Recuperar tickets de queryParams
    this.route.queryParams.subscribe((params) => {
      if (params['tickets']) {
        this.tickets = parseInt(params['tickets'], 10);
      }
    });

    // Rellenado automático desde el Signal del AuthService
    const user = this.authService.currentUser();
    if (user) {
      this.formData.name = user.name;
      // Usamos el email del admin o uno por defecto para la simulación
      this.formData.email = user.email || 'admin@astroreserva.com';
    }
  }

  handleTicketChange(delta: number) {
    const newValue = this.tickets + delta;
    if (newValue >= 1 && newValue <= 10) {
      this.tickets = newValue;
    }
  }

  // Getters para cálculos automáticos en la vista
  get subtotal() {
    return (this.event?.price || 0) * this.tickets;
  }
  get serviceFee() {
    return Math.round(this.subtotal * 0.1);
  }
  get total() {
    return this.subtotal + this.serviceFee;
  }

  handleSubmit() {
    const nuevaReserva = {
      id: 'RES-' + Math.floor(Math.random() * 10000),
      eventTitle: this.event.title,
      date: this.event.date,
      location: this.event.location,
      status: 'ACTIVO',
      tickets: this.tickets,
      total: this.total,
      image:
        this.event.image ||
        'https://images.unsplash.com/photo-1464802686167-b939a67a06a1?q=80&w=400', // IMPORTANTE
    };

    this.bookingService.addBooking(nuevaReserva);

    // 2. Flujo de navegación: eliminamos el alert para que sea más fluido
    // y redirigimos a la pantalla de éxito
    this.router.navigate(['/booking-success'], {
      queryParams: { eventTitle: this.event.title, tickets: this.tickets },
    });
  }
}
