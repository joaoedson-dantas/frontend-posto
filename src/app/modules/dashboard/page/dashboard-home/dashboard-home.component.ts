import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalSettingsService } from '../../../../services/GlobalSettings/global-settings.service';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { GlobalSettingsDataTransferService } from '../../../../shared/services/globalSettings/global-settings-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public settingsList: Array<GlobalSettingsDataResponse> = [];

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private messageService: MessageService,
    private globalSettingsDTService: GlobalSettingsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getAllGlobalSettings();
  }

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
