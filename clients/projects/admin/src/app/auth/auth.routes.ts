import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggingInComponent } from './pages/logging-in/logging-in.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const authRoutes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'logging-in',
    component: LoggingInComponent
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full' 
      }
    ]
  }
]; 
