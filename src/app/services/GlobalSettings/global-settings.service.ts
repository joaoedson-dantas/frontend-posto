import { CreateSettingRequest } from './../../models/interfaces/GlobalSettings/request/CreateSettingRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GlobalSettingsDataResponse } from '../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { CreateSettingResponse } from '../../models/interfaces/GlobalSettings/response/CreteSettingsResponse';
import { UpdateSettingRequest } from '../../models/interfaces/GlobalSettings/request/UpdateSettingRequest';

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

  createSetting(
    datasRequest: CreateSettingRequest
  ): Observable<CreateSettingResponse> {
    return this.http.post<CreateSettingResponse>(
      `${this.API_URL}/global-settings`,
      datasRequest,
      this.httpOptions
    );
  }

  updateSetting(datasRequest: UpdateSettingRequest): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/global-settings`,
      datasRequest,
      this.httpOptions
    );
  }
}
