import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static token =
    localStorage.getItem('token') != null
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token');

  tokenUrl = 'http://localhost:5000/connect/token';
  registerUrl = 'http://localhost:5000/Account/RegisterUser';

  constructor(private http: HttpClient) {}

  checkIfUserAuthenticated() {
    AuthenticationService.token =
      localStorage.getItem('token') != null
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token');

    console.log('token value:', AuthenticationService.token);
    console.log('return value:', AuthenticationService.token !== null);
    return of(AuthenticationService.token !== null);
  }

  getCurrentToken() {
    return AuthenticationService.token;
  }

  setToken(accessToken: string, remember: boolean) {
    AuthenticationService.token = accessToken;
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

  logoutUser() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
}
