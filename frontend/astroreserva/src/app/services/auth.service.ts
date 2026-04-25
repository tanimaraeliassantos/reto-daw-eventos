import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // Usuario logueado actualmente
  currentUser = signal<any | null>(null);

  // Nuestra "DB" temporal
  usersList = signal<any[]>([
    { id: 'U-001', name: 'Elena García', email: 'elena@ucm.es', role: 'CLIENTE' },
    { id: 'U-002', name: 'Carlos Astro', email: 'carlos@mail.com', role: 'CLIENTE' },
    { id: 'U-003', name: 'Admin Master', email: 'admin@astroreserva.com', role: 'ADMIN' },
  ]);

  constructor() {
    this.checkToken();
  }

  // --- NUEVO: MÉTODO DE LOGIN ---
  login(email: string): boolean {
    const user = this.usersList().find((u) => u.email === email);
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('astro_token', 'token-simulado-' + user.id);
      return true;
    }
    return false;
  }

  // --- NUEVO: MÉTODO DE REGISTRO CON AUTO-LOGIN ---
  register(userData: { name: string; email: string }) {
    const newUser = {
      id: `U-0${this.usersList().length + 1}`,
      name: userData.name,
      email: userData.email,
      role: 'CLIENTE',
      joinDate: new Date().toLocaleDateString('es-ES'),
    };

    this.usersList.update((users) => [...users, newUser]);
    this.currentUser.set(newUser);
    localStorage.setItem('astro_token', 'token-simulado-' + newUser.id);
    return newUser;
  }

  // --- MÉTODOS DE SESIÓN ---
  logout() {
    localStorage.removeItem('astro_token');
    this.currentUser.set(null);
  }

  private checkToken() {
    const token = localStorage.getItem('astro_token');
    if (token) {
      const userId = token.split('-').pop();
      const user = this.usersList().find((u) => u.id === userId);
      if (user) {
        this.currentUser.set(user);
      }
    } else {
      this.currentUser.set(null);
    }
  }

  // --- MÉTODOS DE GESTIÓN (CRUD) ---
  addUser(user: any) {
    const newUser = {
      ...user,
      id: `U-0${this.usersList().length + 1}`,
      joinDate: new Date().toLocaleDateString('es-ES'),
    };
    this.usersList.update((users) => [...users, newUser]);
  }

  deleteUser(id: string) {
    this.usersList.update((users) => users.filter((u) => u.id !== id));
  }

  updateUser(id: string, updatedData: any) {
    this.usersList.update((users) =>
      users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)),
    );
  }

  updateUserRole(id: string, newRole: string) {
    this.usersList.update((users) => users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  }
}
