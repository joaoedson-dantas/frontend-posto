export interface GetAllFillTankResponse {
  content: FillTankResponse[];
  pageable: any; // Defina o tipo apropriado se precisar acessar outros campos
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: any; // Defina o tipo apropriado se precisar acessar outros campos
  numberOfElements: number;
  empty: boolean;
}

export interface FillTankResponse {
  id: number;
  date: string;
  liters: number;
  fuel_tank_id: number;
}
