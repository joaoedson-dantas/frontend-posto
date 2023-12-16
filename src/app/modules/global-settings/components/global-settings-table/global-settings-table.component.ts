import { Component, Input } from '@angular/core';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/GlobalSettingsDataResponse';

@Component({
  selector: 'app-global-settings-table',
  templateUrl: './global-settings-table.component.html',
  styleUrl: './global-settings-table.component.scss',
})
export class GlobalSettingsTableComponent {
  @Input() settings: Array<GlobalSettingsDataResponse> = []; // Serve para receber dados do componente filho

  public settingSelected!: GlobalSettingsDataResponse;
}
