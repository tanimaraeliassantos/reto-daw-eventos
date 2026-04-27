import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventService {
  private initialEvents = [
    {
      id: '1',
      title: 'Lluvia de Meteoros: Eta Acuáridas',
      location: 'Parque Nacional del Teide, Tenerife',
      date: '2026-05-05',
      price: 45,
      categories: ['stars'],
      image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=400',
    },
    {
      id: '2',
      title: 'Observación Conjunción Luna-Marte',
      location: 'Sierra de Guadarrama, Madrid',
      date: '2026-06-12',
      price: 35,
      categories: ['telescope', 'stars'],
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400',
    },
    {
      id: '3',
      title: 'Solsticio de Verano: Arqueoastronomía',
      location: 'Dolmen de Soto, Huelva',
      date: '2026-06-21',
      price: 60,
      categories: ['workshop'],
      image:
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '4',
      title: 'Taller de Fotografía de la Vía Láctea',
      location: 'Reserva Starlight, Sierra Morena',
      date: '2026-07-15',
      price: 120,
      categories: ['photo', 'workshop'],
      image:
        'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '5',
      title: 'Expedición Eclipse Solar Total 2026',
      location: 'Soria (Zona de Totalidad)',
      date: '2026-08-12',
      price: 150,
      categories: ['stars'],
      image:
        'https://images.unsplash.com/photo-1503584815950-223185a0e8fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '6',
      title: 'Eclipse Parcial de Luna',
      location: 'Castillo de Montjuïc, Barcelona',
      date: '2026-08-28',
      price: 40,
      categories: ['stars'],
      image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=400',
    },
  ];

  catalog = signal<any[]>(this.initialEvents);

  addEvent(event: any) {
    this.catalog.update((prev) => [...prev, { ...event, id: Date.now().toString() }]);
  }

  updateEvent(id: string, updatedEvent: any) {
    this.catalog.update((events) =>
      events.map((e) => (e.id === id ? { ...e, ...updatedEvent } : e)),
    );
  }

  deleteEvent(id: string) {
    this.catalog.update((prev) => prev.filter((e) => e.id !== id));
  }
}
