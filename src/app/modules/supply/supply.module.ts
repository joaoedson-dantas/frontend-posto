import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';

import { FuelTheCarService } from '../../services/Supply/fuel-the-car.service';
import { SupplyHomeComponent } from './page/supply-home/supply-home.component';
import { SUPPLY_ROUTES } from './supply.routing';
import { SharedModule } from '../../shared/shared.module';
import { SupplyTableComponent } from './page/components/supply-table/supply-table.component';
import { SuppleyFormComponent } from './page/components/suppley-form/suppley-form.component';

@NgModule({
  declarations: [SupplyHomeComponent, SupplyTableComponent, SuppleyFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SUPPLY_ROUTES),
    SharedModule,
    HttpClientModule,
    //prime
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
  ],

  providers: [DialogService, ConfirmationService, FuelTheCarService],
})
export class SupplyModule {}
