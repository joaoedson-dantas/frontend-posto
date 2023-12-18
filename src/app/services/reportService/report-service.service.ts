import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplyResponse } from '../../models/interfaces/FuelCar/supply/SupplyResponse';
import { GetFuelBombsResponse } from '../../models/interfaces/FuelCar/Pumps/GetAllFuelBombsResponse';
import { FillTankResponse } from '../../models/interfaces/Tanks/response/GetAllFillTankResponse';
import { GlobalSettingsDataResponse } from '../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { GetTanksResponse } from '../../models/interfaces/Tanks/GetTanksResponse';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  // buscar todos os abastecimentos
  listAllSupplies(): Observable<Array<SupplyResponse>> {
    return this.http.get<Array<SupplyResponse>>(
      `${this.API_URL}/supply/all-supplies?sort=date`,
      this.httpOptions
    );
  }

  // buscar todos as bombas
  getAllFuelBombs(): Observable<Array<GetFuelBombsResponse>> {
    return this.http.get<Array<GetFuelBombsResponse>>(
      `${this.API_URL}/fuel-pumps`,
      this.httpOptions
    );
  }

  // buscar todos os abastecimentos aos tanques
  getAllFillTanks(): Observable<Array<FillTankResponse>> {
    return this.http.get<Array<FillTankResponse>>(
      `${this.API_URL}/fill-tanks`,
      this.httpOptions
    );
  }

  // buscar todos os tanques

  getAllTanks(): Observable<Array<GetTanksResponse>> {
    return this.http.get<Array<GetTanksResponse>>(
      `${this.API_URL}/fuel-tanks`,
      this.httpOptions
    );
  }

  // buscar todas as configurações
  getAllGlobalSettings(): Observable<Array<GlobalSettingsDataResponse>> {
    return this.http.get<Array<GlobalSettingsDataResponse>>(
      `${this.API_URL}/global-settings`,
      this.httpOptions
    );
  }
}
