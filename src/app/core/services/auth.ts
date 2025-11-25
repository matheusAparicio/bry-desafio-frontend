import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  user = signal<any | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: any) {
    return this.http.post<{ token: string }>(`${environment.api}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loadUser() {
    return this.http.get(`${environment.api}/user`).subscribe({
      next: (res: any) => {
        this.user.set(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      },
      error: () => {
        this.user.set(null);
      }
    });
  }

  restoreUserFromStorage() {
    const saved = localStorage.getItem('user');
    if (saved) {
      this.user.set(JSON.parse(saved));
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.router.navigate(['/login']);
  }
}
