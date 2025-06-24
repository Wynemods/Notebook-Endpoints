import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'notes', component: NotesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'notes', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
