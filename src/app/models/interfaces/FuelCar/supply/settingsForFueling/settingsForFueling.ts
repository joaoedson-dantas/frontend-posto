export interface SettingsForFueling {
  fuelType: string;
  fuel_price: number;
  tax_value: number;
}

export class SettingsForFueling {
  public fuelType!: string;
  public fuel_price!: number;
  public tax_value!: number;

  constructor(data: SettingsForFueling) {}
}
