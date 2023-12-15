import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  onSubmitLoginForm(): void {
    console.log('Dados do formulário de Login: ', this.loginForm.value);
  }

  onSubmitSignupForm(): void {
    console.log('Dados do formulário de cadastro: ', this.signupForm.value);
  }
}
