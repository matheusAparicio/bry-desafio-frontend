import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  constructor(private router: Router) {}

  go(path: string) {
    this.router.navigate([path]);
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  newItem() {
    if (this.router.url.startsWith('/companies')) {
      this.router.navigate(['/companies/new']);
    } 
    else if (this.router.url.startsWith('/customers')) {
      this.router.navigate(['/customers/new']);
    } 
    else if (this.router.url.startsWith('/employees')) {
      this.router.navigate(['/employees/new']);
    }
  }
}