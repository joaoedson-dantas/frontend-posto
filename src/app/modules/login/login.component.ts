import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

import { UserDataRequest } from '../../models/interfaces/user/UserDataRequest';
import { AuthUserDataRequest } from '../../models/interfaces/user/auth/AuthUserDataRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthUserDataRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.cookieService.set('USER_NAME', response.name);
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta, ${response.name}!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer login!`,
              life: 2000,
            });
            console.log(err);
          },
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
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário cadastrado com sucesso`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao criar o usuário!`,
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }
}
