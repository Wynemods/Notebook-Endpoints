import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="auth-container">
    <h2>Register</h2>
    <form (submit)="onSubmit()">
      <label>
        Username:
        <input type="text" [(ngModel)]="username" name="username" required />
      </label>
      <label>
        Password:
        <input type="password" [(ngModel)]="password" name="password" required />
      </label>
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account? <a routerLink="/login">Login here</a>
    </p>
  </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    label {
      display: block;
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    button {
      width: 100%;
      padding: 0.5rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
    }
  `]
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.username && this.password) {
      this.authService.registerUser({ username: this.username, password: this.password }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => alert('Registration failed: ' + err.message)
      });
    }
  }
}
