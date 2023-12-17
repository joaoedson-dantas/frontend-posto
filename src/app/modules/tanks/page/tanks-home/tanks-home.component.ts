import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TanksService } from './../../../../services/Tanks/tanks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetTanksResponse } from '../../../../models/interfaces/Tanks/GetTanksResponse';

@Component({
  selector: 'app-tanks-home',
  templateUrl: './tanks-home.component.html',
  styleUrl: './tanks-home.component.scss',
})
export class TanksHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public tanksData: Array<GetTanksResponse> = [];

  constructor(
    private tanksService: TanksService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private ConfirmationService: ConfirmationService,
    private router: Router /* Serve para redirecionar o usuário para outras telas. */
  ) {}

  ngOnInit(): void {
    this.getAllTanks();
  }

  getAllTanks() {
    this.tanksService
      .getAllFuelTanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.tanksData = response;
          }
        },
        error: (err) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
