import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <nav class="navbar">
    <a routerLink="/notes" routerLinkActive="active">Notes</a>
    <a routerLink="/profile" routerLinkActive="active">Profile</a>
    <button (click)="logout()">Logout</button>
  </nav>
  <main>
    <router-outlet></router-outlet>
  </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      background-color: #333;
      padding: 1rem;
      color: white;
      justify-content: space-between;
      align-items: center;
    }
    a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
    }
    a.active {
      font-weight: bold;
      text-decoration: underline;
    }
    button {
      background-color: #dc3545;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 4px;
    }
    main {
      padding: 1rem;
    }
  `]
})
export class LayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
