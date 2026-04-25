import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // Usuario logueado actualmente
  currentUser = signal<any | null>(null);

  // NUEVA: Lista de usuarios simulada (nuestra "DB" temporal)
  usersList = signal<any[]>([
    { id: 'U-001', name: 'Elena García', email: 'elena@ucm.es', role: 'CLIENTE' },
    { id: 'U-002', name: 'Carlos Astro', email: 'carlos@mail.com', role: 'CLIENTE' },
    { id: 'U-003', name: 'Admin Master', email: 'admin@astroreserva.com', role: 'ADMIN' },
  ]);

  constructor() {
    this.checkToken();
  }

  // --- MÉTODOS SIMULADOS ---
  addUser(user: any) {
    const newUser = {
      ...user,
      id: `U-0${this.usersList().length + 1}`,
      joinDate: new Date().toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    this.usersList.update((users) => [...users, newUser]);
  }

  deleteUser(id: string) {
    this.usersList.update((users) => users.filter((u) => u.id !== id));
    console.log(`Usuario ${id} eliminado localmente`);
  }

  updateUser(id: string, updatedData: any) {
    this.usersList.update((users) =>
      users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)),
    );
  }

  // Simula cambio de rol en el "backend"
  updateUserRole(id: string, newRole: string) {
    this.usersList.update((users) => users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  }

  // --- MÉTODOS DE SESIÓN (EXISTENTES) ---

  logout() {
    localStorage.removeItem('astro_token');
    this.currentUser.set(null);
  }

  private checkToken() {
    // Te logueamos como Admin por defecto para que puedas testear
    this.currentUser.set({
      id: 'admin-01',
      name: 'Administrador del Sistema',
      role: 'ADMIN',
    });
  }
}
