import { MessageService } from 'primeng/api';
import { GlobalSettingsDataTransferService } from './../../../../shared/services/globalSettings/global-settings-data-transfer.service';
import { GlobalSettingsService } from './../../../../services/GlobalSettings/global-settings.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { EventAction } from '../../../../models/interfaces/GlobalSettings/event/EventAction';

@Component({
  selector: 'app-global-settings-home',
  templateUrl: './global-settings-home.component.html',
  styleUrl: './global-settings-home.component.scss',
})
export class GlobalSettingsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public settingsList: Array<GlobalSettingsDataResponse> = [];

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private globalSettingsDataTransferService: GlobalSettingsDataTransferService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getServiceGlobalSettings();
  }

  getServiceGlobalSettings() {
    // configurações que estão armazenadas em estado
    const settingsLoaded =
      this.globalSettingsDataTransferService.getSettingsDatas();
    console.log(settingsLoaded.length);

    if (!settingsLoaded == undefined || settingsLoaded.length != 0) {
      this.settingsList = settingsLoaded;
      console.log(' oi DADOS DE PRODUTOS', this.settingsList);
    } else this.getAPISettingsDatas();
  }

  // Caso os dados não estejam salvos, vai buscar na api;
  getAPISettingsDatas() {
    this.globalSettingsService
      .getAllGlobalSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.settingsList = response;
            console.log('oi sou um dado da api', this.settingsList);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  // metodo para recebe o output do Dumb Component;

  handleSettingAction(event: EventAction): void {
    if (event) {
      console.log('DADOS DO ENVENTO RECEBIDO: ', event);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }
}
