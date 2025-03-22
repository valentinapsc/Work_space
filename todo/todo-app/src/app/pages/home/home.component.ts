import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="home-container">
  <mat-card class="login-card">
    <mat-card-title class="login-title">Statistiche Todo</mat-card-title>
    <mat-card-content>
      <p><strong>Totali:</strong> {{ totalTodos }}</p>
      <p><strong>Completati:</strong> {{ completedTodos }}</p>
      <p><strong>In sospeso:</strong> {{ pendingTodos }}</p>
    </mat-card-content>
    <img src="/assets/decor1.png" alt="" class="card-image"/>
  </mat-card>

  <mat-card class="login-card">
    <mat-card-title class="login-title">Aggiunta Rapida</mat-card-title>
    <mat-card-content class="form-container">
      <mat-form-field appearance="fill" class="custom-input">
        <mat-label>Nuovo Todo</mat-label>
        <input matInput [(ngModel)]="newTodoTitle" placeholder="Scrivi qui..." />
      </mat-form-field>
      <button mat-raised-button class="btn-login" (click)="addTodo()">
        Aggiungi
      </button>
    </mat-card-content>
    <img src="/assets/decor2.png" alt="" class="card-image"/>
  </mat-card>

  <mat-card class="login-card">
    <mat-card-title class="login-title">Operazioni Disponibili</mat-card-title>
    <mat-card-content>
      <p>Gestisci la tua lista di Todo con tutte le funzionalità:</p>
      <div class="buttons-row">
        <button mat-stroked-button class="btn-login" (click)="goToTodos()">
          <mat-icon>list</mat-icon> Vai alla Lista Todo
        </button>
        <button mat-stroked-button class="btn-login" (click)="goToAddTodo()">
          <mat-icon>add</mat-icon> Aggiungi
        </button>
      </div>
    </mat-card-content>
    <img src="/assets/decor3.png" alt="" class="card-image"/>
  </mat-card>
</div>

  `,
  styles: [`
    .home-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 5vh;
}

.login-card {
  width: 320px;
  padding: 1.5rem;
  border-radius: 20px !important;
  background-color: #ffffff !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
  text-align: center;
}

.login-title {
  font-size: 1.5rem !important;
  font-weight: bold;
  margin-bottom: 1rem !important;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.custom-input {
  width: 100%;
}

.custom-input .mat-form-field-flex {
  background-color: #ffedd5 !important;
  border-radius: 10px !important;
}

.btn-login {
  background-color: #8b4513 !important;
  color: white !important;
  padding: 0.5rem !important;
  border-radius: 12px !important;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.btn-login:hover {
  background-color: #783c11 !important;
}

.buttons-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
.card-image {
  width: 50px;
  height: 50px;
  margin-top: auto;
  object-fit: contain;
}

  `]
})

export class HomeComponent implements OnInit {
  totalTodos = 0;
  completedTodos = 0;
  pendingTodos = 0;
  newTodoTitle = '';

  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.totalTodos = todos.length;
      this.completedTodos = todos.filter(t => t.completed).length;
      this.pendingTodos = todos.filter(t => !t.completed).length;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = { title: this.newTodoTitle, completed: false };
      this.todoService.addTodo(newTodo).subscribe(() => {
        // Aggiorna le statistiche e svuota il campo
        this.newTodoTitle = '';
        this.loadStats();
      });
    }
  }

  goToTodos(): void {
    this.router.navigate(['/todos']);
  }

  goToAddTodo(): void {
    this.router.navigate(['/todos']); // o /todos/new
  }
}