import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { UserDataRequest } from '../../models/interfaces/user/UserDataRequest';
import { UserDataResponse } from '../../models/interfaces/user/UserDataResponse';
import { AuthUserDataRequest } from '../../models/interfaces/user/auth/AuthUserDataRequest';
import { AuthUserDataResponse } from '../../models/interfaces/user/auth/AuthUserDataResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /* Service create user */
  signupUser(requestData: UserDataRequest): Observable<UserDataResponse> {
    return this.http.post<UserDataResponse>(
      `${this.API_URL}/users`,
      requestData
    );
  }

  /* Service auth user */
  authUser(requestData: AuthUserDataRequest): Observable<AuthUserDataResponse> {
    return this.http.post<AuthUserDataResponse>(
      `${this.API_URL}/auth/user`,
      requestData
    );
  }

  /* Check logged in user */
  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
