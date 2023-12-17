export interface SupplyResponse {
  id: number;
  date: Date;
  liters: number;
  price: number;
  tax: number;
  fuel_pomp_id: number;
}

export interface GetAllSupplyResponse {
  content: SupplyResponse[];
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
