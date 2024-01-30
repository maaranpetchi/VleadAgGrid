import { TestBed } from '@angular/core/testing';

import { CustomerreceiptsService } from './customerreceipts.service';

describe('CustomerreceiptsService', () => {
  let service: CustomerreceiptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerreceiptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
