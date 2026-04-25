import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './bottom-nav-component.html',
})
export class BottomNavComponent {
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  get navItems() {
    const items = [
      { icon: 'home', label: 'Inicio', path: '/' },
      { icon: 'calendar', label: 'Eventos', path: '/events' },
    ];

    const user = this.auth.currentUser();
    if (user?.role === 'ADMIN') {
      items.push({ icon: 'settings', label: 'Admin', path: '/admin' });
    }

    items.push({ icon: 'user', label: 'Perfil', path: '/perfil' });
    return items;
  }

  handleNavClick(item: any) {
    if (item.path === '/perfil') {
      const user = this.auth.currentUser();
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate([item.path]);
    }
  }

  isActive(path: string): boolean {
    if (path === '/perfil') {
      return this.router.url === '/login' || this.router.url === '/dashboard';
    }
    return this.router.url === path;
  }
}
