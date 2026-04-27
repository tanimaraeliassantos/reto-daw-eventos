import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './admin-dashboard-component.html',
})
export class AdminDashboardComponent implements OnInit {
  private router = inject(Router);
  private eventService = inject(EventService);
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);

  activeTab: string = 'dashboard';
  showEventForm: boolean = false;
  showUserForm: boolean = false;
  editingUser: any = null;
  editingEvent: any = null;
  selectedUser = { id: '', name: '', email: '', role: 'CLIENTE' };

  // Propiedades de datos
  sidebarItems = [
    { id: 'dashboard', label: 'Panel de Control', icon: 'layout-dashboard' },
    { id: 'events', label: 'Eventos', icon: 'calendar' },
    { id: 'customers', label: 'Usuarios', icon: 'users' },
  ];

  openEditUserModal(user: any) {
    if (user) {
      this.editingUser = user;
      this.selectedUser = { ...user };
    } else {
      this.editingUser = null;
      this.selectedUser = { id: '', name: '', email: '', role: 'CLIENTE' };
    }
    this.showUserForm = true;
  }

  closeUserModal() {
    this.showUserForm = false;
    this.editingUser = null;
  }

  saveUser() {
    if (this.editingUser) {
      // Editar usuario existente
      this.authService.updateUser(this.editingUser.id, this.selectedUser);
    } else {
      // Crear nuevo usuario
      if (this.selectedUser.name && this.selectedUser.email) {
        this.authService.addUser(this.selectedUser);
      }
    }
    this.closeUserModal();
  }

  newEvent = {
    id: '',
    title: '',
    date: '',
    location: '',
    price: 0,
    totalSlots: 10,
    description: '',
    time: '',
    duration: '',
    image: '',
    categories: [] as string[],
    status: 'ACTIVO' as 'ACTIVO' | 'CANCELADO',
  };

  ngOnInit() {
    if (this.authService.currentUser()?.role !== 'ADMIN') {
      this.router.navigate(['/']);
    }
  }

  // Getters para datos reales
  get catalog() {
    return this.eventService.catalog();
  }

  get reservations() {
    return this.bookingService.userBookings();
  }

  get totalSales() {
    const total = this.reservations.reduce(
      (acc, res) => (res.status === 'Confirmed' || res.status === 'ACTIVO' ? acc + res.total : acc),
      0,
    );
    return `$${total.toLocaleString()}`;
  }

  get activeEventsCount() {
    return new Set(this.reservations.map((r) => r.eventTitle)).size;
  }

  // Métodos de control
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  // CRUD de Eventos
  openEditEventModal(event: any = null) {
    if (event) {
      this.editingEvent = event;
      this.newEvent = {
        ...event,
        totalSlots: event.totalSlots || 10,
        categories: event.categories || (event.category ? [event.category] : []),
      };
    } else {
      this.editingEvent = null;
      this.newEvent = {
        id: '',
        title: '',
        date: '',
        location: '',
        price: 0,
        totalSlots: 10,
        description: '',
        time: '',
        duration: '',
        image: '',
        categories: [],
        status: 'ACTIVO',
      };
    }
    this.showEventForm = true;
  }

  saveEvent() {
    if (this.newEvent.title && this.newEvent.price >= 0) {
      if (this.editingEvent) {
        // Usaremos un método updateEvent en el servicio
        this.eventService.updateEvent(this.editingEvent.id, this.newEvent);
      } else {
        this.eventService.addEvent(this.newEvent);
      }
      this.closeModal();
    }
  }

  closeModal() {
    this.showEventForm = false;
  }

  deleteEvent(id: string) {
    if (confirm('¿Eliminar evento del catálogo?')) {
      this.eventService.deleteEvent(id);
    }
  }

  // CRUD de Reservas
  toggleStatus(res: any) {
    const nextStatus =
      res.status === 'Confirmed' || res.status === 'ACTIVO' ? 'CANCELADO' : 'ACTIVO';

    // Llamamos al nuevo método del servicio
    this.bookingService.updateBookingStatus(res.id, nextStatus);
  }

  toggleCategory(catId: string) {
    // Aseguramos que categories sea un array
    if (!this.newEvent.categories) {
      this.newEvent.categories = [];
    }

    const index = this.newEvent.categories.indexOf(catId);
    if (index > -1) {
      this.newEvent.categories.splice(index, 1);
    } else {
      this.newEvent.categories.push(catId);
    }
  }

  deleteReservation(id: string) {
    if (confirm('¿Eliminar reserva permanentemente?')) {
      this.bookingService.deleteBooking(id);
    }
  }

  readonly users = this.authService.usersList;

  deleteUser(id: string) {
    if (confirm('¿Eliminar este usuario permanentemente?')) {
      this.authService.deleteUser(id);
    }
  }

  toggleRole(user: any) {
    const newRole = user.role === 'ADMIN' ? 'CLIENTE' : 'ADMIN';
    this.authService.updateUserRole(user.id, newRole);
  }
}
