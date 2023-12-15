import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '../../../../services/GlobalSettings/global-settings.service';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/GlobalSettingsDataResponse';
import { GlobalSettingsDataTransferService } from '../../../../shared/services/globalSettings/global-settings-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
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
    this.globalSettingsService.getAllGlobalSettings().subscribe({
      next: (response) => {
        if (response) {
          this.settingsList = response;
          console.log('DADOS DAS CONFIGURAÇÕES: ', this.settingsList);
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
}
