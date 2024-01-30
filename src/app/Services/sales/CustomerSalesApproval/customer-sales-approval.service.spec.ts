import { TestBed } from '@angular/core/testing';

import { CustomerSalesApprovalService } from './customer-sales-approval.service';

describe('CustomerSalesApprovalService', () => {
  let service: CustomerSalesApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSalesApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
