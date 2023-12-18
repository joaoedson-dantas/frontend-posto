export interface EventActionSupply {
  action: string;
  fuel_tank_id?: number;
}

export enum SupplyEvent {
  ADD_FUEL_EVENT = 'Abastecer',
}
