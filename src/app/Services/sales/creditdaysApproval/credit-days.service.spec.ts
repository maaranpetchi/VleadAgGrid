import { TestBed } from '@angular/core/testing';

import { CreditDaysService } from './credit-days.service';

describe('CreditDaysService', () => {
  let service: CreditDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
