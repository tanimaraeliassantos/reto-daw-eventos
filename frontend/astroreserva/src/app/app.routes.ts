import { Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen';
import { EventDetailsComponent } from './components/event-details-component/event-details-component';
import { BookingCheckoutComponent } from './components/booking-checkout-component/booking-checkout-component';
import { LoginComponent } from './components/login-component/login-component';
import { UserDashboardComponent } from './components/user-dashboard-component/user-dashboard-component';
import { AdminDashboardComponent } from './components/admin-dashboard-component/admin-dashboard-component';
import { EventListComponent } from './components/event-list.component/event-list.component';
import { BookingSuccessComponent } from './components/booking-success.component/booking-success.component';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'booking/:id', component: BookingCheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'events', component: EventListComponent },
  {path: 'booking-success', component: BookingSuccessComponent},
  { path: '**', redirectTo: '' },
];
