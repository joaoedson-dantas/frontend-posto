import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'config',
    loadChildren: () =>
      import('./modules/global-settings/global-settings.module').then(
        (m) => m.GlobalSettingsModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'tanks',
    loadChildren: () =>
      import('./modules/tanks/tanks.module').then((m) => m.TanksModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'abastecer',
    loadChildren: () =>
      import('./modules/supply/supply.module').then((m) => m.SupplyModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
