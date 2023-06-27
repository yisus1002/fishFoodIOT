import { TestBed } from '@angular/core/testing';

import { HcsrService } from './hcsr.service';

describe('HcsrService', () => {
  let service: HcsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
