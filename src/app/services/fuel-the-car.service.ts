import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import {
  GetAllFuelBombsResponse,
  GetFuelBombsResponse,
} from '../models/interfaces/FuelCar/Pumps/GetAllFuelBombsResponse';
import { SupplyRequest } from '../models/interfaces/FuelCar/supply/request/SupplyRequest';
import {
  GetAllSupplyResponse,
  SupplyResponse,
} from '../models/interfaces/FuelCar/supply/SupplyResponse';

@Injectable({
  providedIn: 'root',
})
export class FuelTheCarService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.CookieService.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };
  constructor(private http: HttpClient, private CookieService: CookieService) {}

  // buscar bombas de combustíveis
  getAllFuelBombs(): Observable<Array<GetFuelBombsResponse>> {
    return this.http
      .get<GetAllFuelBombsResponse>(
        `${this.API_URL}/fuel-pumps`,
        this.httpOptions
      )
      .pipe(map((response) => response.content));
  }

  // metodos de abastecimento
  toFuel(requestData: SupplyRequest): Observable<SupplyResponse> {
    return this.http.post<SupplyResponse>(
      `${this.API_URL}/supply/to-fuel`,
      requestData,
      this.httpOptions
    );
  }

  // metodos de buscar todos os abastecimentos;
  ListAllSupplies(): Observable<Array<SupplyResponse>> {
    return this.http
      .get<GetAllSupplyResponse>(
        `${this.API_URL}/supply/all-supplies`,
        this.httpOptions
      )
      .pipe(map((response) => response.content));
  }
}
