import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { GlobalSettingsDataTransferService } from './../../../../shared/services/globalSettings/global-settings-data-transfer.service';
import { GlobalSettingsService } from './../../../../services/GlobalSettings/global-settings.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import { EventAction } from '../../../../models/interfaces/GlobalSettings/event/EventAction';
import { SettingsFormComponent } from '../../components/settings-form/settings-form.component';

@Component({
  selector: 'app-global-settings-home',
  templateUrl: './global-settings-home.component.html',
  styleUrl: './global-settings-home.component.scss',
})
export class GlobalSettingsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public settingsList: Array<GlobalSettingsDataResponse> = [];

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private globalSettingsDataTransferService: GlobalSettingsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getServiceGlobalSettings();
  }

  getServiceGlobalSettings() {
    // configurações que estão armazenadas em estado
    const settingsLoaded =
      this.globalSettingsDataTransferService.getSettingsDatas();

    if (!settingsLoaded == undefined || settingsLoaded.length != 0) {
      this.settingsList = settingsLoaded;
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
      this.ref = this.dialogService.open(SettingsFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 1000,
        maximizable: true,
        data: {
          event: event,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPISettingsDatas(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete;
  }
}
