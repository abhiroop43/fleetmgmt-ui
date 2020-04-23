import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IRegisterUser } from '../models/registerUser.model';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // static token =
  //   localStorage.getItem('token') != null
  //     ? localStorage.getItem('token')
  //     : sessionStorage.getItem('token');

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  tokenUrl = `${this.config.identityApiUrl}connect/token`;
  registerUrl = `${this.config.identityApiUrl}Account/RegisterUser`;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  hasToken() {
    return (
      (localStorage.getItem('token') != null
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token')) != null
    );
  }

  checkIfUserAuthenticated() {
    // AuthenticationService.token =
    //   localStorage.getItem('token') != null
    //     ? localStorage.getItem('token')
    //     : sessionStorage.getItem('token');

    // console.log('token value:', AuthenticationService.token);
    // console.log('return value:', AuthenticationService.token !== null);
    // return of(AuthenticationService.token !== null);
    return this.isLoginSubject.asObservable();
  }

  getCurrentToken() {
    return localStorage.getItem('token') != null
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token');
  }

  setToken(accessToken: string, remember: boolean) {
    // AuthenticationService.token = accessToken;
    this.isLoginSubject.next(true);
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
      // tslint:disable-next-line: max-line-length
      `client_id=ro.client&client_secret=secret&grant_type=password&username=${userCredentials.username}&password=${userCredentials.password}&rememberMe=${userCredentials.rememberMe}&scope=fleetMgmt`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
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
    this.isLoginSubject.next(false);
  }

  registerUser(userRegistrationDetails: IRegisterUser) {
    return this.http.post(this.registerUrl, userRegistrationDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
