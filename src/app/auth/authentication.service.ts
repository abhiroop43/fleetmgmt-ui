import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token = null;
  constructor() {}

  checkIfUserAuthenticated() {
    this.token = localStorage.getItem('token');

    if (this.token === null) {
      this.token = sessionStorage.getItem('token');
    }

    return this.token !== null;
  }

  getCurrentToken() {
    return this.token;
  }
}
