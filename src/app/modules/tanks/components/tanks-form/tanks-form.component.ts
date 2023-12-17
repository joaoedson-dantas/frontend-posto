import { FillTankDataRequest } from './../../../../models/interfaces/Tanks/request/FillTankDataRequest';
import { TanksService } from './../../../../services/Tanks/tanks.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { TanksEvent } from '../../../../models/enums/TanksEnums/TanksEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tanks-form',
  templateUrl: './tanks-form.component.html',
  styleUrl: './tanks-form.component.scss',
})
export class TanksFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public tanksEvent!: { event: TanksEvent };
  public fillTankEvent = TanksEvent.ADD_FUEL_EVENT;
  private fuel_tank_id: number | null = null;

  public fillTankForm = this.formBuilder.group({
    liters: [0, Validators.required],
    fuel_tank_id: [0, Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private tanksService: TanksService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.fuel_tank_id = this.ref.data?.event?.id;
    this.getAllTanks();
  }

  getAllTanks() {}

  // metodo abastecer tanque
  handleSubmitAddFuel(): void {
    if (this.fillTankForm?.value && this.fillTankForm.valid) {
      const requestData: FillTankDataRequest = {
        liters: this.fillTankForm.value?.liters as number,
        fuel_tank_id: this.fuel_tank_id as number,
      };

      this.tanksService
        .fillFuelTank(requestData)
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
              this.fillTankForm.reset();
              this.getAllTanks();
            }
          },
          error: (err) => {
            console.log(err);
            this.fillTankForm.reset();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
