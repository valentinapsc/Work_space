import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  // Inizializziamo con un utente di default
  mockUsers: User[] = [
    { username: 'admin', password: 'admin' }
  ];

  login(username: string, password: string): boolean {
    // Controlla se esiste un utente con le credenziali fornite
    const user = this.mockUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  register(username: string, password: string): boolean {
    // Verifica se l'username è già presente
    if (this.mockUsers.find((user) => user.username === username)) {
      return false; // Username già in uso
    }
    // Aggiunge il nuovo utente all'array
    this.mockUsers.push({ username, password });
    return true;
  }
}
