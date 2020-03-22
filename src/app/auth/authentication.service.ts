import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token = null;
  tokenUrl = 'http://localhost:5000/connect/token';
  registerUrl = 'http://localhost:5000/Account/RegisterUser';

  constructor(private http: HttpClient) {}

  checkIfUserAuthenticated() {
    this.token = localStorage.getItem('token');

    if (this.token === null) {
      this.token = sessionStorage.getItem('token');
    } else {
      this.token = null;
    }
    // console.log('token value:', this.token);
    return this.token !== null;
  }

  getCurrentToken() {
    return this.token;
  }

  setToken(accessToken: string, remember: boolean) {
    if (remember === true) {
      localStorage.setItem('token', accessToken);
    } else {
      sessionStorage.setItem('token', accessToken);
    }
  }

  loginUser(userCredentials: any) {
    // var obsToken: Observable<IAuthToken> =
    return this.http.post(
      this.tokenUrl,
      `client_id=ro.client&client_secret=secret&grant_type=password&username=${userCredentials.username}&password=${userCredentials.password}&rememberMe=${userCredentials.rememberMe}&scope=fleetMgmt`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }
    );

    // obsToken.subscribe(tokenResponse => {
    //   this.token = tokenResponse.access_token;
    //   if (userCredentials.rememberMe === true) {
    //     localStorage.setItem('token', this.token);
    //   } else {
    //     sessionStorage.setItem('token', this.token);
    //   }
    // });
  }
}
