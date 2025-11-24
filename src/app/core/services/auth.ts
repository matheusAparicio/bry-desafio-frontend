import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: { email: string | null; password: string | null }) {
    return this.http.post<{ token: string }>(`${environment.api}/login`, data);
  }

  logout() {
    const token = this.getToken();

    if (token) {
      this.http.post(
        `${environment.api}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).subscribe();
    }

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}