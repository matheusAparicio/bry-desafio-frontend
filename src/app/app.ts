import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private router: Router) {}

  protected readonly title = signal('bry-desafio-frontend');

  get showHeader() {
    return (
      this.router.url.startsWith('/companies') ||
      this.router.url.startsWith('/customers') ||
      this.router.url.startsWith('/employees')
    );
  }
}
