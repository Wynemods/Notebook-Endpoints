import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
  <div class="profile-container">
    <h2>User Profile</h2>
    <p>User profile management UI will be implemented here.</p>
  </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
    }
  `]
})
export class ProfileComponent {}
