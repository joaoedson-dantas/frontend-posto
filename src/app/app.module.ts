import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './modules/header/header.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './modules/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    // PrimeNg
    CardModule,
    ToastModule,
  ],
  providers: [CookieService, MessageService, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
