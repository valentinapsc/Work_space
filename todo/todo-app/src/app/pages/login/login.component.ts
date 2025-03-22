import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: any;

  constructor(
    private fb: NonNullableFormBuilder, // <-- importante! (altrimenti mi da errore sui tipi di username e password)
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        this.router.navigate(['/home']);
        this.snackBar.open('Login avvenuto con successo!', 'OK', { duration: 3000 });
      } else {
        this.snackBar.open('Credenziali non valide!', 'Chiudi', { duration: 3000 });
      }
    }
  }  

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}
