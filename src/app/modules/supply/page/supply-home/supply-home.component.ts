import { SupplyResponse } from './../../../../models/interfaces/FuelCar/supply/SupplyResponse';
import { GlobalSettingsService } from './../../../../services/GlobalSettings/global-settings.service';
import { Router } from '@angular/router';
import { LogoutService } from './../../../../shared/services/logout/logout.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FuelTheCarService } from './../../../../services/Supply/fuel-the-car.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetFuelBombsResponse } from '../../../../models/interfaces/FuelCar/Pumps/GetAllFuelBombsResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { EventActionSupply } from '../../../../models/interfaces/FuelCar/event/FuelCar';
import { SuppleyFormComponent } from '../components/suppley-form/suppley-form.component';

@Component({
  selector: 'app-supply-home',
  templateUrl: './supply-home.component.html',
  styleUrl: './supply-home.component.scss',
})
export class SupplyHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public bombsList: Array<GetFuelBombsResponse> = [];
  public settingsList: Array<GlobalSettingsDataResponse> = [];
  public suppliesList: Array<SupplyResponse> = []; //@InP]

  constructor(
    private fuelTheCarService: FuelTheCarService,
    private messageService: MessageService,
    private globalSettingsService: GlobalSettingsService,
    private router: Router,
    private dialogService: DialogService,
    private logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    this.getAllFuelBombs();
    this.globalSettingList();
  }

  handleTankAction(event: EventActionSupply): void {
    if (event) {
      // metodo responsavel por abrir a modal

      this.ref = this.dialogService.open(SuppleyFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 1000,
        data: {
          event: event,
          suppliesList: this.suppliesList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.getAllSupplies();
        },
      });
    }
  }

  getAllFuelBombs() {
    this.fuelTheCarService
      .getAllFuelBombs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.bombsList = response;
            this.globalSettingList();
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.logoutService.handelLogout();
            this.messageService.add({
              severity: 'error',
              summary: 'Token Expirado',
              detail: 'Logue novamente',
              life: 2500,
            });
            this.router.navigate(['/login']);
          }
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar bombas',
            life: 2500,
          });
        },
      });
  }

  globalSettingList() {
    this.globalSettingsService
      .getAllGlobalSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.settingsList = response;
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.logoutService.handelLogout();
            this.messageService.add({
              severity: 'error',
              summary: 'Token Expirado',
              detail: 'Logue novamente',
              life: 2500,
            });
            this.router.navigate(['/login']);
          }
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar tanks',
            life: 2500,
          });
        },
      });
  }

  getAllSupplies() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
