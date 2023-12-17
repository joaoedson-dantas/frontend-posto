import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GetTanksResponse } from '../../models/interfaces/Tanks/GetTanksResponse';
import { FillTankDataRequest } from '../../models/interfaces/Tanks/request/FillTankDataRequest';
import { FillTankDataResponse } from '../../models/interfaces/Tanks/request/FillTankDataReponse';

@Injectable({
  providedIn: 'root',
})
export class TanksService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllFuelTanks(): Observable<Array<GetTanksResponse>> {
    return this.http.get<Array<GetTanksResponse>>(
      `${this.API_URL}/fuel-tanks`,
      this.httpOptions
    );
  }

  fillFuelTank(
    requestData: FillTankDataRequest
  ): Observable<Array<FillTankDataResponse>> {
    return this.http.post<Array<FillTankDataResponse>>(
      `${this.API_URL}/fill-tanks`,
      requestData,
      this.httpOptions
    );
  }
}
