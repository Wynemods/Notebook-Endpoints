import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private apiService: ApiService) {}

  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    return !!localStorage.getItem(this.tokenKey);
  }

  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  register(token: string): void {
    this.login(token);
  }

  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.login(response.token);
        }
      })
    );
  }

  registerUser(data: { username: string; password: string }): Observable<any> {
    return this.apiService.register(data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.register(response.token);
        }
      })
    );
  }
}
