import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  isLoggedIn = this.userService.isLoggedIn();
  userName = this.isLoggedIn ? this.cookieService.get('USER_NAME') : '';

  handelLogout(): void {
    this.cookieService.delete('USER_INFO');
    this.cookieService.delete('USER_NAME');
    this.isLoggedIn = false;
    void this.router.navigate(['/login']);
  }
}
