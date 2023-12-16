import { TestBed } from '@angular/core/testing';

import { FuelTanksService } from './fuel-tanks.service';

describe('FuelTanksService', () => {
  let service: FuelTanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelTanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
