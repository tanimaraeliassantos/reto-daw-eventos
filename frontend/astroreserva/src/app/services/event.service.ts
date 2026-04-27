import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/eventos';

  // Inicializamos el signal vacío para llenarlo con los datos del backend
  catalog = signal<any[]>([]);

  /**
   * Carga los eventos activos desde el backend y actualiza el signal.
   * Este método es el que llamamos desde el ngOnInit del componente.
   */
  loadActivos() {
    this.http.get<any[]>(`${this.apiUrl}/activos`).subscribe({
      next: (events) => {
        this.catalog.set(events);
      },
      error: (err) => {
        console.error('Error conectando con el servidor Java:', err);
      },
    });
  }

  /**
   * Envía un nuevo evento al backend (POST)
   */
  addEvent(event: any) {
    this.http.post<any>(this.apiUrl, event).subscribe({
      next: (newEvent) => {
        // Actualizamos el signal localmente con la respuesta del servidor
        this.catalog.update((prev) => [...prev, newEvent]);
      },
      error: (err) => console.error('Error al crear evento:', err),
    });
  }

  /**
   * Actualiza un evento existente (PUT)
   */
  updateEvent(id: string, updatedEvent: any) {
    this.http.put<any>(`${this.apiUrl}/${id}`, updatedEvent).subscribe({
      next: (res) => {
        this.catalog.update((events) => events.map((e) => (e.id === id ? { ...e, ...res } : e)));
      },
      error: (err) => console.error('Error al actualizar:', err),
    });
  }

  /**
   * Cancela/Elimina un evento (DELETE)
   */
  deleteEvent(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.catalog.update((prev) => prev.filter((e) => e.id.toString() !== id.toString()));
      },
      error: (err) => console.error('Error al eliminar:', err),
    });
  }

  // Método auxiliar por si necesitas un evento concreto por ID (ej: para detalles)
  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
