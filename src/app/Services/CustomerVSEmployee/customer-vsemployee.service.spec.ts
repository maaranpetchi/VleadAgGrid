import { TestBed } from '@angular/core/testing';

import { CustomerVSEmployeeService } from './customer-vsemployee.service';

describe('CustomerVSEmployeeService', () => {
  let service: CustomerVSEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVSEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
