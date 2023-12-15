import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GlobalSettingsDataResponse } from '../../../models/interfaces/GlobalSettings/GlobalSettingsDataResponse';

@Injectable({
  providedIn: 'root',
})
export class GlobalSettingsDataTransferService {
  public globalSettingsDataEmitter$ =
    new BehaviorSubject<Array<GlobalSettingsDataResponse> | null>(null);

  public globalSettingsDatas: Array<GlobalSettingsDataResponse> = [];

  // recebe os dados
  setGlobalSettingsDatas(
    settingsDatas: Array<GlobalSettingsDataResponse>
  ): void {
    if (settingsDatas) {
      this.globalSettingsDataEmitter$.next(settingsDatas);
      this.getSettingsDatas();
    }
  }

  // enviar os dados
  getSettingsDatas() {
    this.globalSettingsDataEmitter$.pipe(take(1)).subscribe({
      next: (response) => {
        if (response) {
          this.globalSettingsDatas = response;
        }
      },
    });
    return this.globalSettingsDatas;
  }
}
