import { TestBed } from '@angular/core/testing';

import { GlobalSettingsDataTransferService } from './global-settings-data-transfer.service';

describe('GlobalSettingsDataTransferService', () => {
  let service: GlobalSettingsDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSettingsDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
