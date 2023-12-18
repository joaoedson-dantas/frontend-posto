import { FillTankResponse } from './../../../../models/interfaces/Tanks/response/GetAllFillTankResponse';
import { LogoutService } from './../../../../shared/services/logout/logout.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TanksService } from './../../../../services/Tanks/tanks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetTanksResponse } from '../../../../models/interfaces/Tanks/GetTanksResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { EventActionTank } from '../../../../models/interfaces/Tanks/event/EventActionTank';
import { TanksFormComponent } from '../../components/tanks-form/tanks-form.component';

@Component({
  selector: 'app-tanks-home',
  templateUrl: './tanks-home.component.html',
  styleUrl: './tanks-home.component.scss',
})
export class TanksHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public tanksList: Array<GetTanksResponse> = [];
  public fillTankList: Array<FillTankResponse> = [];

  constructor(
    private tanksService: TanksService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private logoutService: LogoutService,
    private router: Router /* Serve para redirecionar o usuário para outras telas. */
  ) {}

  ngOnInit(): void {
    this.getAllTanks();
    this.getAllFillTank();
  }

  // recebendo evento através do output
  handleTankAction(event: EventActionTank): void {
    if (event) {
      // metodo responsavel por abrir a modal

      this.ref = this.dialogService.open(TanksFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 1000,
        data: {
          event: event,
          tankList: this.tanksList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.getAllFillTank(), this.getAllTanks();
        },
      });
    }
  }

  // busca dados na api.
  getAllTanks() {
    this.tanksService
      .getAllFuelTanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.tanksList = response;
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

  getAllFillTank() {
    this.tanksService
      .getAllFillTanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.fillTankList = response;
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.logoutService.handelLogout();
            this.messageService.add({
              severity: 'error',
              summary: 'Token Expirado',
              detail: 'Entre novamente',
              life: 2500,
            });
            this.router.navigate(['/login']);
          }
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar os abastecimentos',
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
