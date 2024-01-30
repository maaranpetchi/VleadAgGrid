import { TestBed } from '@angular/core/testing';

import { PricingcalculationService } from './pricingcalculation.service';

describe('PricingcalculationService', () => {
  let service: PricingcalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingcalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
