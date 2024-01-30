import { TestBed } from '@angular/core/testing';

import { BenchStatusService } from './bench-status.service';

describe('BenchStatusService', () => {
  let service: BenchStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenchStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
