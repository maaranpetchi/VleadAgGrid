import { TestBed } from '@angular/core/testing';

import { EmployeevsprocessService } from './employeevsprocess.service';

describe('EmployeevsprocessService', () => {
  let service: EmployeevsprocessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeevsprocessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
