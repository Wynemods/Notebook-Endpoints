import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Adjust backend URL as needed

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  getNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes`);
  }

  getNoteById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/notes/${id}`);
  }

  createNote(note: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes`, note);
  }

  updateNote(id: number, note: { title: string; content: string }): Observable<any> {
    return this.http.patch(`${this.baseUrl}/notes/${id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notes/${id}`);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }
}
