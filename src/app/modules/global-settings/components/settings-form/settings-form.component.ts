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
import { SettingsEvent } from '../../../../models/enums/globalSetingsEnums/GlobalSettingsEvent';
import { UpdateSettingRequest } from '../../../../models/interfaces/GlobalSettings/request/UpdateSettingRequest';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public settingAction!: {
    event: EventAction;
    settingData: Array<GlobalSettingsDataResponse>;
  };

  public settingSelectedData!: GlobalSettingsDataResponse;
  public settingData!: Array<GlobalSettingsDataResponse>;

  // Formulários
  public createSettingForm = this.formBuilder.group({
    key: ['', Validators.required],
    label: ['', Validators.required],
    value: ['', Validators.required],
  });
  public editSettingForm = this.formBuilder.group({
    label: ['', Validators.required],
    value: ['', Validators.required],
  });

  // propriedades para diferenciar os eventos/actions da aplicação
  public addSettingAction = SettingsEvent.ADD_SETTING_EVENT;
  public editSettingAction = SettingsEvent.EDIT_SETTING_EVENT;

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
  handleSubmitEditSetting(): void {
    if (
      this.editSettingForm.value &&
      this.editSettingForm.valid &&
      this.settingAction.event.id
    ) {
      console.log('O id é: ', Number(this.settingAction?.event?.id));
      // motando os dados para atualizar
      const requestEditSetting: UpdateSettingRequest = {
        id: Number(this.settingAction?.event?.id),
        label: this.editSettingForm.value.label as string,
        value: this.editSettingForm.value.value as string,
      };

      // chamando o servico de atualizar
      this.globalSettingsService
        .updateSetting(requestEditSetting)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Configuração editada com sucesso!',
              life: 2500,
            });
            this.editSettingForm.reset();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar a configuração!',
              life: 2500,
            });
            this.editSettingForm.reset();
          },
        });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private globalSettingsDataTransferService: GlobalSettingsDataTransferService,
    private router: Router,
    private globalSettingsService: GlobalSettingsService,
    private ref: DynamicDialogConfig
  ) {}

  // metodo responsável por buscar os dados dos produtos selecionados:
  getSettingSelectedData(settingId: number): void {
    const allSettings = this.settingData;

    if (allSettings?.length > 0) {
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

  // metodo responsável por buscar os dados da api
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

    // introduzir os dados nos campos
    if (
      this.settingAction?.event.action === this.editSettingAction &&
      this.settingAction?.settingData
    ) {
      this.getSettingSelectedData(Number(this.settingAction?.event?.id));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
