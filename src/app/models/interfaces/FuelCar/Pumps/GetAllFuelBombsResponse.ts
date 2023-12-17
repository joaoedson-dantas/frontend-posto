export interface GetFuelBombsResponse {
  id: number;
  name: string;
  fuel_tank_id: number;
}

export interface GetAllFuelBombsResponse {
  content: GetFuelBombsResponse[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  empty: boolean;
}
