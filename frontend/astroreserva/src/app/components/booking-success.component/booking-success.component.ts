import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, CheckCircle, Calendar, Ticket } from 'lucide-angular';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
        <lucide-icon name="check-circle" class="w-20 h-20 text-yellow-400 mx-auto mb-6"></lucide-icon>
        
        <h1 class="text-3xl font-bold mb-2">¡Reserva Confirmada!</h1>
        <p class="text-slate-400 mb-8">Tu aventura astronómica ha sido registrada con éxito.</p>
        
        <div class="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700 text-left">
          <div class="flex items-center gap-3 mb-3">
            <lucide-icon name="calendar" class="w-5 h-5 text-yellow-400"></lucide-icon>
            <span class="font-medium">{{ eventTitle }}</span>
          </div>
          <div class="flex items-center gap-3">
            <lucide-icon name="ticket" class="w-5 h-5 text-yellow-400"></lucide-icon>
            <span>{{ tickets }} plazas reservadas</span>
          </div>
        </div>

        <button routerLink="/dashboard" class="w-full bg-yellow-400 text-slate-950 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all mb-4">
          Ir a mis reservas
        </button>
        
        <button routerLink="/" class="w-full bg-transparent text-slate-400 py-2 hover:text-white transition-all text-sm">
          Volver al inicio
        </button>
      </div>
    </div>
  `
})
export class BookingSuccessComponent {
  private route = inject(ActivatedRoute);
  eventTitle = this.route.snapshot.queryParams['eventTitle'];
  tickets = this.route.snapshot.queryParams['tickets'];
}
