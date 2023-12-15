import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

import { UserDataRequest } from '../../models/interfaces/user/UserDataRequest';
import { AuthUserDataRequest } from '../../models/interfaces/user/auth/AuthUserDataRequest';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    login: ['', Validators.required],
    password_hash: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password_hash: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthUserDataRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
            }
          },
          error: (err) => console.log(err),
        });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as UserDataRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário teste criado com sucesso: ');
            }
            this.signupForm.reset();
            this.loginCard = true;
          },
          error: (err) => console.log(err),
        });
    }
  }
}
