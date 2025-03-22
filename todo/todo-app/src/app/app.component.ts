import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
// Importa il componente della Todo List, standalone
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Router, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';

import { HeaderComponent } from './shared/header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <!-- Side nav visibile solo se l'utente è loggato -->
      <mat-sidenav #drawer mode="side" [opened]="false" *ngIf="authService.isLoggedIn">
        <mat-nav-list>
          <button mat-button (click)="goHome()">Home</button>
          <button mat-button (click)="logout()">Logout</button>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <!-- Toolbar in alto con il logo -->
        <mat-toolbar color="primary">
          <span class="logo">TodoApp</span>
          <span class="spacer"></span>
          <!-- Pulsante per aprire il side nav -->
          <button mat-icon-button (click)="toggleDrawer()" *ngIf="authService.isLoggedIn">
          <img src="/assets/menu.png" alt="menu-icon" class="menu-icon"/>
          </button>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  // Sposta QUI dentro la classe:
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Aggiungi il metodo toggleDrawer() che richiama this.drawer.toggle()
  toggleDrawer() {
    this.drawer.toggle();
  }
}