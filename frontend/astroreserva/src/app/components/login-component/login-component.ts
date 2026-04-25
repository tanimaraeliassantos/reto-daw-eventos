import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './login-component.html',
})
export class LoginComponent {
  isLogin = true; // Alternar entre Login y Registro

  formData = {
    email: '',
    password: '',
    name: '',
  };

  constructor(private router: Router) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    // Simulación de autenticación
    console.log('Datos enviados:', this.formData);

    // Si es admin, podríamos redirigir al dashboard,
    // pero por ahora vamos a la Home como usuario "logueado"
    if (this.formData.email === 'admin@astroreserva.com') {
      this.router.navigate(['/admin']); // Si es admin, va al panel
    } else {
      this.router.navigate(['/dashboard']); // Si es usuario, va a sus reservas
    }
  }
}
