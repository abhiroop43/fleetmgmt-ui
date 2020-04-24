import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { IAuthToken } from '../../models/token.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    rememberMe: false,
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.enableHtml = true;
    this.toastr.toastrConfig.maxOpened = 5;
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form value: ', this.loginForm.value);
    const obsToken: Observable<IAuthToken> = this.authService.loginUser(
      this.loginForm.value
    );

    obsToken.subscribe(
      (tokenResponse) => {
        this.authService.setToken(
          tokenResponse.access_token,
          this.loginForm.controls.rememberMe.value
        );
        this.router.navigate(['/vehicle/list']);
        // .then(() => {
        //   window.location.reload();
        // })
      },
      (httpError) => {
        console.log(httpError);
        if (httpError?.error != null) {
          let errorMessages = '';
          if (httpError.error.error === 'invalid_grant') {
            errorMessages = 'The username and/or password is invalid';
          } else {
            errorMessages = httpError.error.description;
          }

          this.toastr.error(errorMessages, 'Login Failed');
        }
      }
    );
  }
}
