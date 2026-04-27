import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './bottom-nav-component.html',
})
export class BottomNavComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get navItems() {
    const user = this.auth.currentUser();
    const items = [
      { icon: 'home', label: 'Inicio', path: '/' },
      { icon: 'calendar', label: 'Eventos', path: '/events' },
    ];

    if (user) {
      // Si hay usuario, añadimos Dashboard y botón Logout
      items.push({ label: 'Mis Citas', icon: 'calendar', path: '/user-dashboard' });
      if (user.role === 'ADMIN') {
        items.push({ label: 'Admin', icon: 'shield', path: '/admin' });
      }
      items.push({ label: 'Salir', icon: 'log-out', path: 'LOGOUT' });
    } else {
      // Si no hay usuario, botón de Login
      items.push({ label: 'Entrar', icon: 'user', path: '/login' });
    }
    return items;
  }

  handleNavClick(item: any) {
    if (item.path === 'LOGOUT') {
      this.handleLogout();
      return;
    }

    this.router.navigate([item.path]);
  }

  handleLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  isActive(path: string): boolean {
    if (path === '/perfil') {
      return this.router.url === '/login' || this.router.url === '/dashboard';
    }
    return this.router.url === path;
  }
}
