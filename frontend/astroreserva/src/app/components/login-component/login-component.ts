import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './login-component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLogin = true;

  registerData = { name: '', email: '' };

  formData = {
    email: '',
    password: '',
    name: '',
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
  if (this.isLogin) {
    // --- LÓGICA DE LOGIN ---
    const success = this.authService.login(this.formData.email);
    if (success) {
      const user = this.authService.currentUser();
      this.router.navigate([user.role === 'ADMIN' ? '/admin' : '/user-dashboard']);
    } else {
      alert('Usuario no encontrado. Prueba con admin@astroreserva.com o regístrate.');
    }
  } else {
    // --- LÓGICA DE REGISTRO ---
    if (this.formData.name && this.formData.email) {
      this.authService.register({ 
        name: this.formData.name, 
        email: this.formData.email 
      });
      this.router.navigate(['/user-dashboard']);
    }
  }
}

  onRegister() {
    if (this.registerData.name && this.registerData.email) {
      // Registramos y logueamos
      this.authService.register(this.registerData);

      // Redirigimos al Dashboard del usuario o a la Home
      this.router.navigate(['/user-dashboard']);
    }
  }
}
