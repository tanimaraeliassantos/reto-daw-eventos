import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [LucideAngularModule, RouterModule, FormsModule],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css',
})
export class HomeScreenComponent {
  private router = inject(Router);
  private eventService = inject(EventService);

  searchQuery: string = '';

  get featuredEvents() {
    return this.eventService.catalog().slice(0, 2);
  }

  get upcomingWorkshops() {
    return this.eventService
      .catalog()
      .filter(
        (e) =>
          // Ahora verificamos si 'workshop' está dentro del array de categorías
          (e.categories && e.categories.includes('workshop')) ||
          e.title.toLowerCase().includes('taller'),
      )
      .slice(0, 3);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/events'], {
        queryParams: { q: this.searchQuery },
      });
    } else {
      this.router.navigate(['/events']);
    }
  }

  categories = [
    { id: 'photo', label: 'Fotografía', icon: 'camera' },
    { id: 'telescope', label: 'Telescopio', icon: 'telescope' },
    { id: 'stars', label: 'Cuerpos Celestes', icon: 'sparkles' },
    { id: 'workshop', label: 'Talleres', icon: 'book-open' },
  ];

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/events'], {
      queryParams: { category: categoryId },
    });
  }
}
