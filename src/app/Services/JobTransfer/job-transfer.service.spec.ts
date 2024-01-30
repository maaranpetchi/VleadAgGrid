import { TestBed } from '@angular/core/testing';

import { JobTransferService } from './job-transfer.service';

describe('JobTransferService', () => {
  let service: JobTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
