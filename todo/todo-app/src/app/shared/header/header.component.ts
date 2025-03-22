import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <nav class="header-nav">
      <a routerLink="/todos" class="logo">TodoApp</a>
      <button mat-button (click)="onLogout()">Logout</button>
    </nav>
  `,
  styles: [`
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color:rgb(243, 190, 130);
      padding: 1rem;
    }
    .logo {
      font-weight: bold;
      text-decoration: none;
      color: black;
    }
  `]

})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
    // Reindirizza alla pagina di login
    this.router.navigate(['/login']);
  }
}
