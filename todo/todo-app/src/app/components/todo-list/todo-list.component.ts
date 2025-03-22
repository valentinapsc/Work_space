import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoService, Todo } from '../../services/todo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],  
  template: `
    <div class="todo-container">
  <h2 class="login-title">Le tue attività</h2>
  <div class="todo-form">
    <mat-form-field appearance="fill" class="custom-input">
      <mat-label>Nuova attività</mat-label>
      <input matInput [(ngModel)]="newTodoTitle" placeholder="Scrivi qui..." />
    </mat-form-field>
    <button mat-raised-button class="btn-login" (click)="add()">Aggiungi</button>
  </div>

  <mat-card *ngFor="let todo of todos" class="login-card">
    <mat-card-content>
      <span [class.completed]="todo.completed">{{ todo.title }}</span>
    </mat-card-content>
    <mat-card-actions>
      <button mat-stroked-button class="btn-login" (click)="toggleComplete(todo)">
        <mat-icon>done</mat-icon> Completa
      </button>
      <button mat-stroked-button color="warn" (click)="delete(todo.id!)">
        <mat-icon>delete</mat-icon> Elimina
      </button>
    </mat-card-actions>
  </mat-card>
</div>

  `,
  styles: [`
    .todo-container {
  max-width: 600px;
  margin: auto;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.todo-form {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.custom-input {
  flex: 1;
}

.custom-input .mat-form-field-flex {
  background-color: #ffedd5 !important;
  border-radius: 10px !important;
}

.btn-login {
  background-color: #8b4513 !important;
  color: white !important;
  padding: 0.6rem 1rem !important;
  border-radius: 12px !important;
}

.btn-login:hover {
  background-color: #783c11 !important;
}

.login-card {
  padding: 1rem;
  border-radius: 20px !important;
  background-color: #ffffff !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

  `]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  add(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = { title: this.newTodoTitle, completed: false };
      this.todoService.addTodo(newTodo).subscribe(todo => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      });
    }
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  delete(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }
}
