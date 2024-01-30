import { TestBed } from '@angular/core/testing';

import { ProofReadingService } from './proof-reading.service';

describe('ProofReadingService', () => {
  let service: ProofReadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofReadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
