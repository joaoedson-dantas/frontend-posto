import { SupplyResponse } from '../FuelCar/supply/SupplyResponse';
import { GetTanksResponse } from '../Tanks/GetTanksResponse';

export interface RelatoriosType {
  list: {
    tank: GetTanksResponse | undefined;
    supplys: SupplyResponse[];
    totalSupply: number;
    id: number;
    name: string;
    fuel_tank_id: number;
  }[];
  total: number;
}
