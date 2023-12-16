import { GlobalSettingsService } from './../../../../services/GlobalSettings/global-settings.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CreateSettingRequest } from '../../../../models/interfaces/GlobalSettings/request/CreateSettingRequest';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  // adicioando o formuário reativo

  public createSettingForm = this.formBuilder.group({
    key: ['', Validators.required],
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

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private globalSettingsService: GlobalSettingsService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
