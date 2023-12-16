import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FuelTanksResponse } from '../../models/interfaces/FuelTanks/FuelTanksResponse';

@Injectable({
  providedIn: 'root',
})
export class FuelTanksService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllFuelTanks(): Observable<Array<FuelTanksResponse>> {
    return this.http.get<Array<FuelTanksResponse>>(
      `${this.API_URL}/fuel-tanks`,
      this.httpOptions
    );
  }
}
