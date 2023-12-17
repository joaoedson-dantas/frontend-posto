import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private cookieService: CookieService, private router: Router) {}

  handelLogout(): void {
    this.cookieService.delete('USER_INFO');
    this.cookieService.delete('USER_NAME');
    void this.router.navigate(['/login']);
  }
}
