import { ReportServiceService } from './../../../../services/reportService/report-service.service';
import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalSettingsService } from '../../../../services/GlobalSettings/global-settings.service';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { GlobalSettingsDataTransferService } from '../../../../shared/services/globalSettings/global-settings-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';
import { SupplyResponse } from '../../../../models/interfaces/FuelCar/supply/SupplyResponse';
import { GetFuelBombsResponse } from '../../../../models/interfaces/FuelCar/Pumps/GetAllFuelBombsResponse';
import { GetTanksResponse } from '../../../../models/interfaces/Tanks/GetTanksResponse';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public settingsList: Array<GlobalSettingsDataResponse> = [];
  public suppliesList: Array<SupplyResponse> = [];
  public bombsLit: Array<GetFuelBombsResponse> = [];
  public tanksList: Array<GetTanksResponse> = [];

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private reportServiceService: ReportServiceService,
    private messageService: MessageService,
    private globalSettingsDTService: GlobalSettingsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getAllGlobalSettings();
    this.getAllSupplys();
    this.getAllBombs();
    this.getTanks();
  }

  // metodo reponsável por buscar as configurações globais
  getAllGlobalSettings(): void {
    this.globalSettingsService
      .getAllGlobalSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.settingsList = response;
            this.globalSettingsDTService.setGlobalSettingsDatas(
              this.settingsList
            );
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar as configurações globais.',
            life: 2500,
          });
        },
      });
  }

  // Abastecimentos
  getAllSupplys(): void {
    this.reportServiceService
      .listAllSupplies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.suppliesList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro os abastecimentos.',
            life: 2500,
          });
        },
      });
  }

  // Bombas de combustíveis
  getAllBombs(): void {
    this.reportServiceService
      .getAllFuelBombs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.bombsLit = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro as buscar as bombas de combustíveis',
            life: 2500,
          });
        },
      });
  }

  getTanks(): void {
    this.reportServiceService
      .getAllTanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.tanksList = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro as buscar as bombas de combustíveis',
            life: 2500,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
