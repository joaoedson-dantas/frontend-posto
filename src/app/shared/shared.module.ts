import { DialogService } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
  ],
  exports: [ToolbarNavigationComponent],
  providers: [DialogService, CurrencyPipe, CookieService],
})
export class SharedModule {}
