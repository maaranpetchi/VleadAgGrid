import { TestBed } from '@angular/core/testing';

import { BillingCycleMonthlyService } from './billing-cycle-monthly.service';

describe('BillingCycleMonthlyService', () => {
  let service: BillingCycleMonthlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingCycleMonthlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
