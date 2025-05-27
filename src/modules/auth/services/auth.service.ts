import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mockUser = {
    email: 'admin@example.com',
    password: '123456',
    name: 'Admin User',
  };

  private loggedIn = false;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      this.loggedIn = true;
      localStorage.setItem('user', JSON.stringify(this.mockUser));
      return true;
    }

    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return this.loggedIn || !!localStorage.getItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
