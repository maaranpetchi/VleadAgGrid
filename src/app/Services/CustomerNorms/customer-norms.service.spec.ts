import { TestBed } from '@angular/core/testing';

import { CustomerNormsService } from './customer-norms.service';

describe('CustomerNormsService', () => {
  let service: CustomerNormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerNormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
