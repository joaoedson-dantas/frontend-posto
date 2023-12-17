import { TanksService } from './../../../../services/Tanks/tanks.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { TanksEvent } from '../../../../models/enums/TanksEnums/TanksEvent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tanks-form',
  templateUrl: './tanks-form.component.html',
  styleUrl: './tanks-form.component.scss',
})
export class TanksFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public tanksAction!: { event: TanksEvent };

  public fillTankForm = this.formBuilder.group({
    liters: [0, Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private tanksService: TanksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTanks();
  }

  getAllTanks() {}

  // metodo abastecer tanque
  handleSubmitAddFuel(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
