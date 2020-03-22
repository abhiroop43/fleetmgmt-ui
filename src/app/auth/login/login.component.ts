import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { IAuthToken } from '../../models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    rememberMe: false
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form value: ', this.loginForm.value);
    const obsToken: Observable<IAuthToken> = this.authService.loginUser(
      this.loginForm.value
    );

    obsToken.subscribe(tokenResponse => {
      this.authService.setToken(
        tokenResponse.access_token,
        this.loginForm.controls.rememberMe.value
      );
      this.router.navigate(['/vehicle/list']);
      // .then(() => {
      //   window.location.reload();
      // })
    });
  }
}
