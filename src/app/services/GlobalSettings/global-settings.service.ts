import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { GlobalSettingsDataResponse } from '../../models/interfaces/GlobalSettings/GlobalSettingsDataResponse';

@Injectable({
  providedIn: 'root',
})
export class GlobalSettingsService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllGlobalSettings(): Observable<Array<GlobalSettingsDataResponse>> {
    return this.http.get<Array<GlobalSettingsDataResponse>>(
      `${this.API_URL}/global-settings`,
      this.httpOptions
    );
  }
}
