import { GlobalSettingsDataTransferService } from './../../../../shared/services/globalSettings/global-settings-data-transfer.service';
import { GlobalSettingsService } from './../../../../services/GlobalSettings/global-settings.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CreateSettingRequest } from '../../../../models/interfaces/GlobalSettings/request/CreateSettingRequest';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventAction } from '../../../../models/interfaces/GlobalSettings/event/EventAction';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private settingAction!: {
    event: EventAction;
    settingData: Array<GlobalSettingsDataResponse>;
  };

  public settingSelectedData!: GlobalSettingsDataResponse;
  public settingData!: Array<GlobalSettingsDataResponse>;

  // adicioando o formuário reativo

  public createSettingForm = this.formBuilder.group({
    key: ['', Validators.required],
    label: ['', Validators.required],
    value: ['', Validators.required],
  });

  public editSettingForm = this.formBuilder.group({
    label: ['', Validators.required],
    value: ['', Validators.required],
  });

  handleSubmitCreateConfig(): void {
    if (this.createSettingForm?.value && this.createSettingForm.valid) {
      const requestCreateSetting: CreateSettingRequest = {
        label: this.createSettingForm.value.label as string,
        key: this.createSettingForm.value.key as string,
        value: this.createSettingForm.value.value as string,
      };
      this.globalSettingsService
        .createSetting(requestCreateSetting)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Configuração criada com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao criar configuração',
              life: 2500,
            });
          },
        });
    }
    this.createSettingForm.reset();
  }

  handleSubmiteEditSetting(): void {}

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private globalSettingsDataTransferService: GlobalSettingsDataTransferService,
    private router: Router,
    private globalSettingsService: GlobalSettingsService,
    private ref: DynamicDialogConfig
  ) {}

  // metodo responsável por buscar os dados dos produtos selecionados :
  getSettingSelectedData(settingId: number): void {
    const allSettings = this.settingAction?.settingData;
    console.log('testando o all settings ', allSettings.length);

    if (allSettings.length > 0) {
      const settingFiltered = allSettings.filter(
        (element) => element?.id === settingId
      );

      if (settingFiltered) {
        this.settingSelectedData = settingFiltered[0];

        // setar um valor existente no formulári vazio
        this.editSettingForm.setValue({
          label: this.settingSelectedData?.label,
          value: this.settingSelectedData?.value,
        });
      }
    }
  }

  // metodo responsável por buscar os dados que estão armazenados em memoria vindos de outra tela
  getSettingData(): void {
    // buscando os dados na api
    this.globalSettingsService
      .getAllGlobalSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            // persistindo os dados em memoria e no hotObservable
            this.settingData = response;
            this.settingData &&
              this.globalSettingsDataTransferService.setGlobalSettingsDatas(
                this.settingData
              );
          }
        },
      });
  }

  ngOnInit(): void {
    this.settingAction = this.ref.data;
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
