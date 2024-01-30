import { TestBed } from '@angular/core/testing';

import { EmpvsdivService } from './empvsdiv.service';

describe('EmpvsdivService', () => {
  let service: EmpvsdivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpvsdivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
