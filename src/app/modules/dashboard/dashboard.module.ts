import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';

import { DASHBOARD_ROUTES } from './dashboard.routing';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReportServiceService } from '../../services/reportService/report-service.service';
import { DashboardTableComponent } from './page/components/dashboard-table/dashboard-table.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [DashboardHomeComponent, DashboardTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    HttpClientModule,
    // PrimeNG
    ToolbarModule,
    CardModule,
    ToastModule,
    ChartModule,
    // Shared
    SharedModule,
    AccordionModule,
  ],
  providers: [MessageService, CookieService, ReportServiceService],
})
export class DashboardModule {}
