import { RegisterResponse } from './../../models/registerUser.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { IRegisterUser } from 'src/app/models/registerUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },
    {
      validators: this.passwordMatch.bind(this),
    }
  );

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form value: ', this.registerForm.value);
    const userRegistered: Observable<any> = this.authService.registerUser(
      this.registerForm.value
    );

    userRegistered.subscribe(
      (response) => {
        if (response?.succeeded) {
          this.router.navigate(['/auth/login']);
        }
        // console.log(response);
      },
      (httpError) => {
        // console.log(httpError);
        if (
          httpError?.error.errors != null &&
          httpError?.error.errors.length > 0
        ) {
          const errorMessages = httpError.error.errors
            .map((elem) => {
              return elem.description;
            })
            .join(',');

          // TODO: Move error message to toast notifications
          console.warn(
            `Error occurred during user registration: ${errorMessages}`
          );
        }
      }
    );
  }

  // validation rule for confirm password
  passwordMatch(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
