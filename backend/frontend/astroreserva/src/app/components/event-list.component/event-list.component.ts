import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { EventService } from '../../services/event.service';

registerLocaleData(localeEs);

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  searchTerm: string = '';
  selectedCategory: string = '';

  currentDate = new Date();
  displayDate = new Date();
  daysInMonth: number[] = [];
  blankDays: number[] = [];
  filteredEvents: any[] = [];
  showAllYear = false;

  // Getter para transformar fechas de string a objeto Date una sola vez
  get allEvents() {
    return this.eventService.catalog().map((event) => ({
      ...event,
      dateObj: new Date(event.date), // Usamos dateObj para no sobreescribir el string original
    }));
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['q'] || '';
      this.selectedCategory = params['category'] || '';

      // Si hay búsqueda o categoría, mostramos la lista completa automáticamente
      if (this.selectedCategory || this.searchTerm) {
        this.showAllYear = true;
      }

      this.generateCalendar();
      this.filterEvents();
    });
  }

  generateCalendar() {
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

    const firstDay = new Date(year, month, 1).getDay();
    // Ajuste para que la semana empiece en Lunes (0=Lunes en tu lógica de blankDays)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    this.blankDays = Array.from({ length: adjustedFirstDay }, (_, i) => i);
  }

  filterEvents() {
    let results = [...this.allEvents];

    // 1. Filtrar por texto
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      results = results.filter(
        (e) => e.title.toLowerCase().includes(term) || e.location.toLowerCase().includes(term),
      );
    }

    // 2. Filtrar por Categoría (Soporte para Array)
    if (this.selectedCategory) {
      results = results.filter(
        (e) =>
          e.categories &&
          Array.isArray(e.categories) &&
          e.categories.includes(this.selectedCategory),
      );
    }

    // 3. Filtrar por Mes (Solo si NO estamos en vista anual)
    if (!this.showAllYear) {
      results = results.filter(
        (e) =>
          e.dateObj.getMonth() === this.displayDate.getMonth() &&
          e.dateObj.getFullYear() === this.displayDate.getFullYear(),
      );
    }

    // Ordenar por fecha
    this.filteredEvents = results.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  }

  clearSearch() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.showAllYear = false; // Al limpiar, volvemos a la vista de mes por defecto

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: null, category: null },
      queryParamsHandling: 'merge',
    });

    this.filterEvents();
  }

  changeMonth(delta: number) {
    this.showAllYear = false;
    this.displayDate = new Date(this.displayDate.setMonth(this.displayDate.getMonth() + delta));
    this.generateCalendar();
    this.filterEvents();
  }

  hasEvent(day: number): boolean {
    return this.allEvents.some(
      (e) =>
        e.dateObj.getDate() === day &&
        e.dateObj.getMonth() === this.displayDate.getMonth() &&
        e.dateObj.getFullYear() === this.displayDate.getFullYear(),
    );
  }

  toggleYearlyView() {
    this.showAllYear = !this.showAllYear;

    if (this.showAllYear) {
      this.searchTerm = '';
      this.selectedCategory = '';

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: null, category: null },
        queryParamsHandling: 'merge',
      });
    }

    this.filterEvents();
  }
}
