import { FuelTheCarService } from './../../../../../services/Supply/fuel-the-car.service';
import { LogoutService } from './../../../../../shared/services/logout/logout.service';
import { GlobalSettingsService } from './../../../../../services/GlobalSettings/global-settings.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SupplyEvent } from '../../../../../models/interfaces/FuelCar/event/FuelCar';
import { SupplyRequest } from '../../../../../models/interfaces/FuelCar/supply/request/SupplyRequest';
import { GlobalSettingsDataResponse } from '../../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-suppley-form',
  templateUrl: './suppley-form.component.html',
  styleUrl: './suppley-form.component.scss',
})
export class SuppleyFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  private settingsList: Array<GlobalSettingsDataResponse> = [];
  public supplEvent!: { event: SupplyEvent };
  public fuelCarEvent = SupplyEvent.ADD_FUEL_EVENT;
  private fuel_pomp_id: number | null = null;

  public supplyForm = this.formBuilder.group({
    value: [0, Validators.required],
    fuel_bomb_id: [0, Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private globalSettingsService: GlobalSettingsService,
    private logoutService: LogoutService,
    private router: Router,
    private fuelTheCarService: FuelTheCarService
  ) {}

  ngOnInit(): void {
    this.globalSettingList();
    this.fuel_pomp_id = this.ref.data?.event?.id;
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

  private fuel_key!: string;
  private tax!: number;
  private fuelPrice!: number;
  private priceWithTax!: number;
  private liters!: number;

  handleSubmitAddFuelSupply(): void {
    /* convertendo para litros */
    this.globalSettingList();

    if (this.settingsList.length > 1) {
      const tax_value_setting = this.settingsList.filter(
        (config) => config.key === 'tax-value'
      );
      this.tax = Number(tax_value_setting) / 100;

      this.globalSettingList();
      if (this.supplyForm?.value && this.supplyForm.valid) {
        //
        if (this.fuel_pomp_id === 1 || this.fuel_pomp_id === 2) {
          this.fuelPrice = Number(this.settingsList[0].value);
          this.fuel_key = this.settingsList[0].key;
        } else {
          this.fuelPrice = Number(this.settingsList[1].value);
          this.fuel_key = this.settingsList[1].key;
        }

        this.priceWithTax = Number(this.supplyForm.value.value);
        this.liters = this.priceWithTax / this.fuelPrice;

        const requestData: SupplyRequest = {
          fuel_key: this.fuel_key,
          date: new Date(),
          liters: this.liters,
          fuel_pomp_id: Number(this.fuel_pomp_id),
        };
        console.log(requestData);
        this.fuelTheCarService
          .toFuel(requestData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Abastecimento realizado com sucesso',
                  life: 3000,
                });
                this.supplyForm.reset();
                // this.getAllTanks();
              }
            },
            error: (err) => {
              console.log(err);
              this.supplyForm.reset();
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao abastecer o tanque',
                life: 3000,
              });
            },
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
