import { TestBed } from '@angular/core/testing';

import { EmployeevsskillsetService } from './employeevsskillset.service';

describe('EmployeevsskillsetService', () => {
  let service: EmployeevsskillsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeevsskillsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
