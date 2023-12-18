import { Component, Input, OnInit } from '@angular/core';
import { SupplyResponse } from '../../../../../models/interfaces/FuelCar/supply/SupplyResponse';
import { GetFuelBombsResponse } from '../../../../../models/interfaces/FuelCar/Pumps/GetAllFuelBombsResponse';
import { GetTanksResponse } from '../../../../../models/interfaces/Tanks/GetTanksResponse';
import { RelatoriosType } from '../../../../../models/interfaces/Relatorios/RelatorioType';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
})
export class DashboardTableComponent implements OnInit {
  @Input() supplyList: Array<SupplyResponse> = [];
  @Input() bombsList: Array<GetFuelBombsResponse> = [];
  @Input() tanksList: Array<GetTanksResponse> = [];

  ngOnInit(): void {}

  relatorios(): RelatoriosType {
    const relatorios = this.bombsList.map((bomb) => {
      const supplys = this.supplyList.filter(
        (supply) => supply.fuel_pomp_id === bomb.id
      );
      const tank = this.tanksList.find((tank) => tank.id === bomb.fuel_tank_id);

      const totalSupply = supplys.reduce(
        (acc, currentValue) => acc + currentValue.price,
        0
      );

      return {
        ...bomb,
        tank,
        supplys,
        totalSupply,
      };
    });

    const totalAllSupllys = relatorios.reduce(
      (acc, currentValue) => acc + currentValue.totalSupply,
      0
    );
    const result = {
      list: relatorios,
      total: totalAllSupllys,
    };

    console.log(result);

    return result;
  }
}
