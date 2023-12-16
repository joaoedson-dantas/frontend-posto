import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalSettingsDataResponse } from '../../../../models/interfaces/GlobalSettings/GlobalSettingsDataResponse';
import { SettingsEvent } from '../../../../models/enums/globalSetingsEnums/GlobalSettingsEvent';
import { EventAction } from '../../../../models/interfaces/GlobalSettings/event/EventAction';

@Component({
  selector: 'app-global-settings-table',
  templateUrl: './global-settings-table.component.html',
  styleUrl: './global-settings-table.component.scss',
})
export class GlobalSettingsTableComponent {
  @Input() settings: Array<GlobalSettingsDataResponse> = []; // Serve para receber dados do componente filho
  @Output() settingEvent = new EventEmitter<EventAction>();

  public settingSelected!: GlobalSettingsDataResponse;

  /* props events output */

  public addSettingEvent = SettingsEvent.ADD_SETTING_EVENT;
  public editSettingEvent = SettingsEvent.EDIT_SETTING_EVENT;

  handleSettingsEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const settingEventData = id && id !== '' ? { action, id } : { action };
      // EMITIR O VALOR DO ENVENTO

      this.settingEvent.emit(settingEventData);
    }
  }
}
