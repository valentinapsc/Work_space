import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: any;
  

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      // In un’app normale si dovrebbe fare una chiamata al backend per creare l'account
      const success = this.authService.register(username, password);
      if (success) {
        // Reindirizza al login 
        this.router.navigate(['/login']);
      } else {
        alert('Registrazione fallita o username già in uso!');
      }
    }
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }
  
}
