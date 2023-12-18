import { TestBed } from '@angular/core/testing';

import { FuelTheCarService } from './fuel-the-car.service';

describe('FuelTheCarService', () => {
  let service: FuelTheCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelTheCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
