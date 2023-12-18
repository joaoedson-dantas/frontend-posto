import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SupplyResponse } from '../../../../../models/interfaces/FuelCar/supply/SupplyResponse';
import { GetFuelBombsResponse } from '../../../../../models/interfaces/FuelCar/Pumps/GetAllFuelBombsResponse';
import { SettingsForFueling } from '../../../../../models/interfaces/FuelCar/supply/settingsForFueling/settingsForFueling';
import { GlobalSettingsDataResponse } from '../../../../../models/interfaces/GlobalSettings/response/GlobalSettingsDataResponse';
import {
  EventActionSupply,
  SupplyEvent,
} from '../../../../../models/interfaces/FuelCar/event/FuelCar';

@Component({
  selector: 'app-supply-table',
  templateUrl: './supply-table.component.html',
  styleUrl: './supply-table.component.scss',
})
export class SupplyTableComponent {
  @Input() suppliesList: Array<SupplyResponse> = [];
  @Input() bombsList: Array<GetFuelBombsResponse> = [];
  @Input() settingsList: Array<GlobalSettingsDataResponse> = [];
  @Output() public supplyEvent = new EventEmitter<EventActionSupply>();

  private settingsForFueLingData: SettingsForFueling = {
    fuelType: '',
    fuel_price: 0,
    tax_value: 0,
  };

  // metodos
  getFuelPrice(fuelType: string) {
    const fuelPriceConfig = this.settingsList.find(
      (item) => item.key === `${fuelType}-price`
    );

    if (fuelPriceConfig) {
      return fuelPriceConfig.value;
    } else {
      console.error(`Configuração para "${fuelType}-price" não encontrada.`);
      return null;
    }
  }

  getConfigValue(configKey: string) {
    const configItem = this.settingsList.find((item) => item.key === configKey);

    if (configItem) {
      return configItem.value;
    } else {
      console.error(`Configuração para "${configKey}" não encontrada.`);
      return null;
    }
  }
  settingsForFueling(bombId: number) {
    const bomb = this.bombsList.filter((bomb) => bomb.id === bombId);
    if (bomb[0].fuel_tank_id === 1) {
      this.settingsForFueLingData.fuelType = 'Gasolina';
      this.settingsForFueLingData.fuel_price = Number(
        this.getFuelPrice('gasoline')
      );
    } else if (bomb[0].fuel_tank_id === 2) {
      (this.settingsForFueLingData.fuelType = 'Diesel'),
        (this.settingsForFueLingData.fuel_price = Number(
          this.getFuelPrice('diesel-oil')
        ));
    } else {
      console.log('Tipo de combustivel não encontrado');
    }
    this.settingsForFueLingData.tax_value = Number(
      this.getConfigValue('tax-value')
    );
  }

  public fuelSupplyEvent = SupplyEvent.ADD_FUEL_EVENT;

  handleSupplyEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const suppleyEventData = id && id !== 0 ? { action, id } : { action };
      this.supplyEvent.emit(suppleyEventData);
    }
  }
}
