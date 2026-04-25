import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './components/bottom-nav-component/bottom-nav-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('astroreserva');
  constructor(public router: Router) {}
}
